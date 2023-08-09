import React, { FC,useState } from 'react';
import styles from './Register.module.scss';
import FormGroupWithError from '../../DesignedComponents/FormGroupWithError/FormGroupWithError';
import {useForm} from 'react-hook-form'
import User from '../../../models/User';
import Button from '../../DesignedComponents/Button/Button';
import { resgisterAsync } from '../../../fetch/authService';
import * as auth from '../../../auth/authSlice'
import { useAppDispatch } from '../../../hooks';
import validation from './validation';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../../DesignedComponents/Loader/Loader';
import Alert from '../../AlertArea/Alert/Alert';
import { BASE_API_URL } from '../../../config';


interface RegisterProps {}

const Register: FC<RegisterProps> = () => {

  const dispatch = useAppDispatch();
  const {register,handleSubmit,formState} = useForm<User>();
  const [isLoading,setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  //function for handling the register form
  const handleRegister = async (user:User) => {
    setIsLoading(true);
    try{
      const token = await resgisterAsync(user);//getting the token from backend using fetch function
      dispatch(auth.register(token));//setting the user state to the one that registered
      navigate('/vacations');//if the user has registered successfuly navigate him to the vacations page
      
    }catch(err){
      //if theres an error update the error states.
      setError(err);
      setShowError(true);
    }finally{
      setIsLoading(false);
    }
  }

  //setting the error message if this action is an error.
  const renderErrorMessage = () => {
    
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

//if the app is loading set up the loader to work
  if(isLoading){
    return(
      <div className={styles.Register__loaderContainer}>
        <Loader/>
      </div>
    )
  }

  return(
    <div className={styles.Register}>
      <img src={`${BASE_API_URL}/vacations/images/background_image.jpg`} alt="" />
    <div className={`Box ${styles.Register__registerBox}`}>
      {renderErrorMessage()}
      <h2>Register</h2>
      {/* {setting the form for registering a user using the useForm library.} */}
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
        {/* {here the user can choose to navigate to the register page if he doesnt have an account} */}
        <br />
        <NavLink to='/'>Login</NavLink>
      </div>

    </div>

      
    </div>
  )
}

export default Register;
