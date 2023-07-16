import Role from "./Role";
import Vacation from "./Vacation";

interface User {
    id?:number;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    role:Role;
    vacationFollowed:Vacation[]
}

export default User;