import React, { FC,useState } from 'react';
import styles from './AddVacation.module.scss';
import { useForm } from 'react-hook-form';
import Vacation from '../../../models/Vacation';
import validation from './validation';
import { addVacationAsync } from '../../../fetch/vacationsService';
import { useAppDispatch } from '../../../hooks';
import { addVacation } from '../vacationsSlice';
import FormGroupWithError from '../../DesignedComponents/FormGroupWithError/FormGroupWithError';
import Button from '../../DesignedComponents/Button/Button';
import Loader from '../../DesignedComponents/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import Alert from '../../AlertArea/Alert/Alert';

interface AddVacationProps {

}

const AddVacation: FC<AddVacationProps> = () => {

  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [showError,setShowError] = useState<boolean>(false);
  const [error,setError] = useState<any>(null);
  
  const {register,handleSubmit,formState} = useForm<Vacation>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //function to handle the add vacation when the button on the form is pressed.
  const handleAddVacation = async (vacation:Vacation) => {
    setIsLoading(true);
    try{
      await addVacationAsync(vacation);//fetch function for adding the vacation
      dispatch(addVacation(vacation));//updating the vacations state upon adding new vacation
      navigate('/vacations');//if the vacation was added successfuly navigate to vacations page.
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
        <h2 className='headerFont'>Add Vacation</h2>
        {/* form for adding a new vacation using useForm */}
        <form className='textFont' onSubmit={handleSubmit(handleAddVacation)}>
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
