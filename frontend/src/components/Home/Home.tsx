import React, { FC } from 'react';
import styles from './Home.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {decrease, increase} from "../../counter/counterSlice";


interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const counter = useAppSelector(state => state.counter);
    const dispatch = useAppDispatch();

    return (
        <div className={styles.Home}>

        </div>
    )
}





export default Home;
