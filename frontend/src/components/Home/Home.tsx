import React, { FC, useState } from 'react';
import styles from './Home.module.scss';
import Login from '../AuthArea/Login/Login';


interface HomeProps { }

const Home: FC<HomeProps> = () => {


    return (
        <div className={styles.Home}>
            <Login/>
        </div>
    )
}





export default Home;
