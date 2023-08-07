import React, { FC } from 'react';

import styles from './Header.module.scss';
import AuthMenu from '../AuthArea/AuthMenu/AuthMenu';
import { BASE_API_URL } from '../../config';
interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

    return (
        <header className={`blueBackground ${styles.Header}`}>
                
            <img src={`${BASE_API_URL}/vacations/images/logo.png`} alt="" />
            <div className={styles.Header__authMenu}>
                <AuthMenu/>
            </div>
        </header>
    )
}





export default Header
