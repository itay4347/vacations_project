import React, { FC,useState,useEffect } from 'react';
import styles from './LikeButton.module.scss';
import Vacation from '../../../models/Vacation';
import { useAppDispatch } from '../../../hooks';
import { addLikedVacationAsync, checkIfUserLikedVacationAsync, deleteLikedVacationAsync } from '../../../fetch/followersService';
import LikedVacation from '../../../models/LikedVacation';
import { likeVacation, unlikeVacation } from '../../../auth/authSlice';
import { addLikeToVacation, deleteLikeToVacation, setFollowersPerVacation } from '../../VacationsArea/vacationsSlice';
import Alert from '../../AlertArea/Alert/Alert';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

//this component gets the userId and the vacation props from its parent component.
interface LikeButtonProps {
  userId:number;
  vacation:Vacation
}

const LikeButton: FC<LikeButtonProps> = ({vacation,userId}) => {

  const {id:vacationId,followersCount} = vacation;//distract the values i need from the vacation object.
  const likedVacation:LikedVacation = {
    userId,
    vacationId
  };


  const [isLiked,setIsLiked] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [showError, setShowError] = useState(false);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  //checking if the user liked this vcation and setting the isLiked state to true.
  useEffect(() => {
    const checkIfUserLikedVacation = async () => {

      try{
        if(userId){
          const checkIfFollowed = await checkIfUserLikedVacationAsync(userId,vacation.id);//fetch function that return boolean.
          setIsLiked(checkIfFollowed);//setting the isLiked state to the boolean returned.
        }
      }catch(err){
        setError(err);
        setShowError(true);
      }
    }
    checkIfUserLikedVacation();
  },[]);

  
  //function to handle the likes if the user pressed like on the vacation that passed from the props.
  const handleLikeClick = async (vacationId:number) => {
    //if the like vacation is not liked by the user
    if(!isLiked){
      dispatch(likeVacation(vacation));//adding this vacation into the user.vacationsFollowed array.
      setIsLiked(true);//setting the state to true.
      dispatch(addLikeToVacation(vacationId));//updating the vacations.followersCount to +1. 
      await addLikedVacationAsync(likedVacation);//adding this follower to the database.
    }else{
      dispatch(unlikeVacation(vacationId));//removing this vacation from the user.vacationsFollowed array.
      setIsLiked(false);//setting the state to false.
      dispatch(deleteLikeToVacation(vacationId));//updating the vacations.followersCount to -1.
      await deleteLikedVacationAsync(userId,vacationId);//removing this followerColumn from the database.
    }
  }

  //displaying an error message if there is an error.
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

  return(
    <label className={styles.LikeButton}>
      {displayErrorMessage()}
      {/* {displaying the like button as a checkbox input, setting
         the checked property to the isLiked state and appliying the function to handle the
          like click when the checkbox is changing value.} */}
      <input type="checkbox" checked={isLiked} onChange={() => handleLikeClick(vacationId)}/>
      <span className='textFont'>Like {followersCount}</span>
    </label>

  )
};

export default LikeButton;
