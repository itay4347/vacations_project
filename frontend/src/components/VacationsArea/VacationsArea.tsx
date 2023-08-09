import React, { FC, useState,useEffect } from 'react';
import styles from './VacationsArea.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {getVacationsAsync} from '../../fetch/vacationsService';
import { setVacations } from './vacationsSlice';
import Loader from '../DesignedComponents/Loader/Loader';
import Vacations from './Vacations/Vacations';
import { getFollowersCountAsync} from '../../fetch/followersService';
import Alert from '../AlertArea/Alert/Alert';
import Button from '../DesignedComponents/Button/Button';
import { useNavigate } from 'react-router-dom';


interface VacationsAreaProps {}

const VacationsArea: FC<VacationsAreaProps> = () => {

  const [isLoading,setIsLoading] = useState(false);  
  const [error,setError] = useState<any>(null);
  const [showError,setShowError] = useState<boolean>(false);
  
  const dispatch = useAppDispatch();
  const {vacations} = useAppSelector(state => state.vacationsState);
  const {user} = useAppSelector(state => state.authState);
  const navigate = useNavigate();

  //a function for getting the vacations, dispatch them to my state and add the followersCount.
  useEffect(() => {
    const getVacations = async () => {
      setIsLoading(true);
      try{
        const vacations = await getVacationsAsync();//getting the vacations from my database
        const followersCountPerVacation = await getFollowersCountAsync();//getting from my database array with followersCount number per vacation.

        //mapping the vacations array and adding the followersCount key to each vacation object.
        const vacationsWithFollowersCount = vacations.map((vacation) => {
          const {id} = vacation;
          //setting the followersCount variable into followersCount of the specific vacation index
          //by finding its index and applying the followersCount key's value to it. 
          const indexOfVacation = followersCountPerVacation.findIndex(v => v.vacationId === id);
          const followersCount = followersCountPerVacation[indexOfVacation].followersCount;
          
          //returning a new instance object with the followersCount added.
          return(
            {
              ...vacation,
              followersCount
            } 
          );
        });
        dispatch(setVacations(vacationsWithFollowersCount));//dispatching the new array of vacations with followers count into my state.
        
        

      }catch(err){
        setError(err);
        setShowError(true);
      }finally{
        setIsLoading(false);
      }
    }
    getVacations();
  },[]);

  //setting a fitted error message if i recieve an error.
  const displayErrorMessage = () => {
    if(error && showError){

      return(
        <Alert error={'you have to be logged in to access this page'} onClose={() => {setShowError(false)}}>
          <Button onClick={() => {
            navigate('/');
          }}>
            Login
          </Button>
        </Alert>
      )
    }
    
  }

  
  if(isLoading){
    return(
      <div className={styles.VacationsArea__loaderContainer}>
        <Loader/>
      </div>
    )
  }
  //returning the vacations component with the vacations props so it will display my vacations.
  return(
    <div className={styles.VacationsArea}>
      {displayErrorMessage()}
      <Vacations vacations={vacations}/>
    </div>
  );
}

export default VacationsArea;
