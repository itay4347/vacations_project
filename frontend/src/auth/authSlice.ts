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
            handleToken(state,token);
        },
        login:(state,{payload:token}:PayloadAction<string>) => {
            handleToken(state,token);
        },
        logout:(state) => {
            state.token = null;
            state.user = null;
            sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
        },
        setLikedVacations: (state, {payload:vacationsFollowedPerUser}:PayloadAction<Vacation[]>) => {
            if(state.user){
                state.user.vacationFollowed = vacationsFollowedPerUser;
                state.vacationsFollowed = vacationsFollowedPerUser;
            }
        },
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