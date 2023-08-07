import React, { ChangeEvent, FC,useEffect, useState } from 'react';

import styles from './Vacations.module.scss';
import Vacation from '../../../models/Vacation';
import VacationItem from './VacationItem/VacationItem';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getVacationsLikedPerUserAsync } from '../../../fetch/followersService';
import { setLikedVacations } from '../../../auth/authSlice';
import User from '../../../models/User';
import { NavLink } from 'react-router-dom';
import Role from '../../../models/Role';
import Alert from '../../AlertArea/Alert/Alert';
import Button from '../../Button/Button';
import { getAllActiveVacationsAsync, getVacationsNotStartedAsync } from '../../../fetch/vacationsService';
import Pagination from '../../Pagination/Pagination';
import LikeChart from '../../LikeChart/LikeChart';
import AdminArea from '../../AdminArea/AdminArea';
import Filter from '../../Filter/Filter';


interface VacationsProps {
  vacations:Vacation[];
}

const Vacations: FC<VacationsProps> = ({vacations}) => {

  const [error,setError] = useState<any>(null);
  const [showError,setShowError] = useState<boolean>(false);
  const [selectedFilter,setSelectedFilter] = useState<string[]>([]);
  const [filteredVacations,setFilteredVacations] = useState<Vacation[]>([]);
  const [currentPage,setCurrentPage] = useState(1);

  const {user} = useAppSelector(state => state.authState);
  const dispatch = useAppDispatch();

  const vacationsPerPage = 10;
  const lastVacationIndexInOnePage = currentPage * vacationsPerPage;
  const firstVacationIndexInOnePage = lastVacationIndexInOnePage - vacationsPerPage;
  // console.log(filteredVacations);
  const vacationsInOnePage = filteredVacations.slice(firstVacationIndexInOnePage,lastVacationIndexInOnePage);

  const handleFilterSelection = (e:ChangeEvent<HTMLInputElement>) => {
    const filter = e.target.value;
    
    if(e.target.checked){
      setSelectedFilter((prevFilters) => [...prevFilters, filter]);
    }else{
      setSelectedFilter((prevFilters) => prevFilters.filter((f) => f !== filter));
    }
    
  }

  useEffect(() => {
    const getVacationsFollowed = async () => {
      try{
        const vacationsFollowed = await getVacationsLikedPerUserAsync(user?.id as number);
        dispatch(setLikedVacations(vacationsFollowed));
      }catch(err){
        setError(err);
        setShowError(true);
      }
    }
    getVacationsFollowed();
  },[]);


  useEffect(() => {
  
    const getFilteredVacations = async () => {
      try {
        if (selectedFilter.length === 0) {
          setFilteredVacations(vacations);
          return;
        }
  
        let _filteredVacations:Vacation[] = [];
        let vacationsLikedByUser:Vacation[] = []
        const vacationsNotStarted = await getVacationsNotStartedAsync();
        const activeVacations = await getAllActiveVacationsAsync();
        if(user?.id){
          vacationsLikedByUser = await getVacationsLikedPerUserAsync(user.id);
        }
        
  
        if (selectedFilter.includes('start')) {
          _filteredVacations = vacationsNotStarted;
        } else if (selectedFilter.includes('active')) {
          _filteredVacations = activeVacations;
        } else if (selectedFilter.includes('liked') && user?.id) {
          _filteredVacations = vacationsLikedByUser;

        } 
        if (selectedFilter.includes('start') && selectedFilter.includes('liked')) {
        // filter vacations that haven't started yet and are liked by the user
            console.log('start and liked filter selected')
            _filteredVacations = vacationsLikedByUser.filter((vacation) =>
            vacationsNotStarted.some((notStartedVacation) => notStartedVacation.id === vacation.id)
          );
        }
        if (selectedFilter.includes('active') && selectedFilter.includes('liked')) {
        // filter active vacations that are liked by the user
            console.log('active and liked filter selected');
            _filteredVacations = vacationsLikedByUser.filter((vacation) =>
            activeVacations.some((activeVacation) => activeVacation.id === vacation.id)
          );
        }

        if(selectedFilter.includes('active') && selectedFilter.includes('start')){
          _filteredVacations = [];
        }
        setFilteredVacations([..._filteredVacations]);
      }catch (err) {
        setError(err);
        setShowError(true);
      }
    };
  
    getFilteredVacations();
  }, [selectedFilter,vacations]);
  

  const displayErrorMessage = () => {
    if(error && showError){
      return(
        <Alert error={error.response.data} onClose={() => {setShowError(false)}}>
          <Button onClick={() => {
            window.location.reload();
          }}>Try again</Button>
        </Alert>
      );
    }
  }

  const renderVacations = () => {
    if(vacationsInOnePage.length === 0){ 
      return <h3>No vacations found!</h3>
    }
    
      return vacationsInOnePage.map((vacation) => {
      return <VacationItem 
              key={vacation.id}
              vacation={vacation}
              user={user as User} />
        
    });
  }



  
  return(
      <div className={styles.Vacations}>
        {displayErrorMessage()}
        <Filter onChange={handleFilterSelection}/>
        {user?.role === Role.Admin && <AdminArea/>}
        <ul className={styles.Vacations__vacationsList}>
          {renderVacations()}
        </ul>
        <Pagination
          totalVacations={vacations.length}
          vacationsPerPage={vacationsPerPage}
          setCurrentPage={setCurrentPage}
       />
      </div>

  )
}

export default Vacations;
