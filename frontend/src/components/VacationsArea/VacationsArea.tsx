import React, { ChangeEvent,FC, useState,useEffect } from 'react';
import styles from './VacationsArea.module.scss';
import LoggedInAlert from '../AlertArea/LoggedInAlert/LoggedInAlert';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllActiveVacationsAsync, getVacationsAsync, getVacationsNotStartedAsync } from '../../fetch/vacationsService';
import { setVacations } from './vacationsSlice';
import Loader from '../Loader/Loader';
import Vacations from './Vacations/Vacations';
import Pagination from '../Pagination/Pagination';
import { getFollowersCountAsync, getVacationsLikedPerUserAsync } from '../../fetch/followersService';
import Alert from '../AlertArea/Alert/Alert';
import Button from '../Button/Button';
import Vacation from '../../models/Vacation';
import { setLikedVacations } from '../../auth/authSlice';
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

  // const vacationsPerPage = 10;
  // const lastVacationIndexInOnePage = currentPage * vacationsPerPage;
  // const firstVacationIndexInOnePage = lastVacationIndexInOnePage - vacationsPerPage;
  // const vacationsInOnePage = vacations.slice(firstVacationIndexInOnePage,lastVacationIndexInOnePage);

  useEffect(() => {
    const getVacations = async () => {
      setIsLoading(true);
      try{
        const vacations = await getVacationsAsync();
        dispatch(setVacations(vacations));
        const followersCountPerVacation = await getFollowersCountAsync();

        const vacationsWithFollowersCount = vacations.map((vacation) => {
          const {id} = vacation;
          const indexOfVacation = followersCountPerVacation.findIndex(v => v.vacationId === id);
          const followersCount = followersCountPerVacation[indexOfVacation].followersCount;
          
          return(
            {
              ...vacation,
              followersCount
            } 
          );
        });
        dispatch(setVacations(vacationsWithFollowersCount));
        
        

      }catch(err){
        setError(err);
        setShowError(true);
      }finally{
        setIsLoading(false);
      }
    }
    getVacations();
  },[]);

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
  return(
    <div className={styles.VacationsArea}>
      {displayErrorMessage()}
      <Vacations vacations={vacations}/>
    </div>
  );
}

export default VacationsArea;
