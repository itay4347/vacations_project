import axios from "../axios";
import LikedVacation from "../models/LikedVacation";
import Followers_Count from "../models/FollowerCount";
import Vacation from "../models/Vacation";

export const getFollowersCountAsync = async ():Promise<Followers_Count[]> => {

    const response = await axios.get<Followers_Count[]>('/followersCount');
    return response.data;
}

export const checkIfUserLikedVacationAsync = async (userId:number,vacationId:number):Promise<boolean> => {
    
    const response = await axios.get<boolean>(`/followers/${userId}/vacations/${vacationId}`);
    return response.data;
}

export const getVacationsLikedPerUserAsync = async (userId:number):Promise<Vacation[]> => {
    const response = await axios.get<Vacation[]>(`/followers/vacations/${userId}`);
    return response.data;
}

export const getLikedVacationsAsync = async ():Promise<LikedVacation[]> => {

    const response = await axios.get<LikedVacation[]>('/followers');
    return response.data;
}

export const addLikedVacationAsync = async (likedVacation:LikedVacation):Promise<LikedVacation> => {

    const response = await axios.post<LikedVacation>('/followers',likedVacation);
    return response.data;
}

export const deleteLikedVacationAsync = async (userId:number,vacationId:number):Promise<void> => {

    const response = await axios.delete(`/followers/${userId}/vacations/${vacationId}`);
    return response.data;
}