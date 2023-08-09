import React, { FC } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id?:string
}
//a reusable component for a button in my app
const Button: FC<ButtonProps> = ({children,onClick,id}) => (
  <button id={id} className={styles.Button} onClick={onClick}>
    {children}
  </button>
);

export default Button;
