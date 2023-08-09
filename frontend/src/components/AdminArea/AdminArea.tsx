import React, { FC,useState } from 'react';
import styles from './AdminArea.module.scss';
import User from '../../models/User';
import Role from '../../models/Role';
import { NavLink, useNavigate } from 'react-router-dom';
import { downLoadCsvFile } from '../../fetch/followersService';
import Alert from '../AlertArea/Alert/Alert';
import Button from '../DesignedComponents/Button/Button';

interface AdminAreaProps {}

const AdminArea: FC<AdminAreaProps> = () => {

  const [error, setError] = useState<any>(null);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const handleCsvDownload = async () => {
    try {
      // Call the download function
      const csvData = await downLoadCsvFile();

      // Create a Blob from the data
      const blob = new Blob([csvData], { type: 'text/csv' });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `followers.csv`;

      // Append the link to the document and click it by default
      document.body.appendChild(a);
      a.click();

      // affter  the app clicked the link and started the download, Remove the temporary link from the document
      document.body.removeChild(a);

      // Release the URL object to clean memory
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading CSV:', err);
      setError(err);
      setShowError(true);
    }
  };
  
  const displayErrorMessage = () => {
    if(error && showError){

      return(
        <Alert error={"Error downloading csv file"} onClose={() => {setShowError(false)}}>
          <Button onClick={() => {
            navigate('/vacations');
          }}>
            Login
          </Button>
        </Alert>
      )
    }
  }

  return(
      <div className={`headerFont ${styles.AdminArea}`}>

              {displayErrorMessage()}

              <NavLink  to="/addVacation">
                Add new vacation
              </NavLink>
              <NavLink  to="#" onClick={handleCsvDownload}>
                Download CSV File
              </NavLink>
              <NavLink to="/followersChart">
                Show Followers Chart
              </NavLink>
      

      </div>
  )
}



export default AdminArea;
