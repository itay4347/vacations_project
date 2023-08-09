//a validation following the validation documentation from react-hook-form
import {createSlice,PayloadAction} from '@reduxjs/toolkit';
import Vacation from '../../models/Vacation';
import Followers_Count from '../../models/FollowerCount';

interface VacationsState {
    vacations: Vacation[];
    vacation?: Vacation
}

const initialState:VacationsState = {
    vacations: []
}

export const vacationSlice = createSlice({
    name:'vacations',
    initialState:initialState,
    reducers: {
        setVacations: (state, {payload:vacations}:PayloadAction<Vacation[]>)=> {
            state.vacations = vacations;//setting the vacations state to the payload value.
        },
        setVacation: (state, {payload:vacation}:PayloadAction<Vacation>)=> {
            state.vacation = vacation;//setting the vacation state to the payload value.
        },
        addVacation: (state, {payload:vacation}:PayloadAction<Vacation>) => {
            state.vacations.push(vacation);//pushing the added vacation in to the vacations array in the state.
        },
        //replacing the vacation chose to update with the payload value.
        updateVacation: (state, {payload:vacation}: PayloadAction<Vacation>) => {
            const indexToUpdate = state.vacations.findIndex((v) => v.id === vacation.id);
            if(indexToUpdate >= 0){
                state.vacations[indexToUpdate] = vacation;
            }
            state.vacation = vacation;
        },
        //splicing and removing the vacation with the id we get from the payload
        deleteVacation: (state, { payload: id }: PayloadAction<number>) => {
            const indexToDelete = state.vacations.findIndex((v) => v.id === id);
            if (indexToDelete >= 0) {
                state.vacations.splice(indexToDelete, 1);
            }
           
        },
        setFollowersPerVacation: (state,{payload:likesCount}:PayloadAction<Followers_Count>) => {
            const {vacationId,followersCount} = likesCount;
            const vacation = state.vacations.find(v => v.id === vacationId);

            if(vacation){
                vacation.followersCount = followersCount || 0;
            }
        },
        //find the index of the vacationId i get from the payload and add +1 to the followersCount of this vacation.
        addLikeToVacation: (state, {payload:vacationId}:PayloadAction<number>) => {
            const vacationLikedIndex = state.vacations.findIndex(v => v.id === vacationId);

            if(vacationLikedIndex >= 0){
                state.vacations[vacationLikedIndex].followersCount += 1;
                state.vacation = state.vacations[vacationLikedIndex];
            }
        },
        //find the index of the vacationId i get from the payload and lower the followersCount of this vacation by 1.
        deleteLikeToVacation: (state, {payload:vacationId}:PayloadAction<number>) => {
            const vacationUnlikedIndex = state.vacations.findIndex(v => v.id === vacationId);

            if(vacationUnlikedIndex >= 0){
                state.vacations[vacationUnlikedIndex].followersCount -= 1;
                state.vacation = state.vacations[vacationUnlikedIndex];
            }
        }
    }
});

export const {setVacations,
              setVacation,
              addVacation,
              updateVacation,
              deleteVacation,
              setFollowersPerVacation,
              addLikeToVacation,
              deleteLikeToVacation} = vacationSlice.actions;

export default vacationSlice.reducer;