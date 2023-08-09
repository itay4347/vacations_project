import dal from "../2-utils/dal";
import Follower from "../4-models/LikedVacation";
import Followers_Count from "../4-models/FollowersCount";
import LikedVacation from "../4-models/LikedVacation";
import Vacation from "../4-models/Vacation";
import { OkPacket } from "mysql";

//this returns all the vacations liked by this userId, using join between the vacations and followers table.
export const getVacationsLikedPerUser = async (userId:number):Promise<Vacation[]> => {
    const sql = `SELECT vacations.*
                 FROM vacations
                 LEFT JOIN followers ON followers.vacationId = vacations.id
                 WHERE followers.userId = ?
                 GROUP BY vacations.id
                 ORDER BY vacations.startDate;`;

    const vacationLikedByUser = await dal.execute<Vacation[]>(sql,[userId]);
    return vacationLikedByUser;
}

//this return a table with followersCount column and vacationId column to get me the followers count per vacation.
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

//gets userId and vacationId arguments and checks if the user with this specific id has liked the vacation with this specific id.
export const checkIfUserLikedVacation = async (userId:number,vacationId:number):Promise<boolean> => {
    
    const sql = 'SELECT * FROM followers WHERE userId = ? AND vacationId = ?';
    const numberOfLikes = await dal.execute<LikedVacation[]>(sql,[userId,vacationId]);
    return numberOfLikes.length > 0;
}


export const addLikedVacation = async (likedVacation:LikedVacation):Promise<LikedVacation> => {

    const {userId,vacationId} = likedVacation;
    //checks if the user has allready liked this vacation.
    const checkSql = 'SELECT id FROM followers WHERE userId = ? AND vacationId = ?;';
    const [existingLike] = await dal.execute<{ id: number }[]>(checkSql, [userId, vacationId]);
  
    if (existingLike) {
      // If the user has already liked the vacation, return the existing likedVacation object without inserting again
      likedVacation.id = existingLike.id;
      return likedVacation;
    }

    //else, insert the vacationId and userId into the followers table.
    const sql = 'INSERT INTO followers VALUES(DEFAULT,?,?);';

    const info = await dal.execute<OkPacket>(sql,[userId,vacationId]);
    likedVacation.id = info.insertId;
    return likedVacation;
}

export const deleteLikedVacation = async (userId:number,vacationId:number):Promise<void> => {

    const sql = 'DELETE FROM followers WHERE userId = ? AND vacationId = ?;';

    return await dal.execute(sql,[userId,vacationId]);
}

//sql logic for returning an array with followersCount and destination for the csv function.
export const getFollowersCountByDestination = async ():Promise<any[]> => {
    const sql = `
            SELECT vacations.destination, COUNT(followers.userId) AS followersCount
            FROM vacations
            LEFT JOIN followers ON vacations.id = followers.vacationId
            GROUP BY vacations.id;
    `;

    return await dal.execute(sql);
}

