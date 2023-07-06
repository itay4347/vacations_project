import {createSlice,PayloadAction} from '@reduxjs/toolkit';
import Vacation from '../../models/Vacation';

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
            state.vacations = vacations;
        },
        setVacation: (state, {payload:vacation}:PayloadAction<Vacation>)=> {
            state.vacation = vacation;
        },
        addVacation: (state, {payload:vacation}:PayloadAction<Vacation>) => {
            state.vacations.push(vacation);
        },
        updateVacation: (state, {payload:vacation}: PayloadAction<Vacation>) => {
            const indexToUpdate = state.vacations.findIndex((v) => v.id === vacation.id);
            if(indexToUpdate >= 0){
                state.vacations[indexToUpdate] = vacation;
            }
            state.vacation = vacation;
        }
    }
})