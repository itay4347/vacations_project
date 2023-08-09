import React, { FC } from 'react';
import styles from './Header.module.scss';
import AuthMenu from '../../AuthArea/AuthMenu/AuthMenu';
import { BASE_API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

    const navigate = useNavigate();
    return (
        <header className={styles.Header}>
                
            <img onClick={() => {navigate('/vacations')}} 
                 src={`${BASE_API_URL}/vacations/images/logo.png`} 
                 alt="site logo" />
            <div className={styles.Header__authMenu}>
                <AuthMenu/>
            </div>
        </header>
    )
}





export default Header
