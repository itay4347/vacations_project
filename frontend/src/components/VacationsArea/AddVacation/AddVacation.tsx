import React, { FC,useState } from 'react';
import styles from './AddVacation.module.scss';
import { useForm } from 'react-hook-form';
import Vacation from '../../../models/Vacation';
import validation from './validation';
import { addVacationAsync } from '../../../fetch/vacationsService';
import { useAppDispatch } from '../../../hooks';
import { addVacation } from '../vacationsSlice';
import Modal from '../../Modal/Modal';
import FormGroupWithError from '../../FormGroupWithError/FormGroupWithError';
import Button from '../../Button/Button';
import Loader from '../../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import Alert from '../../AlertArea/Alert/Alert';

interface AddVacationProps {

}

const AddVacation: FC<AddVacationProps> = () => {

  const {register,handleSubmit,formState} = useForm<Vacation>();
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [showError,setShowError] = useState<boolean>(false);
  const [error,setError] = useState<any>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddVacation = async (vacation:Vacation) => {
    setIsLoading(true);
    try{
      await addVacationAsync(vacation);
      dispatch(addVacation(vacation));
      navigate('/vacations')
    }catch(err){
      setError(err);
      setShowError(true);
    }finally{
      setIsLoading(false);
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

  if(isLoading){
    return(
      <div className={styles.AddVacation__loaderContainer}>
        <Loader/>
      </div>
    )
  }


  return (
    
      <div className={styles.AddVacation}>
        {displayErrorMessage()}
        <h2>Add Vacation</h2>
        <form onSubmit={handleSubmit(handleAddVacation)}>
          <FormGroupWithError error={formState.errors.destination?.message}>
            <label>Destination:</label>
            <input type="text" {...register('destination',validation.destination)} />
          </FormGroupWithError>
          
          <FormGroupWithError error={formState.errors.description?.message}>
            <label>Description:</label>
            <textarea {...register('description',validation.description)} />
          </FormGroupWithError>
          
          <FormGroupWithError error={formState.errors.startDate?.message}>
            <label>Start Date:</label>
            <input type="date" {...register('startDate',validation.startDate)} />
          </FormGroupWithError>
          
          <FormGroupWithError error={formState.errors.endDate?.message}>
            <label>End Date:</label>
            <input type="date" {...register('endDate',validation.endDate)} />
          </FormGroupWithError>
          
          <FormGroupWithError error={formState.errors.price?.message}>
            <label>Price:</label>
            <input type="text" {...register('price',validation.price)} />
          </FormGroupWithError>
          
          <FormGroupWithError error={formState.errors.image?.message}>
            <label>Image:</label>
            <input type="file" accept='image/*' {...register('image')} />
          </FormGroupWithError>
          <Button>Add Vacation</Button>
        </form>
      </div>
   
  )
}

export default AddVacation;
