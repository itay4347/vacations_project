import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import styles from './EditVacation.module.scss';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import Vacation from '../../../models/Vacation';
import { getVacationsAsync, updateVacationAsync } from '../../../fetch/vacationsService';
import { setVacation, setVacations, updateVacation } from '../vacationsSlice';
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
  const {register,handleSubmit,formState,setValue} = useForm<Vacation>();
  const [selectedFile,setSelectedFile] = useState<File | null>(null);
  const [imageSelectedUrl,setImgaeSelectedUrl] = useState<string>('');
  const [error,setError] = useState<any>(null);
  const [showError,setShowError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  
  const navigate = useNavigate();
  const handleEditVacation = async (vacation:Vacation) => {
    try{
      await updateVacationAsync(vacation);
      dispatch(updateVacation(vacation));
      navigate('/vacations');
      
    }catch(err){
      setError(err);
      setShowError(true);
    }finally{
    }
  }

  useEffect(() => {
    if(!selectedFile) return;

    const imageUrl = URL.createObjectURL(selectedFile);
    setImgaeSelectedUrl(imageUrl);

    return () => {
      URL.revokeObjectURL(imageUrl);
    }

  },[selectedFile]);

  const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0 ){
          setSelectedFile(e.target.files[0]);
    }
  }

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

      const imgSrc = `${BASE_API_URL}/vacations/images/${vacation.imageName}`;
      setImgaeSelectedUrl(imgSrc);
    }
  },[vacation]);

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
    <div className={styles.EditVacation}>
      {displayErrorMessage()}
      <h2 className='headerFont'>Edit Vacation</h2>
      <form className='textFont' onSubmit={handleSubmit(handleEditVacation)}>
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
              <img src={imageSelectedUrl} alt="" />
            </div>
            <FormGroupWithError error={formState.errors.image?.message}>
              <div className={styles.EditVacation__fileInputContainer}>
                <label>Change Image</label>
                <input type="file" 
                       accept='image/*' 
                       {...register('image')}
                       onChange={handleFileChange}  
                      />
              </div>
            </FormGroupWithError>
          <Button>Edit Vacation</Button>
        </form>
    </div>
  )
}

export default EditVacation;
