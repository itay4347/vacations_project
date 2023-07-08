import React, { FC } from 'react';
import styles from './Home.module.scss';
import Login from '../AuthArea/Login/Login';


interface HomeProps { }

const Home: FC<HomeProps> = () => {

    return (
        <div className={styles.Home}>
            <p>welcome to Bon Voyage.
                <br />
                Everybody love themselves a nice vacation. 
                <br />
                whether its a relaxed holiday by the bitch, city travels or adventure around the nature of our world.
                <br />
                in this site, you can enjoy a big variaty of vacations and destination around the world for you to travel!
                <br />
                please Login to see all the available vacations!
            </p>
            <Login/>
        </div>
    )
}





export default Home;
