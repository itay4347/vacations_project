import React, { FC } from 'react';
import styles from './Alert.module.scss';
import Modal from '../../DesignedComponents/Modal/Modal';

type Error = {
  message: string;
}

interface AlertProps {
  error: string | Error;
  children?: React.ReactNode
  onClose: () => void;
}

//this alert component is for showing the error messages.

const Alert: FC<AlertProps> = ({ onClose, error, children }) => {

  let _error = typeof error === 'string' ? error : error.message;

  return (
      <Modal onClose={onClose}>
          <div className={styles.Alert}>
              <p>Something went wrong</p>
              <br />
              <p>{_error}</p>
              <br />
              <div className='children'>
                {children}
              </div>
          </div>

      </Modal>
  )
}

export default Alert;
