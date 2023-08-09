import React, { FC,useState } from 'react';
import styles from './VacationItem.module.scss';
import Vacation from '../../../../models/Vacation';
import { BASE_API_URL } from '../../../../config';
import Role from '../../../../models/Role';
import User from '../../../../models/User';
import LikeButton from '../../../DesignedComponents/LikeButton/LikeButton';
import { useNavigate } from 'react-router-dom';
import { deleteVacationAsync } from '../../../../fetch/vacationsService';
import { useDispatch } from 'react-redux';
import * as vacationReducer from '../../vacationsSlice';
import Alert from '../../../AlertArea/Alert/Alert';
import Button from '../../../DesignedComponents/Button/Button';
import { useAppSelector } from '../../../../hooks';
import ConfirmationAlert from '../../../AlertArea/ConfirmationAlert/ConfirmationAlert';


interface VacationItemProps {
  vacation:Vacation;
  user:User
}

const VacationItem: FC<VacationItemProps> = ({vacation,user}) => {

  const [showError,setShowError] = useState<boolean>(false);
  const [error,setError] = useState<any>(null);
  const [showConfirmationMessage,setShowConfirmationMessage] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {id,destination,description,startDate,endDate,price,imageName} = vacation;
  const imgSrc = `${BASE_API_URL}/vacations/images/${imageName}`;
  const start_Date = new Date(startDate);
  //setting the date display as i want with dots in between.
  const startDateString = `${start_Date.getDate()}.${start_Date.getMonth() + 1}.${start_Date.getFullYear()}`;
  const end_Date = new Date(endDate);
  const endDateString = `${end_Date.getDate()}.${end_Date.getMonth() + 1}.${end_Date.getFullYear()}`;
  
  
  //if the user has chose to delete the vacation the confirmation message is closed and the vacation is deleted.
  const deleteVacationHandler = async () => {
    setShowConfirmationMessage(false);
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

  //here i render the look of the vacation card based on the user role:
  const renderVacationCardRoleBased = () => {

     if(user?.role === Role.User){
      return(
        <li className={styles.VacationItem}>
        <div className={styles.VacationItem__imgContainer}>
          <img src={imgSrc} alt=''/>
          <h3 className='headerFont'>{destination}</h3>
          <LikeButton vacation={vacation} userId={user.id!}/>
        </div>
        
        <div className='textFont'> <i className='fas fa-calendar'></i> {startDateString} - {endDateString}</div>
        <div className={`textFont ${styles.VacationItem__descriptionContainer}`}>{description}</div>
        <div className={`textFont ${styles.VacationItem__priceContainer}`}>
          {price}
          <span>$</span>
        </div>
      </li>
      )
      
    }
    return (
      <li className={styles.VacationItem}>
      <div className={styles.VacationItem__imgContainer}>
        <div className={styles.VacationItem__btnContainer}>
        <button className='textFont' onClick={() => {
          dispatch(vacationReducer.setVacation(vacation));
          navigate('/editVacation');
        }}>&#9998; Edit</button>
        <button className='textFont' onClick={() => {setShowConfirmationMessage(true)}}>
          <i className="fa fa-trash"></i> Delete
        </button>
        </div>
        <img src={imgSrc} alt=''/>
        <h3 className='headerFont'>{destination}</h3>
      </div>
      
      <div className='textFont'> <i className='fas fa-calendar'></i> {startDateString} - {endDateString}</div>
      <div className={`textFont ${styles.VacationItem__descriptionContainer}`}>{description}</div>
      <div className={`textFont ${styles.VacationItem__priceContainer}`}>
        {price}
        <span>$</span>
      </div>
    </li>
    )
  }
  
  
  return (
    <>
        {renderVacationCardRoleBased()}
        {/* if showConfiramtionMessage is true show the confirmation alert. if he clicks yes the vacation is deleted,
        if he press cancel the showConfirmationMessage is  set to false. */}
        {showConfirmationMessage &&
          <ConfirmationAlert message='Are you sure you want to delete that vacations?' 
          onClose={() => {setShowConfirmationMessage(false)}}>
              <Button onClick={deleteVacationHandler}>Yes</Button>
              <Button onClick={() => {setShowConfirmationMessage(false)}}>Cancel</Button>
          </ConfirmationAlert>
        }
        {displayErrorMessage()}
    </>
  )
}

export default VacationItem;
