import React, { FC } from 'react';
import styles from './VacationItem.module.scss';

interface VacationItemProps {}

const VacationItem: FC<VacationItemProps> = () => (
  <div className={styles.VacationItem}>
    VacationItem Component
  </div>
);

export default VacationItem;
