import React, { FC, useState } from 'react';
import styles from './Pagination.module.scss';
import Button from '../Button/Button';

//getting the total vacations, how many vacations per page and the setCurrentPage functions from the parent component.
interface PaginationProps {
  totalVacations:number;
  vacationsPerPage:number;
  setCurrentPage: (page:number) => void;
}

//a reusable pagination component for my app.
const Pagination: FC<PaginationProps> = ({totalVacations,vacationsPerPage,setCurrentPage}) => {

  const pages:number[]= [];//initialize an array for my pages.
  //runing a for loop to push the page number into the pagesArray if the i variable is less or equal to the total number of pages.
  //the number of pages is set by dividing the totalVacations prop by the vacationsPerPage prop.
  for(let i = 1; i <= Math.ceil(totalVacations/vacationsPerPage);i++){
    pages.push(i);
  }

  //rendering the pages selection menu buttons by maping the pages array.
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
