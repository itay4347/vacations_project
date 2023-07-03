import React, { FC } from 'react';
import styles from './LoggedInAlert.module.scss';
import Modal from '../../Modal/Modal';

interface LoggedInAlertProps {
  
}

const LoggedInAlert: FC<LoggedInAlertProps> = () => {
  
  
  return(
          <div className={styles.LoggedInAlert}>
            Successfully logged-in
          </div>
  );
}

export default LoggedInAlert;
