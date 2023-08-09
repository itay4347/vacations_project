import jwtDecode from "jwt-decode";
import { AUTH_SESSION_STORAGE_KEY } from "../config";
import { AuthState } from "./authSlice";
import User from "../models/User";
import { setAuthHeader } from "../axios/utils";

//initialize the state so even when i refresh the user is still logged in.
//it checks if i have the token in my session storage and sets the token and the user state to it.
export const setInitialAuthState = ():AuthState => {

    const token = sessionStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    let user = null;

    if(token){
        const container:{user:User} = jwtDecode(token);
        user = container.user
        setAuthHeader(token);
    }
    return{
        user,
        token,
        vacationsFollowed:[]
    }
}

//this function make sure to set the token to the token recieved in this function arguments,
//decode the token to get the user to set the user state, setting the auth header to the wanted token,
//and adding the token to the session storage.
export const handleToken = (state:AuthState,token:string) => {
    state.token = token;
    const container:{user:User} = jwtDecode(token);
    state.user = container.user;
    setAuthHeader(token);
    sessionStorage.setItem(AUTH_SESSION_STORAGE_KEY,token);
}