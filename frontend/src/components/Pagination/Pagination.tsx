import React, { FC, useState } from 'react';
import styles from './Pagination.module.scss';
import Button from '../Button/Button';

interface PaginationProps {
  totalVacations:number;
  vacationsPerPage:number;
  setCurrentPage: (page:number) => void;
}

const Pagination: FC<PaginationProps> = ({totalVacations,vacationsPerPage,setCurrentPage}) => {

  const pages:number[]= [];
  for(let i = 1; i <= Math.ceil(totalVacations/vacationsPerPage);i++){
    pages.push(i);
  }

  const renderPages = () => {
    return pages.map((page,index) => {
      return <button onClick={() => setCurrentPage(page)} key={index}>{page}</button>
    })
  }
  return(
    <div className={styles.Pagination}>
      {renderPages()}
    </div>
  )
}

export default Pagination;
