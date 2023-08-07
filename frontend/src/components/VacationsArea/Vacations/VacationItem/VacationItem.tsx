import React, { FC,useState } from 'react';
import styles from './VacationItem.module.scss';
import Vacation from '../../../../models/Vacation';
import { BASE_API_URL } from '../../../../config';
import Role from '../../../../models/Role';
import User from '../../../../models/User';
import LikeButton from '../../../LikeButton/LikeButton';
import { useNavigate } from 'react-router-dom';
import { deleteVacationAsync } from '../../../../fetch/vacationsService';
import { useDispatch } from 'react-redux';
import * as vacationReducer from '../../vacationsSlice';
import Alert from '../../../AlertArea/Alert/Alert';
import Button from '../../../Button/Button';


interface VacationItemProps {
  vacation:Vacation;
  user:User
}

const VacationItem: FC<VacationItemProps> = ({vacation,user}) => {

  const [showError,setShowError] = useState<boolean>(false);
  const [error,setError] = useState<any>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {id,destination,description,startDate,endDate,price,imageName} = vacation;
  const imgSrc = `${BASE_API_URL}/vacations/images/${imageName}`;
  const start_Date = new Date(startDate);
  const startDateString = `${start_Date.getDate()}.${start_Date.getMonth() + 1}.${start_Date.getFullYear()}`;
  const end_Date = new Date(endDate);
  const endDateString = `${end_Date.getDate()}.${end_Date.getMonth() + 1}.${end_Date.getFullYear()}`;
  
  

  const deleteVacation = async () => {

    console.log(id)
    try{
      const success = await deleteVacationAsync(id);
      if(success){
        dispatch(vacationReducer.deleteVacation(id));
      }
    }catch(err){
      console.log(err);
      setError(err);
      setShowError(true)
    }finally{

    }
  }

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

  const renderVacationCardRoleBased = () => {

     if(user?.role === Role.User){
      return(
        <li className={styles.VacationItem}>
        <div className={styles.VacationItem__imgContainer}>
          <img src={imgSrc} alt=''/>
          <h3 className='headerFont'>{destination}</h3>
          <LikeButton vacation={vacation} userId={user.id!}/>
        </div>
        
        <div className='headerFont'> <i className='fas fa-calendar'></i> {startDateString} - {endDateString}</div>
        <div className={`textFont ${styles.VacationItem__descriptionContainer}`}>{description}</div>
        <div className={`headerFont ${styles.VacationItem__priceContainer}`}>
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
        <button onClick={() => {
          dispatch(vacationReducer.setVacation(vacation));
          navigate('/editVacation');
        }}>&#9998; Edit</button>
        <button onClick={deleteVacation}>
          <i className="fa fa-trash"></i> Delete
        </button>
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
  
  
  return (
    <>
        {renderVacationCardRoleBased()}
        {displayErrorMessage()}
    </>
  )
}

export default VacationItem;
