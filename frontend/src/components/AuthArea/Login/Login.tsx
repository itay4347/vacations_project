import React, { FC,useState } from 'react';
import styles from './Login.module.scss';
import FormGroupWithError from '../../DesignedComponents/FormGroupWithError/FormGroupWithError';
import { useForm } from 'react-hook-form';
import Credentials from '../../../models/Credentials';
import Button from '../../DesignedComponents/Button/Button';
import { loginAsync } from '../../../fetch/authService';
import validation from './validation';
import { useAppDispatch } from '../../../hooks';
import {login} from '../../../auth/authSlice';
import { NavLink,useNavigate } from 'react-router-dom';
import Loader from '../../DesignedComponents/Loader/Loader';
import Alert from '../../AlertArea/Alert/Alert';
import { BASE_API_URL } from '../../../config';



interface LoginProps {}

const Login: FC<LoginProps> = () => {
  
  const dispatch = useAppDispatch();
  const {register,handleSubmit,formState} = useForm<Credentials>()
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [showError, setShowError] = useState(false);

  //function for handling the login form.
  const handleLogin = async (credentials:Credentials) => {
      setIsLoading(true);
    try{
      const token = await loginAsync(credentials);//getting the token from the backend
      dispatch(login(token));//setting the user state to the one that logged-in
      navigate('/vacations');//if the user is logged-in successfuly navigate to the vacatons page.
    }catch(err){
      setError(err);
      setShowError(true);
    }finally{
      setIsLoading(false);
    }
  }

  
  
  
  //setting the error message if this action is an error.
  const displayErrorMessage = () => {
    
    if(error && showError){
      return(
        <Alert error={'the email or password are incorrect'} onClose={() => {setShowError(false)}}>
          <Button onClick={() => {window.location.reload()}}>Try again</Button> 
        </Alert>
      )
    }
  }

//if the app is loading set up the loader to work
  if(isLoading){
    return(
      <div className={styles.Login__loaderContainer}>
        <Loader/>
      </div>
    )
  }
  return (
    <div className={styles.Login}>
      <img src={`${BASE_API_URL}/vacations/images/background_image.jpg`} alt="" />
      <p className='textFont'>
        welcome to
        <br />
        <strong className='headerFont'>Bon Voyage</strong>
        <br />
        please Login to see all the available vacations!
      </p>

      <div className={`Box ${styles.Login__loginBox}`}>
        {displayErrorMessage()}
        <h2 className='headerFont'>Login</h2>
        <br />
        {/* {setting the form for logging in a user using the useForm library.} */}
        <form className='textFont' onSubmit={handleSubmit(handleLogin)}>
            <FormGroupWithError error={formState.errors.email?.message}>
              <label>Email</label>
              <input type="email" {...register('email',validation.email)} />
            </FormGroupWithError>
            <br />
            <FormGroupWithError error={formState.errors.password?.message}>
              <label>Password</label>
              <input type="password" {...register('password',validation.password)} />
            </FormGroupWithError>
            <br />
            <Button>Login</Button>
          </form> 
          <div>
            dont have an account?
            <br />
            {/* {here the user can choose to navigate to the register page if he doesnt have an account} */}
            <NavLink to='/register'>Register</NavLink>
            <br />
          </div>
      </div>
    </div>
  )
}

export default Login;
