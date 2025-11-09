import React from 'react';
import NavBar from '../Components/NavBar/NavBar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <NavBar/>
            <div className='mt-4'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;