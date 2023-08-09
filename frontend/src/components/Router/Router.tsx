import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import Home from "../Home/Home";
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
        {/* login component */}
        <Route path='/login' element={<Login/>}/>
        {/* register component */}
        <Route path="/register" element={<Register />} />
        {/* vacations Area component */}
        <Route path="/vacations" element={<VacationsArea />} />
        {/* add vacation component */}
        <Route path="/addVacation" element={<AddVacation />} />
        {/* edit vacation component */}
        <Route path='/editVacation' element={<EditVacation/>}/>
        {/* followers chart component */}
        <Route path='/followersChart' element={<LikeChart/>}/>




        {/* Page not Found */}
        <Route path="*" element={<PageNotFound />} />

    </Routes>
);

export default Router;

