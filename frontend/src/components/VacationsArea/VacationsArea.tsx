import React, { FC, useState,useEffect } from 'react';
import styles from './VacationsArea.module.scss';
import Alert from '../AlertArea/Alert/Alert';
import LoggedInAlert from '../AlertArea/LoggedInAlert/LoggedInAlert';

interface VacationsAreaProps {}

const VacationsArea: FC<VacationsAreaProps> = () => {

  const [showLoggedInMessage,setShowLoggedInMessage] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoggedInMessage(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const clearLoggedInMessage = () => {
    if(showLoggedInMessage){
      return(
      <LoggedInAlert/>
      )
    }
  }

  return(
    <div className={styles.VacationsArea}>
      {clearLoggedInMessage()}
      VacationsArea
    </div>
  )
}

export default VacationsArea;
