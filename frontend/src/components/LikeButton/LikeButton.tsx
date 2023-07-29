import React, { FC,useState,useEffect } from 'react';
import styles from './LikeButton.module.scss';
import Vacation from '../../models/Vacation';
import { useAppDispatch } from '../../hooks';
import { addLikedVacationAsync, checkIfUserLikedVacationAsync, deleteLikedVacationAsync } from '../../fetch/followersService';
import LikedVacation from '../../models/LikedVacation';
import { likeVacation, unlikeVacation } from '../../auth/authSlice';
import { addLikeToVacation, deleteLikeToVacation } from '../VacationsArea/vacationsSlice';
import Alert from '../AlertArea/Alert/Alert';
import Button from '../Button/Button';

interface LikeButtonProps {
  userId:number;
  vacation:Vacation
}

const LikeButton: FC<LikeButtonProps> = ({vacation,userId}) => {

  const {id:vacationId,followersCount} = vacation;
  const likedVacation:LikedVacation = {
    userId,
    vacationId
  };

  const [isLiked,setIsLiked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<any>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const checkIfUserLikedVacation = async () => {

      try{
        if(userId){
          const checkIfFollowed = await checkIfUserLikedVacationAsync(userId,vacation.id);
          setIsLiked(checkIfFollowed);
        }
      }catch(err){
        setError(err);
        setShowError(true);
      }
    }
    checkIfUserLikedVacation();
  },[]);

  const handleLikeClick = async (vacationId:number) => {
    if(!isLiked){
      console.log('button clicked for', vacationId);
      await addLikedVacationAsync(likedVacation);
      dispatch(likeVacation(vacation));
      setIsLiked(true);
      dispatch(addLikeToVacation(vacationId));
    }else{
      await deleteLikedVacationAsync(userId,vacationId);
      dispatch(unlikeVacation(vacationId));
      setIsLiked(false);
      dispatch(deleteLikeToVacation(vacationId));
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

  return(
    <label className={styles.LikeButton}>
      {displayErrorMessage()}
      <input type="checkbox" checked={isLiked} onChange={() => handleLikeClick(vacationId)}/>
      <span>Like{followersCount}</span>
    </label>
  )
};

export default LikeButton;
