import React, { FC, useState,useEffect } from 'react';
import styles from './VacationsArea.module.scss';
import LoggedInAlert from '../AlertArea/LoggedInAlert/LoggedInAlert';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getVacationsAsync } from '../../fetch/vacationsService';
import { setVacations } from './vacationsSlice';
import Loader from '../Loader/Loader';
import Vacations from './Vacations/Vacations';
import Pagination from '../Pagination/Pagination';
import { getFollowersCountAsync } from '../../fetch/followersService';


interface VacationsAreaProps {}

const VacationsArea: FC<VacationsAreaProps> = () => {

  const [showLoggedInMessage,setShowLoggedInMessage] = useState(true);
  const [isLoading,setIsLoading] = useState(false);  
  const [currentPage,setCurrentPage] = useState(1);
  
  const dispatch = useAppDispatch();
  const {vacations} = useAppSelector(state => state.vacationsState);

  const vacationsPerPage = 10;
  const lastVacationIndexInOnePage = currentPage * vacationsPerPage;
  const firstVacationIndexInOnePage = lastVacationIndexInOnePage - vacationsPerPage;



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
        console.log(followersCountPerVacation);

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
        console.log(err);
      }finally{
        setIsLoading(false);
      }
    }
    getVacations();
  },[]);

  const vacationsInOnePage = vacations.slice(firstVacationIndexInOnePage,lastVacationIndexInOnePage);
  if(isLoading){
    return(
      <div className={styles.VacationsArea__loaderContainer}>
        <Loader/>
      </div>
    )
  }
  return(
    <div className={styles.VacationsArea}>
      {clearLoggedInMessage()}
      <Vacations vacations={vacationsInOnePage}/>
      <Pagination 
      totalVacations={vacations.length}
      vacationsPerPage={vacationsPerPage}
      setCurrentPage={setCurrentPage}
       />
    </div>
  );
}

export default VacationsArea;
