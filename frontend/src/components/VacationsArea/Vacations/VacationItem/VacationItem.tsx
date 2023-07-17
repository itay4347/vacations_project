import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './VacationItem.module.scss';
import Vacation from '../../../../models/Vacation';
import { BASE_API_URL } from '../../../../config';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import Role from '../../../../models/Role';
import User from '../../../../models/User';
import { setLikedVacations } from '../../../../auth/authSlice';
import LikedVacation from '../../../../models/LikedVacation';
import LikeButton from '../../../LikeButton/LikeButton';


interface VacationItemProps {
  vacation:Vacation;
  user:User
}

const VacationItem: FC<VacationItemProps> = ({vacation,user}) => {

  const {destination,description,startDate,endDate,price,imageName} = vacation;
  const imgSrc = `${BASE_API_URL}/vacations/images/${imageName}`;

  const start_Date = new Date(startDate);
  const startDateString = `${start_Date.getDate()}.${start_Date.getMonth() + 1}.${start_Date.getFullYear()}`;
  const end_Date = new Date(endDate);
  const endDateString = `${end_Date.getDate()}.${end_Date.getMonth() + 1}.${end_Date.getFullYear()}`;

  const renderVacationCardRoleBased = () => {

     if(user?.role === Role.User){
      return(
        <li className={`blueBackground ${styles.VacationItem}`}>
        <div className={styles.VacationItem__imgContainer}>
          <img src={imgSrc} alt=''/>
          <h3>{destination}</h3>
          <LikeButton vacation={vacation} userId={user.id!}/>
        </div>
        
        <div> <i className='fas fa-calendar'></i> {startDateString} - {endDateString}</div>
        <div className={styles.VacationItem__descriptionContainer}>{description}</div>
        <div className={styles.VacationItem__priceContainer}>
          {price}
          <span>$</span>
        </div>
      </li>
      )
      
    }
    return (
      <li className={`blueBackground ${styles.VacationItem}`}>
      <div className={styles.VacationItem__imgContainer}>
        <div className={styles.VacationItem__btnContainer}>
        <button>&#9998; Edit</button>
        <button><i className="fa fa-trash" aria-hidden="true"></i> Delete</button>
        </div>
        <img src={imgSrc} alt=''/>
        <h3>{destination}</h3>
      </div>
      
      <div> <i className='fas fa-calendar'></i> {startDateString} - {endDateString}</div>
      <div className={styles.VacationItem__descriptionContainer}>{description}</div>
      <div className={styles.VacationItem__priceContainer}>
        {price}
        <span>$</span>
      </div>
    </li>
    )
  }
  
  
  return renderVacationCardRoleBased()
}

export default VacationItem;
