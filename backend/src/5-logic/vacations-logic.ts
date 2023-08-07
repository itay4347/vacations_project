import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { saveImagesToAssets } from "../2-utils/saveImagetoAssets";
import { ResourceNotFoundError, ValidationError } from "../4-models/Error";
import Vacation from "../4-models/Vacation";
import fs from 'fs';

const imagePath = './src/1-assets/images';

export const getAllVacations = async ():Promise<Vacation[]> => {
    const sql = `
    SELECT * FROM vacations
    ORDER BY vacations.startDate;
    `;

    return await dal.execute<Vacation[]>(sql);
}

export const getVacationById = async (id:number):Promise<Vacation> => {
    const sql = `
        SELECT * FROM vacations
        WHERE id = ${id};
    `;
    const vacations = await dal.execute<Vacation[]>(sql);
    const vacation = vacations[0]
    if(!vacation) throw new ResourceNotFoundError(id);
    return vacation;

} 

export const addNewVacation = async (vacation:Vacation):Promise<Vacation> => {

    const error = vacation.validate();
    if(error) throw new ValidationError(error);

    const {destination,description,startDate,endDate,price,image} = vacation;

    if(image){
        await saveImagesToAssets(vacation);
        delete vacation.image;
    }
    const sql = `
            INSERT INTO vacations VALUES(DEFAULT,?,?,?,?,?,?);
    `;
    const info = await dal.execute<OkPacket>(sql,[destination,
                                                  description,
                                                  startDate,
                                                  endDate,
                                                  price,
                                                  vacation.imageName]);
    vacation.id = info.insertId;

    return vacation;

 
    
}

export const updateVacation = async (vacation:Vacation):Promise<Vacation> => {

    const error = vacation.validate();
    if(error) throw new ValidationError(error);

    const vacations = await getAllVacations();

    const updatedVacationIndex = vacations.findIndex((v) => v.id === vacation.id);
      
    
    if(vacation.image){
        const currentImage = vacations[updatedVacationIndex].imageName;
        console.log(currentImage);
        if(fs.existsSync(`${imagePath}/${currentImage}`)){
            fs.unlinkSync(`${imagePath}/${currentImage}`);
        }

        await saveImagesToAssets(vacation);
        
        delete vacation.image;

    }
    vacations[updatedVacationIndex] = vacation;

    

    const {id,destination,description,startDate,endDate,price} = vacation;
        if(vacation.imageName){
            const sql = `UPDATE vacations SET destination = ?,
                                            description = ?,
                                            startDate = ?,
                                            endDate = ?,
                                            price = ?,
                                            imageName = ?
                        WHERE id = ?;
                    `;

         const params = [destination,description,startDate,endDate,price,vacation.imageName,id]
         const info = await dal.execute<OkPacket>(sql,params);
         if(info.affectedRows === 0){
            throw new ResourceNotFoundError(id);
        }
        }else{
            const sql = `UPDATE vacations SET destination = ?,
                                              description = ?,
                                              startDate = ?,
                                              endDate = ?,
                                              price = ?
                        WHERE id = ?;
                    `;

            const params = [destination,description,startDate,endDate,price,id]
            const info = await dal.execute<OkPacket>(sql,params);
            if(info.affectedRows === 0){
            throw new ResourceNotFoundError(id);
            }
        }

    return vacation;

}



export const deleteVacation = async (id:number):Promise<void> => {

    const vacation = await getVacationById(id);
    console.log(vacation.imageName)
    if(vacation.imageName){
        if(fs.existsSync(`${imagePath}/${vacation.imageName}`)){
            fs.unlinkSync(`${imagePath}/${vacation.imageName}`);
        }
    }

    const sql = 'DELETE FROM vacations WHERE id = ?;';
    const info = await dal.execute<OkPacket>(sql,[id]);
    if(info.affectedRows === 0){
        throw new ResourceNotFoundError(id);
    }

}

export const getVacationsByStartingDate = async ():Promise<Vacation[]> => {

    const sql = `SELECT vacations.*, COUNT(followers.userId) AS followersCount
                 FROM vacations
                 LEFT JOIN followers ON vacations.id = followers.vacationId
                 WHERE vacations.startDate > CURDATE()
                 GROUP BY vacations.id
                 ORDER BY vacations.startDate;`;

    return await dal.execute(sql);
}

export const getAllActiveVacations = async ():Promise<Vacation[]> => {
    const sql = `SELECT vacations.*, COUNT(followers.userId) AS followersCount
                 FROM vacations
                 LEFT JOIN followers ON vacations.id = followers.vacationId
                 WHERE CURDATE() BETWEEN startDate AND endDate
                 GROUP BY vacations.id
                 ORDER BY vacations.startDate;`;
    
    return await dal.execute(sql);
}

