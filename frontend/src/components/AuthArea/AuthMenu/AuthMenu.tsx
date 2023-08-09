import React, { FC } from 'react';
import styles from './AuthMenu.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { NavLink} from 'react-router-dom';
import { logout } from '../../../auth/authSlice';

interface AuthMenuProps {}

const AuthMenu: FC<AuthMenuProps> = () => {

  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.authState);//get the object of the user that connected

//function for loging out the user
  const logoutHandler = () => {
    dispatch(logout());
  }

  //if the user is connected display its name and logout button,else display hello guest...
  const renderAuthMenu = () => {

    if(user){
      return(
        <>
          <span className='headerFont'>Hello {user.firstName} {user.lastName} </span>
          <NavLink className='headerFont' onClick={logoutHandler} to="/">Logout</NavLink>
        </>
      )
    }
    return(
      <span className='headerFont'>hello Guest, please Login to proceed</span>
    );
    
    
  }

  return(
    <div className={styles.AuthMenu}>
      {renderAuthMenu()}
    </div>
  )
}

export default AuthMenu;
