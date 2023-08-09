import {createSlice,PayloadAction} from '@reduxjs/toolkit';
import User from '../models/User';
import { handleToken, setInitialAuthState } from './utils';
import { AUTH_SESSION_STORAGE_KEY } from '../config';
import Vacation from '../models/Vacation';

export interface AuthState {
    user:User | null;
    token:string | null;
    vacationsFollowed:Vacation[]
}

export const authSlice = createSlice({
    name:'auth',
    initialState:setInitialAuthState(),
    reducers:{
        register:(state,{payload:token}:PayloadAction<string>) => {
            handleToken(state,token);//calling the handle token function to handle the token i get upon registering
        },
        login:(state,{payload:token}:PayloadAction<string>) => {
            handleToken(state,token);//calling the handle token function to handle the token i get upon login
        },
        //if the user logs out reset the state of this user and remove the token from the session storage.
        logout:(state) => {
            state.token = null;
            state.user = null;
            sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
        },
        //setting the user vacation followed to the payload value.
        setLikedVacations: (state, {payload:vacationsFollowedPerUser}:PayloadAction<Vacation[]>) => {
            if(state.user){
                state.user.vacationFollowed = vacationsFollowedPerUser;
                state.vacationsFollowed = vacationsFollowedPerUser;
            }
        },
        //this is used in the likeButton component.. when the user clicked the like button
        //and it says he has not liked this vacaation, make sure to push this vacation into the vacationsFollowed 
        //of that user.
        likeVacation: (state, {payload:vacation}:PayloadAction<Vacation>) => {
            if(state.user){
                const isLiked = state.user.vacationFollowed.some((v) =>
                v.id === vacation.id)
                
                if(!isLiked){
                    state.user.vacationFollowed.push(vacation);
                    state.vacationsFollowed.push(vacation);
                }
            }
        },
        //this is used in the likeButton component.. when the user clicked the like button
        //and it says he liked this vacation, make sure to remove this vacation from the vacationsFollowed 
        //of that user.
        unlikeVacation: (state, {payload:id}:PayloadAction<number>) => {
            if(state.user){
                const indexToDelete = state.user.vacationFollowed.findIndex(v => 
                    v.id === id);
                if(indexToDelete >= 0){
                    state.user.vacationFollowed.splice(indexToDelete, 1);
                    state.vacationsFollowed.splice(indexToDelete, 1);

                }
            }
        }
    }
});

export const {register,login,logout,setLikedVacations,likeVacation,unlikeVacation} = authSlice.actions;

export default authSlice.reducer;