import React, { FC, ReactNode } from 'react';
import styles from './FormGroupWithError.module.scss';

interface FormGroupWithErrorProps {
  children:ReactNode;
  error?:string;
}
//a reuse component for a form group inside my app.
const FormGroupWithError: FC<FormGroupWithErrorProps> = ({children,error}) => (
  <div className={styles.FormGroupWithError}>
    {children}
    {error && <span className={styles.FormGroupWithError__errMessage}>{error}</span>}
  </div>
);

export default FormGroupWithError;
