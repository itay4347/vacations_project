import React, { FC } from 'react';
import styles from './ConfirmationAlert.module.scss';
import Modal from '../Modal/Modal';

interface ConfirmationAlertProps {
  message:string;
  children?: React.ReactNode
  onClose: () => void;
}

const ConfirmationAlert: FC<ConfirmationAlertProps> = ({children,message,onClose}) => (
  <Modal onClose={onClose}>
      <div className={styles.ConfirmationAlert}>
          <p>{message}</p>
          <br />
          <div className='children'>
            {children}
          </div>
      </div>
  </Modal>
);

export default ConfirmationAlert;
