import React, { FC } from 'react';
import styles from './ConfirmationAlert.module.scss';
import Modal from '../../DesignedComponents/Modal/Modal';

interface ConfirmationAlertProps {
  message:string;
  children?: React.ReactNode
  onClose: () => void;
}

//this component is for showing the confirmation message for a confirmation alert
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
