import React, { FC,useEffect } from 'react';

import styles from './Vacations.module.scss';
import Vacation from '../../../models/Vacation';
import VacationItem from './VacationItem/VacationItem';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getVacationsLikedPerUserAsync } from '../../../fetch/followersService';
import { setLikedVacations } from '../../../auth/authSlice';
import User from '../../../models/User';


interface VacationsProps {
  vacations:Vacation[];
}

const Vacations: FC<VacationsProps> = ({vacations}) => {

  const {user} = useAppSelector(state => state.authState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getVacationsFollowed = async () => {
      try{
        const vacationsFollowed = await getVacationsLikedPerUserAsync(user?.id as number);
        dispatch(setLikedVacations(vacationsFollowed));
        

      }catch(err){
        console.log(err);
      }
    }
    getVacationsFollowed();
  },[]);

  const renderVacations = () => {
    return vacations.map((vacation) => {
      return <VacationItem 
              key={vacation.id}
              vacation={vacation}
              followersCount={vacation.followersCount}
              user={user as User} />
        
    });
  }
  
  return(
    <div className={styles.Vacations}>
      <ul className={styles.Vacations__vacationsList}>
        {renderVacations()}
      </ul>
    </div>
  )
}

export default Vacations;
