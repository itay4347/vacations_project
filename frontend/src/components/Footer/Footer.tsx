import React, { FC } from 'react';

import styles from './Footer.module.scss';


interface FooterProps { }

const Footer: FC<FooterProps> = () => {

    return (
        <footer className={`blueBackground ${styles.Footer}`}>
            Footer
        </footer>
    )
}





export default Footer
