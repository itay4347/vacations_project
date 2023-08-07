import Vacation from "../models/Vacation";
import axios from "../axios";

export const getVacationsAsync = async ():Promise<Vacation[]> => {
    const response = await axios.get<Vacation[]>('/vacations');
    const vacations = response.data
    return vacations;
    // return new Promise((resolve,reject) => {
    //     setTimeout(() => {
    //         resolve(vacations);
    //     },750)
    // });
}

export const addVacationAsync = async (vacation:Vacation):Promise<Vacation> => {
    
    const formData = new FormData();
    formData.append('destination',vacation.destination);
    formData.append('description',vacation.description);
    formData.append('startDate',vacation.startDate);
    formData.append('endDate',vacation.endDate);
    formData.append('price',vacation.price.toString());
    formData.append('image',vacation.image[0]);
    
    const response = await axios.post<Vacation>('/vacations',formData);
    const addedVacation = response.data;

    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(addedVacation);
        },750);
    });
}

export const updateVacationAsync = async (vacation:Vacation):Promise<Vacation> => {

    const formData = new FormData();
    formData.append('destination',vacation.destination);
    formData.append('description',vacation.description);
    formData.append('startDate',vacation.startDate);
    formData.append('endDate',vacation.endDate);
    formData.append('price',vacation.price.toString());
    formData.append('image',vacation.image[0]);
    formData.append('imagName',vacation.imageName);

    const response = await axios.put<Vacation>(`/vacations/${vacation.id}`,formData);
    const updatedVacation = response.data;

    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(updatedVacation);
        },750);
    });
} 

export const deleteVacationAsync = async (id:number):Promise<boolean> => {
    try{
        await axios.delete(`/vacations/${id}`);
        return true;
    }catch(err){
        throw err;
    }

}

export const getAllActiveVacationsAsync = async ():Promise<Vacation[]> => {
    const response = await axios.get('/vacations/active');
    return response.data;

}

export const getVacationsNotStartedAsync = async ():Promise<Vacation[]> => {
    const response = await axios.get('/vacations/start');
    return response.data;

}
