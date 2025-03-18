import { Close, Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';

const Navbar = ({isSidebarOpen, setIsSidebarOpen}) => {
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <IconButton onClick={toggleSidebar} className="md:hidden">
                            {isSidebarOpen ? <Close style={{color:"white"}}/> : <Menu style={{color:"white"}} />}
                        </IconButton>
                <div className="text-white text-lg font-bold">Sarv Swapn Solutions</div>
                <div className="space-x-4">
                    {/* <a href="#" className="text-gray-300 hover:text-white">Home</a>
                    <a href="#" className="text-gray-300 hover:text-white">About</a>
                    <a href="#" className="text-gray-300 hover:text-white">Services</a>
                    <a href="#" className="text-gray-300 hover:text-white">Contact</a> */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;