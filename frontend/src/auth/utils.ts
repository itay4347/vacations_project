import jwtDecode from "jwt-decode";
import { AUTH_SESSION_STORAGE_KEY } from "../config";
import { AuthState } from "./authSlice";
import User from "../models/User";
import { setAuthHeader } from "../axios/utils";

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
        token
    }
}

export const handleToken = (state:AuthState,token:string) => {
    state.token = token;
    const container:{user:User} = jwtDecode(token);
    state.user = container.user;
    setAuthHeader(token);
    sessionStorage.setItem(AUTH_SESSION_STORAGE_KEY,token);
}