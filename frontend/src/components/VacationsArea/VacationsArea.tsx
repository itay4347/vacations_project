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


interface VacationsAreaProps {}

const VacationsArea: FC<VacationsAreaProps> = () => {

  const [showLoggedInMessage,setShowLoggedInMessage] = useState(true);
  const [isLoading,setIsLoading] = useState(false);  
  const [currentPage,setCurrentPage] = useState(1);
  const [error,setError] = useState<any>(null);
  const [showError,setShowError] = useState<boolean>(false);
  
  const dispatch = useAppDispatch();
  const {vacations} = useAppSelector(state => state.vacationsState);
  

  // const vacationsPerPage = 10;
  // const lastVacationIndexInOnePage = currentPage * vacationsPerPage;
  // const firstVacationIndexInOnePage = lastVacationIndexInOnePage - vacationsPerPage;
  // const vacationsInOnePage = vacations.slice(firstVacationIndexInOnePage,lastVacationIndexInOnePage);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoggedInMessage(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const clearLoggedInMessage = () => {
    if(showLoggedInMessage){
      return(
      <LoggedInAlert/>
      );
    }
  }

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
        <Alert error={error.response.data} onClose={() => {setShowError(false)}}>
          <Button onClick={() => {
            window.location.reload();
          }}>Try again</Button>
        </Alert>
      );
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
      {clearLoggedInMessage()}
      <Vacations vacations={vacations}/>
      {/* <Pagination 
      totalVacations={vacations.length}
      vacationsPerPage={vacationsPerPage}
      setCurrentPage={setCurrentPage}
       /> */}
    </div>
  );
}

export default VacationsArea;
