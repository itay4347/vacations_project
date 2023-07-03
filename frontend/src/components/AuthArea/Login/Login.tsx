import React, { FC } from 'react';
import styles from './Login.module.scss';
import FormGroupWithError from '../../FormGroupWithError/FormGroupWithError';
import { useForm } from 'react-hook-form';
import Credentials from '../../../models/Credentials';
import Button from '../../Button/Button';
import { loginAsync } from '../../../fetch/authService';
import { useNavigate } from 'react-router-dom';
import validation from './validation';
import { useAppDispatch } from '../../../hooks';
import {login} from '../../../auth/authSlice';
import { NavLink } from 'react-router-dom';

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  
  const dispatch = useAppDispatch();
  const {register,handleSubmit,formState} = useForm<Credentials>()
  const navigate = useNavigate();

  const handleLogin = async (credentials:Credentials) => {
    try{
      const token = await loginAsync(credentials);
      dispatch(login(token));
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className={`Box ${styles.Login}`}>
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
        <NavLink to='/'>Register</NavLink>
      </div>
    </div>
  )
}

export default Login;
