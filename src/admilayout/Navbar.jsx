import { Close, Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import logo from '../assets/sarvLogo.png';
const Navbar = ({isSidebarOpen, setIsSidebarOpen}) => {
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
    return (
        <nav className="bg-[#383a3a] p-4">
            <div className="container mx-10 flex justify-between items-center">
                {/* <IconButton onClick={toggleSidebar} className="md:hidden">
                            {isSidebarOpen ? <Close style={{color:"white"}}/> : <Menu style={{color:"white"}} />}
                        </IconButton> */}
                <div className="text-white text-lg font-bold flex items-center gap-3 "> 
                {isSidebarOpen ? "BRK Cart " : <img src={logo} alt="Sarv Logo" className="h-8" />}

                <IconButton onClick={toggleSidebar} className="md:hidden">
                            {isSidebarOpen ? <Close style={{color:"white"}}/> : <Menu style={{color:"white"}} />}
                        </IconButton>
                </div>
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