import React, { FC, ReactNode } from 'react';
import {createPortal} from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
  children:ReactNode;
  onClose?: () => void;
}

//a reusable modal that will appear above everything else in my app when shown.
//i use it for displaying the alert components.
const Modal: FC<ModalProps> = ({children,onClose}) => {

  const portal = (
    <div className={styles.Modal}>
        <div onClick={onClose} className={styles.Modal__overlay}></div>
        <div className={styles.Modal__content}> {children} </div>
    </div>
)


return createPortal(portal, document.body);

}

export default Modal;
