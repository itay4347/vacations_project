import React, { FC } from 'react';
import styles from './Register.module.scss';
import FormGroupWithError from '../../FormGroupWithError/FormGroupWithError';
import {useForm} from 'react-hook-form'
import User from '../../../models/User';
import Button from '../../Button/Button';
import { resgisterAsync } from '../../../fetch/authService';
import * as auth from '../../../auth/authSlice'
import { useAppDispatch } from '../../../hooks';
import validation from './validation';
import { NavLink } from 'react-router-dom';

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {

  const dispatch = useAppDispatch();
  const {register,handleSubmit,formState} = useForm<User>();

  const handleRegister = async (user:User) => {
    try{
      const token = await resgisterAsync(user);
      dispatch(auth.register(token));
      console.log(token);
    }catch(err){
      console.log(err);
    }
  }

  return(
    <div className={`Box ${styles.Register}`}>
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
