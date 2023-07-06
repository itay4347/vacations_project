import React, { FC } from 'react';
import styles from './AuthMenu.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import User from '../../../models/User';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../../auth/authSlice';

interface AuthMenuProps {}

const AuthMenu: FC<AuthMenuProps> = () => {

  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.authState);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
  }

  const renderAuthMenu = () => {

    if(user){
      return(
        <>
          <span>Hello {user.firstName} {user.lastName}</span>
          <NavLink onClick={logoutHandler} to="/">Logout</NavLink>
        </>
      )
    }
    return(
      <span>hello Guest, please Login to proceed</span>
    );
    
    
  }

  return(
    <div className={styles.AuthMenu}>
      {renderAuthMenu()}
    </div>
  )
}

export default AuthMenu;
