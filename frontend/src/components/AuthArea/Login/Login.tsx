import React, { FC,useState } from 'react';
import styles from './Login.module.scss';
import FormGroupWithError from '../../FormGroupWithError/FormGroupWithError';
import { useForm } from 'react-hook-form';
import Credentials from '../../../models/Credentials';
import Button from '../../Button/Button';
import { loginAsync } from '../../../fetch/authService';
import validation from './validation';
import { useAppDispatch } from '../../../hooks';
import {login} from '../../../auth/authSlice';
import { NavLink,useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import Alert from '../../AlertArea/Alert/Alert';



interface LoginProps {}

const Login: FC<LoginProps> = () => {
  
  const dispatch = useAppDispatch();
  const {register,handleSubmit,formState} = useForm<Credentials>()
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [showError, setShowError] = useState(false);

  const handleLogin = async (credentials:Credentials) => {
      setIsLoading(true);
    try{
      const token = await loginAsync(credentials);
      dispatch(login(token));
      navigate('/vacations');
    }catch(err){
      console.log(err);
      setError(err);
      setShowError(true);
    }finally{
      setIsLoading(false);
    }
  }

  
  
  

  const renderErrorMessage = () => {
    
    if(error && showError){
      return(
        <Alert error={'the email or password are incorrect'} onClose={() => {setShowError(false)}}>
          <Button onClick={() => {window.location.reload()}}>Try again</Button>
        </Alert>
      )
    }
  }




  if(isLoading){
    return(
      <div className={styles.Login__loaderContainer}>
        <Loader/>
      </div>
    )
  }
  return (
    <div className={`Box ${styles.Login}`}>
      {renderErrorMessage()}
      <h2>Login</h2>
      <br />
       <form onSubmit={handleSubmit(handleLogin)}>
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
        <div className={styles.Login__transferNote}>
        dont have an account?
        <br />
        <NavLink to='/register'>Register</NavLink>
        <br />
        
      </div>
    </div>
  )
}

export default Login;
