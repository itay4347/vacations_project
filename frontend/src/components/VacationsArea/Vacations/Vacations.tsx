import React, { FC } from 'react';
import styles from './Vacations.module.scss';
import Vacation from '../../../models/Vacation';
import VacationItem from './VacationItem/VacationItem';

interface VacationsProps {
  vacations:Vacation[]
}

const Vacations: FC<VacationsProps> = ({vacations}) => {


  const renderVacations = () => {
    return vacations.map((vacation) => {
      const {id} = vacation;
      return <VacationItem key={id} vacation={vacation}/>
    });
  }
  
  return(
    <div className={styles.Vacations}>
      <ul className={styles.Vacations__vacationsList}>
        {renderVacations()}
      </ul>
    </div>
  )
}

export default Vacations;
