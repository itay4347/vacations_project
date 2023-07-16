import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './VacationItem.module.scss';
import Vacation from '../../../../models/Vacation';
import { BASE_API_URL } from '../../../../config';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import Role from '../../../../models/Role';
import { checkIfUserLikedVacation, getFollowersCountAsync, getVacationsLikedPerUserAsync } from '../../../../fetch/followersService';
import User from '../../../../models/User';
import { setLikedVacations } from '../../../../auth/authSlice';


interface VacationItemProps {
  vacation:Vacation;
  followersCount:number;
  user:User
}

const VacationItem: FC<VacationItemProps> = ({vacation,followersCount,user}) => {


  const {destination,description,startDate,endDate,price,imageName} = vacation;
  const imgSrc = `${BASE_API_URL}/vacations/images/${imageName}`;

  const start_Date = new Date(startDate);
  const startDateString = `${start_Date.getDate()}.${start_Date.getMonth() + 1}.${start_Date.getFullYear()}`;
  const end_Date = new Date(endDate);
  const endDateString = `${end_Date.getDate()}.${end_Date.getMonth() + 1}.${end_Date.getFullYear()}`;


  const chekcIfVacationFollowed = async () => {
    try{
      
    }catch(err){
      console.log(err);
    }
  }
  const renderVacationCardRoleBased = () => {

    

    if(user?.role === Role.User){
      return(
        <li className={`blueBackground ${styles.VacationItem}`}>
        <div className={styles.VacationItem__imgContainer}>
          <label className={styles.VacationItem__likeButton}>
            <input type="checkbox"/>
            <span>Like {followersCount}</span>
          </label>
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
  // const imgSrc = `${BASE_API_URL}/vacations/images/${imageName}`;

  // const start_Date = new Date(startDate);
  // const startDateString = `${start_Date.getDate()}.${start_Date.getMonth() + 1}.${start_Date.getFullYear()}`;
  // const end_Date = new Date(endDate);
  // const endDateString = `${end_Date.getDate()}.${end_Date.getMonth() + 1}.${end_Date.getFullYear()}`;

  
  
  return renderVacationCardRoleBased()
}

export default VacationItem;
