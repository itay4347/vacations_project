import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import Home from "../Home/Home";
import SomeOtherComponent from "../SomeOtherComponent/SomeOtherComponent";
import Register from '../AuthArea/Register/Register';
import Login from '../AuthArea/Login/Login';
import VacationsArea from '../VacationsArea/VacationsArea';
import AddVacation from '../VacationsArea/AddVacation/AddVacation';
import EditVacation from '../VacationsArea/EditVacation/EditVacation';
import LikeChart from '../LikeChart/LikeChart';


interface RouterProps { }

const Router: FC<RouterProps> = () => (
    <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        <Route path='/login' element={<Login/>}/>

        <Route path="/register" element={<Register />} />

        <Route path="/vacations" element={<VacationsArea />} />

        <Route path="/addVacation" element={<AddVacation />} />

        <Route path='/editVacation' element={<EditVacation/>}/>

        <Route path='/followersChart' element={<LikeChart/>}/>




        {/* Page not Found */}
        <Route path="*" element={<PageNotFound />} />

    </Routes>
);

export default Router;

