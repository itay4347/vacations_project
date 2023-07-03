import React, { FC } from 'react';

import styles from './Header.module.scss';
import {NavLink} from "react-router-dom";
import AuthMenu from '../AuthArea/AuthMenu/AuthMenu';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

    return (
        <header className={styles.Header}>
            
            <div className={styles.Header__headerLinks}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/otherComponent">other component</NavLink>
                <NavLink to="/navlink">navlink</NavLink>
            </div>
            <div className={styles.Header__authMenu}>
                <AuthMenu/>
            </div>
        </header>
    )
}





export default Header
