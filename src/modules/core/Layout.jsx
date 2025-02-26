import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Example common element

function Layout() {
    return (
    <div>
        <Navbar />
        <div className="content">
        <Outlet />
        </div>
        {/* Add Footer here if needed */}
    </div>
    );
}

export default Layout;