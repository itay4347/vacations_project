import dal from "../2-utils/dal";
import Follower from "../4-models/LikedVacation";
import Followers_Count from "../4-models/FollowersCount";
import LikedVacation from "../4-models/LikedVacation";
import Vacation from "../4-models/Vacation";
import { OkPacket } from "mysql";

export const getVacationsLikedPerUser = async (userId:number):Promise<Vacation[]> => {
    const sql = `SELECT f.userId, f.vacationId, v.destination, v.description, v.startDate, v.endDate, v.price, v.imageName
                 FROM followers AS f
                 INNER JOIN vacations AS v ON f.vacationId = v.id
                 WHERE f.userId = ?;`;

    const vacationLikedByUser = await dal.execute<Vacation[]>(sql,[userId]);
    return vacationLikedByUser;
}

export const getFollowersCount = async ():Promise<Followers_Count[]> => {

    const sql = `
         SELECT vacations.id as vacationId, COUNT(followers.userId) AS followersCount
        FROM vacations
        LEFT JOIN followers ON vacations.id = followers.vacationId
        GROUP BY vacations.id;
    `;
    const followerCount = await dal.execute<Followers_Count[]>(sql);

    return followerCount;
}

export const checkIfUserLikedVacation = async (userId:number,vacationId:number):Promise<boolean> => {
    
    const sql = 'SELECT * FROM followers WHERE userId = ? AND vacationId = ?';
    const numberOfLikes = await dal.execute<LikedVacation[]>(sql,[userId,vacationId]);
    return numberOfLikes.length > 0;
}

export const getAllLikedVacations = async ():Promise<LikedVacation[]> => {

    const sql = 'SELECT * FROM followers;';

    return await dal.execute<LikedVacation[]>(sql);

}

export const addLikedVacation = async (likedVacation:LikedVacation):Promise<LikedVacation> => {

    const {userId,vacationId} = likedVacation;

    const sql = 'INSERT INTO followers VALUES(DEFAULT,?,?);';

    const info = await dal.execute<OkPacket>(sql,[userId,vacationId]);
    likedVacation.id = info.insertId;
    return likedVacation;
}

export const deleteLikedVacation = async (userId:number,vacationId:number):Promise<void> => {

    const sql = 'DELETE FROM followers WHERE userId = ? AND vacationId = ?;';

    return await dal.execute(sql,[userId,vacationId]);
}