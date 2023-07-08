import React, { FC, useState,useEffect } from 'react';
import styles from './VacationsArea.module.scss';
import Alert from '../AlertArea/Alert/Alert';
import LoggedInAlert from '../AlertArea/LoggedInAlert/LoggedInAlert';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getVacationsAsync } from '../../fetch/vacationsService';
import { setVacations } from './vacationsSlice';
import Loader from '../Loader/Loader';
import Vacations from './Vacations/Vacations';

interface VacationsAreaProps {}

const VacationsArea: FC<VacationsAreaProps> = () => {

  const [showLoggedInMessage,setShowLoggedInMessage] = useState(true);
  const [isLoading,setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {vacations} = useAppSelector(state => state.vacationsState);



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

      }catch(err){
        console.log(err);
      }finally{
        setIsLoading(false);
      }
    }
    getVacations();
  },[]);

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
      <Vacations vacations={vacations}/>
    </div>
  );
}

export default VacationsArea;
