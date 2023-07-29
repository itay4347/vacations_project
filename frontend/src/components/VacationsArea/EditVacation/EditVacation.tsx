import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import styles from './EditVacation.module.scss';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import Vacation from '../../../models/Vacation';
import { getVacationsAsync, updateVacationAsync } from '../../../fetch/vacationsService';
import { setVacations, updateVacation } from '../vacationsSlice';
import FormGroupWithError from '../../FormGroupWithError/FormGroupWithError';
import validation from './validation';
import Button from '../../Button/Button';
import { BASE_API_URL } from '../../../config';
import { format } from 'date-fns';
import Alert from '../../AlertArea/Alert/Alert';
import Loader from '../../Loader/Loader';

interface EditVacationProps {}

const EditVacation: FC<EditVacationProps> = () => {
  const {vacation} = useAppSelector(state => state.vacationsState);
  const {register,handleSubmit,formState,setValue,getValues} = useForm<Vacation>();
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [file,setFile] = useState<File | null>(null);
  const [imageSelectedUrl,setImgaeSelectedUrl] = useState<string>(`${BASE_API_URL}/vacations/images/${vacation?.imageName}`);
  const [error,setError] = useState<any>(null);
  const [showError,setShowError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  
  const navigate = useNavigate();
  const handleEditVacation = async (vacation:Vacation) => {
    setIsLoading(true);
    try{
      await updateVacationAsync(vacation);
      dispatch(updateVacation(vacation));
      navigate('/vacations');
    }catch(err){
      setError(err);
      setShowError(true);
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImgaeSelectedUrl(imageUrl);

    return () => {
      URL.revokeObjectURL(imageUrl);
    }

  },[file]);

  useEffect(() => {
    if(vacation){
      setValue("id",vacation.id);
      setValue("destination",vacation.destination);
      setValue("description",vacation.description);

      const startDateFormatted = format(new Date(vacation.startDate),'yyyy-MM-dd')
      const endDateFormatted = format(new Date(vacation.endDate), 'yyyy-MM-dd');

      setValue("startDate",startDateFormatted);
      setValue("endDate",endDateFormatted);
      setValue("price",vacation.price);
      setValue('imageName',vacation.imageName);
    }
  },[vacation,setValue]);

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

  return(
    <div className={styles.EditVacation}>
      {displayErrorMessage()}
      <h2>Edit Vacation</h2>
      <form onSubmit={handleSubmit(handleEditVacation)}>
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
          
          
            <div className={styles.EditVacation__imgContainer}>
              {imageSelectedUrl && <img src={imageSelectedUrl} alt="" />}
            </div>
            <FormGroupWithError error={formState.errors.image?.message}>
              <div className={styles.EditVacation__fileInputContainer}>
                <label htmlFor='vacationImage'>Change Image</label>
                <input id='vacationImage' 
                      type="file" 
                      accept='image/*' 
                      {...register('image')}/>
              </div>
              {/* <label>change Image</label> */}
              {/* <input type="file" accept='image/*' {...register('image',validation.image)} /> */}
            </FormGroupWithError>
          <Button>Edit Vacation</Button>
        </form>
    </div>
  )
}

export default EditVacation;
