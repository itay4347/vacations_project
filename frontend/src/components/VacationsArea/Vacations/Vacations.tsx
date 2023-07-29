import React, { FC,useEffect, useState } from 'react';

import styles from './Vacations.module.scss';
import Vacation from '../../../models/Vacation';
import VacationItem from './VacationItem/VacationItem';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getVacationsLikedPerUserAsync } from '../../../fetch/followersService';
import { setLikedVacations } from '../../../auth/authSlice';
import User from '../../../models/User';
import { NavLink } from 'react-router-dom';
import Role from '../../../models/Role';
import Alert from '../../AlertArea/Alert/Alert';
import Button from '../../Button/Button';


interface VacationsProps {
  vacations:Vacation[];
}

const Vacations: FC<VacationsProps> = ({vacations}) => {

  const [error,setError] = useState<any>(null);
  const [showError,setShowError] = useState<boolean>(false);
  const {user} = useAppSelector(state => state.authState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getVacationsFollowed = async () => {
      try{
        const vacationsFollowed = await getVacationsLikedPerUserAsync(user?.id as number);
        dispatch(setLikedVacations(vacationsFollowed));
      }catch(err){
        setError(err);
        setShowError(true);
      }
    }
    getVacationsFollowed();
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

  const renderVacations = () => {
    return vacations.map((vacation) => {
      return <VacationItem 
              key={vacation.id}
              vacation={vacation}
              user={user as User} />
        
    });
  }

  
  return(
      <div className={styles.Vacations}>
        {user?.role === Role.Admin && 
          <NavLink to="/addVacation">Add new vacation</NavLink>
        }
        <ul className={styles.Vacations__vacationsList}>
          {renderVacations()}
        </ul>
      </div>

  )
}

export default Vacations;
