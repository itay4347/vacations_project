import React, { FC } from 'react';

import styles from './Header.module.scss';
import AuthMenu from '../AuthArea/AuthMenu/AuthMenu';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

    return (
        <header className={`blueBackground ${styles.Header}`}>
                
            <h1>Bon Voyage</h1>
            <div className={styles.Header__authMenu}>
                <AuthMenu/>
            </div>
        </header>
    )
}





export default Header
