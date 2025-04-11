import React from 'react';
import SideBar from './SideBar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = ({isSidebarOpen, setIsSidebarOpen }) => {
    return (
        <div className='flex flex-col' style={{height:'100vh',width:'100%'}}>
            <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
            <div className='flex'>

            <SideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="content-wrapper md:w-[100vh] w-[100%]">
             <Outlet/>
            </div>
            </div>
        </div>
    );
};

export default AdminLayout;