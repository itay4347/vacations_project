import Vacation from "../models/Vacation";
import axios from "../axios";

export const getVacationsAsync = async ():Promise<Vacation[]> => {
    const response = await axios.get<Vacation[]>('/vacations');
    const vacations = response.data

    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(vacations);
        },750)
    });
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

    const response = await axios.put<Vacation>(`/vacations/${vacation.id}`);
    const updatedVacation = response.data;

    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(updatedVacation);
        },750);
    });
} 

export const deleteVacationAsync = async (id:number) => {
    await axios.delete(`/vacations/${id}`);


    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 500);
    });
}