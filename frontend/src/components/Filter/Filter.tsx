import React, { FC,ChangeEvent } from 'react';
import styles from './Filter.module.scss';

interface FilterProps {
  onChange:(e:ChangeEvent<HTMLInputElement>) => void;
}

const Filter: FC<FilterProps> = ({onChange}) => (
  <div className={styles.Filter}>
    <h3 className='headerFont'>Filter vacations:</h3>
          <div className='filters textFont'>
            <div>
              <label htmlFor='start'>Vacations not started</label>
              <input id='start' value="start" type="checkbox" onChange={onChange} />
            </div>
            <div>
              <label htmlFor='active'>Active vacations</label>
              <input id='active' value="active" type="checkbox" onChange={onChange} />
            </div>
            <div>
              <label htmlFor='liked'>My vacations</label>
              <input id='liked' value="liked" type="checkbox" onChange={onChange} />
            </div>
          </div>
  </div>
);

export default Filter;
