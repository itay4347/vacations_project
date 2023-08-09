import React, { ChangeEvent, FC,useEffect, useState } from 'react';

import styles from './Vacations.module.scss';
import Vacation from '../../../models/Vacation';
import VacationItem from './VacationItem/VacationItem';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getVacationsLikedPerUserAsync } from '../../../fetch/followersService';
import { setLikedVacations } from '../../../auth/authSlice';
import User from '../../../models/User';
import { useNavigate } from 'react-router-dom';
import Role from '../../../models/Role';
import Alert from '../../AlertArea/Alert/Alert';
import Button from '../../DesignedComponents/Button/Button';
import { getAllActiveVacationsAsync, getVacationsNotStartedAsync } from '../../../fetch/vacationsService';
import Pagination from '../../DesignedComponents/Pagination/Pagination';
import AdminArea from '../../AdminArea/AdminArea';
import Filter from '../../DesignedComponents/Filter/Filter';


interface VacationsProps {
  vacations:Vacation[];
}

const Vacations: FC<VacationsProps> = ({vacations}) => {

  const [error,setError] = useState<any>(null);
  const [showError,setShowError] = useState<boolean>(false);
  const [selectedFilter,setSelectedFilter] = useState<string[]>([]);//an array state to set the filters the user chose.
  const [filteredVacations,setFilteredVacations] = useState<Vacation[]>([]);//array state for all the filteredVacations.
  const [currentPage,setCurrentPage] = useState(1);//a state for updating the current page im in at the start.

  const {user} = useAppSelector(state => state.authState);//getting the user object that is connected right now.
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //varaible for how many vacations i want to display in one page.
  const vacationsPerPage = 10;
  //setting the last index dinamycally according to the current page im in
  const lastVacationIndexInOnePage = currentPage * vacationsPerPage;
  //setting the first page according to the last vacation index minus the number of vacations per page
  const firstVacationIndexInOnePage = lastVacationIndexInOnePage - vacationsPerPage;
  //slicing the filteredVacations array according to the first and lase vacation index that is changed according to the page im in.
  const vacationsInOnePage = filteredVacations.slice(firstVacationIndexInOnePage,lastVacationIndexInOnePage);

  //a function for handling the filter selection.
  const handleFilterSelection = (e:ChangeEvent<HTMLInputElement>) => {
    const filter = e.target.value;
    
    //if the checkbox i clicked is checked set the selected filter state into a new instance 
    //that takes the previus filters and adds the new filter
    //else, filter this array into a new array where the f is not equal to the filter value.
    if(e.target.checked){
      setSelectedFilter((prevFilters) => [...prevFilters, filter]);
    }else{
      setSelectedFilter((prevFilters) => prevFilters.filter((f) => f !== filter));
    }
    
  }

  //function to dispatch the liked vacations state for the connected user.
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


  //a function for appliying the filter logic.
  useEffect(() => {
  
    const getFilteredVacations = async () => {
      
      try {
        //if the selected filter array is empty set the filtered vacations as the vacations array to show all vacations.
        if (selectedFilter.length === 0) {
          setFilteredVacations(vacations);
          return;
        }
  
        let _filteredVacations:Vacation[] = [];
        let _vacationsLikedByUser:Vacation[] = [];
        let vacationsLikedByUser:Vacation[] = []
        const vacationsNotStarted = await getVacationsNotStartedAsync();
        const activeVacations = await getAllActiveVacationsAsync();
        //getting the vacations that the user liked and adding to them the followers count of all users.
        if(user?.id){
          _vacationsLikedByUser = await getVacationsLikedPerUserAsync(user.id);
          vacationsLikedByUser = vacations.filter(vacation => {
            return _vacationsLikedByUser.some(_vacationLikedByUser => _vacationLikedByUser.id === vacation.id);
            
          });
        }
        
        //checking what the selectedFilter array includes and setting the _filteredVacations accordingly.
        if (selectedFilter.includes('start')) {
          _filteredVacations = vacationsNotStarted;
        } else if (selectedFilter.includes('active')) {
          _filteredVacations = activeVacations;
        } else if (selectedFilter.includes('liked') && user?.id) {
          _filteredVacations = vacationsLikedByUser;
        }
        //checkes if more than one elements is inside my array 
        if (selectedFilter.includes('start') && selectedFilter.includes('liked')) {
        // filter vacations that haven't started yet and are liked by the user
            console.log('start and liked filter selected')
            _filteredVacations = vacationsLikedByUser.filter((vacation) =>
            vacationsNotStarted.some((notStartedVacation) => notStartedVacation.id === vacation.id)
          );
        }
        //checkes if more than one elements is inside my array 
        if (selectedFilter.includes('active') && selectedFilter.includes('liked')) {
        // filter active vacations that are liked by the user and also active
            _filteredVacations = vacationsLikedByUser.filter((vacation) =>
            activeVacations.some((activeVacation) => activeVacation.id === vacation.id)
          );
        }

        //setting the _filteredVacations to an empty array because there cannot be a vacation that is active but
        //also didnt start yet.
        if(selectedFilter.includes('active') && selectedFilter.includes('start')){
          _filteredVacations = [];
        }
        setFilteredVacations([..._filteredVacations]);//setting the filtered vacations array to the _filteredVacations value.
      }catch (err) {
        setError(err);
        setShowError(true);
      }
    };
  
    getFilteredVacations();
  }, [selectedFilter,vacations]);//i run this function everytime the selectedFilter or vacations array has changed
  

  const displayErrorMessage = () => {
    if(error && showError){

      return(
        <Alert error={'you have to be logged in to access this page'} onClose={() => {setShowError(false)}}>
          <Button onClick={() => {
            navigate('/');
          }}>
            Login
          </Button>
        </Alert>
      )
    }
  }

  //a function to render the vacations on the screen.
  const renderVacations = () => {
    //if the array is empty show message.
    if(vacationsInOnePage.length === 0){ 
      return <h3>No vacations found!</h3>
    }
      //else, map the vacationsInOnePage and return the vacationItem component.
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
          totalVacations={vacations.length}//the total vacations number is equal to the length of the array
          vacationsPerPage={vacationsPerPage}//this is equal to the variable i assigned in the top
          setCurrentPage={setCurrentPage}//this is equal to the setCurrentPage function
       />
      </div>

  )
}

export default Vacations;
