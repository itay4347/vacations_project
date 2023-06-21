import dal from "../2-utils/dal";
import { ResourceNotFoundError } from "../4-models/Error";
import Vacation from "../4-models/Vacation";


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

// export const addNewVacation = async (vacation:Vacation):Promise<Vacation> => {
//     const {destination,description,startDate,endDate,price,photoPath} = vacation;
    
// }
