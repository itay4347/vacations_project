import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../counter/counterSlice';
import authReducer from '../auth/authSlice';


const store = configureStore({
    reducer: {
        counter: counterReducer,
        authState: authReducer
    }
});


//Infer the "RootState" and "AppDispatch" types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
