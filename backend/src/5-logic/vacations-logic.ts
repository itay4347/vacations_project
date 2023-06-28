import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { saveImagesToAssets } from "../2-utils/saveImagetoAssets";
import { ResourceNotFoundError, ValidationError } from "../4-models/Error";
import Vacation from "../4-models/Vacation";
import fs from 'fs';

const imagePath = './src/1-assets/images';

export const getAllVacations = async ():Promise<Vacation[]> => {
    const sql = `
        SELECT * FROM vacations;
    `;

    return await dal.execute<Vacation[]>(sql);
}

export const getVacationById = async (id:number):Promise<Vacation> => {
    const sql = `
        SELECT * FROM vacations
        WHERE id = ${id};
    `;
    const vacations = await dal.execute<Vacation[]>(sql);
    const vacation = vacations[0];
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

    const {id,destination,description,startDate,endDate,price,imageName,image} = vacation;

    if(image){
        const currentImage = imageName;
        if(fs.existsSync(`${imagePath}/${currentImage}`)){
            fs.unlinkSync(`${imagePath}/${currentImage}`);
        }

        await saveImagesToAssets(vacation);
        delete vacation.image;

    }

    const sql = `UPDATE vacations SET destination = ?,
                                      description = ?,
                                      startDate = ?,
                                      endDate = ?,
                                      price = ?,
                                      imageName = ?
                        WHERE id = ?;
    `;

    const info = await dal.execute<OkPacket>(sql,[destination,
                                                  description,
                                                  startDate,
                                                  endDate,
                                                  price,
                                                  vacation.imageName,
                                                  id]);
    
    if(info.affectedRows === 0){
        throw new ResourceNotFoundError(id);
    }

    return vacation;

}
