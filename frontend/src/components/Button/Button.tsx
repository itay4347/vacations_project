import React, { FC } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({children,onClick}) => (
  <button className={styles.Button} onClick={onClick}>
    {children}
  </button>
);

export default Button;
