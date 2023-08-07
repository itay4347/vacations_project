import React, { FC } from 'react';
import styles from './AdminArea.module.scss';
import User from '../../models/User';
import Role from '../../models/Role';
import { NavLink } from 'react-router-dom';
import { downLoadCsvFile } from '../../fetch/followersService';

interface AdminAreaProps {}

const AdminArea: FC<AdminAreaProps> = () => {


  const handleCsvDownload = async () => {
    try {
      // Call the download function
      const csvData = await downLoadCsvFile();

      // Create a Blob from the data
      const blob = new Blob([csvData], { type: 'text/csv' });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `followers.csv`;

      // Append the anchor to the document and click it programmatically
      document.body.appendChild(a);
      a.click();

      // Remove the temporary anchor from the document
      document.body.removeChild(a);

      // Release the URL object
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading CSV:', err);
    }
  };

  return(
      <div className={`headerFont ${styles.AdminArea}`}>

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
