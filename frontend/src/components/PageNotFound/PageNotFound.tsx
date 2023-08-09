import React, { FC } from 'react';
import styles from './PageNotFound.module.scss';
import { BASE_API_URL } from '../../config';


interface PageNotFoundProps { }

//a component that is shown when the user routes in to a route that is doesnt handled by my router.
const PageNotFound: FC<PageNotFoundProps> = () => (
    <div className={styles.PageNotFound}>
        <img src={`${BASE_API_URL}/vacations/images/404.png`} alt="" />
        <p className='headerFont'>
            The page you are looking for, does not exist
        </p>
        
    </div>
);

export default PageNotFound;
