import React from 'react';
import SideBar from './SideBar';
import Navbar from './Navbar';

const AdminLayout = ({isSidebarOpen, setIsSidebarOpen, children }) => {
    return (
        <div className='flex flex-col' style={{height:'100vh',width:'100%'}}>
            <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
            <div className='flex'>

            <SideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="content-wrapper">
                {children}
            </div>
            </div>
        </div>
    );
};

export default AdminLayout;