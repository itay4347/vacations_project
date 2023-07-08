import React, { ChangeEvent, FC, useState } from 'react';
import styles from './VacationItem.module.scss';
import Vacation from '../../../../models/Vacation';
import { BASE_API_URL } from '../../../../config';


interface VacationItemProps {
  vacation:Vacation;
}

const VacationItem: FC<VacationItemProps> = ({vacation}) => {

  const [likes, setLikes] = useState(0);

  const handleLike = (event:ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    if(checked) {
      setLikes(likes +1);
    } else {
      setLikes(likes - 1);
    }
  };
  const {destination,description,startDate,endDate,price,imageName} = vacation;
  const imgSrc = `${BASE_API_URL}/vacations/images/${imageName}`;

  const start_Date = new Date(startDate);
  const startDateString = `${start_Date.getDate()}.${start_Date.getMonth() + 1}.${start_Date.getFullYear()}`;
  const end_Date = new Date(endDate);
  const endDateString = `${end_Date.getDate()}.${end_Date.getMonth() + 1}.${end_Date.getFullYear()}`;

  
  
  return(
    <li className={`blueBackground ${styles.VacationItem}`}>
      <div className={styles.VacationItem__imgContainer}>
        <label className={styles.VacationItem__likeButton}>
          <input type="checkbox" onChange={handleLike} />
          <span>Like {likes}</span>
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

export default VacationItem;
