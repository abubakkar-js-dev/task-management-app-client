import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Navbar/Footer/Footer';

const MainLayout = () => {
    return (
        <div >
            <Navbar />
            <div className={`min-h-[calc(100vh-65px)]`}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;