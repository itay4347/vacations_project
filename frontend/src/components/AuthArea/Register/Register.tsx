import React, { FC,useState } from 'react';
import styles from './Register.module.scss';
import FormGroupWithError from '../../FormGroupWithError/FormGroupWithError';
import {useForm} from 'react-hook-form'
import User from '../../../models/User';
import Button from '../../Button/Button';
import { resgisterAsync } from '../../../fetch/authService';
import * as auth from '../../../auth/authSlice'
import { useAppDispatch } from '../../../hooks';
import validation from './validation';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import Alert from '../../AlertArea/Alert/Alert';

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {

  const dispatch = useAppDispatch();
  const {register,handleSubmit,formState} = useForm<User>();
  const [isLoading,setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (user:User) => {
    setIsLoading(true);
    try{
      const token = await resgisterAsync(user);
      dispatch(auth.register(token));
      navigate('/vacations');
      
    }catch(err){
      setError(err);
      setShowError(true);
    }finally{
      setIsLoading(false);
    }
  }

  const renderErrorMessage = () => {
    
    if(error && showError){
      return(
        <Alert error={error} onClose={() => {setShowError(false)}}>
          <Button onClick={() => {
            navigate('/register');
          }}>Try again</Button>
        </Alert>
      );
    }
  }

  if(isLoading){
    return(
      <div className={styles.Register__loaderContainer}>
        <Loader/>
      </div>
    )
  }

  return(
    <div className={`Box ${styles.Register}`}>
      {renderErrorMessage()}
      <h2>Register</h2>
      <form onSubmit={handleSubmit(handleRegister)}>
        <FormGroupWithError error={formState.errors.firstName?.message}>
          <label>First Name</label>
          <input type="text" {...register('firstName',validation.firstName)}/>
        </FormGroupWithError>
        <br />
        <FormGroupWithError error={formState.errors.lastName?.message}>
          <label>Last Name</label>
          <input type="text" {...register('lastName',validation.lastName)}/>
        </FormGroupWithError>
        <br />
        <FormGroupWithError error={formState.errors.email?.message}>
          <label>email</label>
          <input type="email" {...register('email',validation.email)}/>
        </FormGroupWithError>
        <br />
        <FormGroupWithError error={formState.errors.password?.message}>
          <label>Password</label>
          <input type="password" {...register('password',validation.password)}/>
        </FormGroupWithError>
        <br />
        <Button>Register</Button>
      </form>
      <div className={styles.Register__transferNote}>
        allready have an account?
        <br />
        <NavLink to='/'>Login</NavLink>
      </div>
      
    </div>
  )
}

export default Register;
