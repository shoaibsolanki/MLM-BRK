import { ChevronDown, LogIn, Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileDrawer from './MobileDrawer';
import ReferAndEarnModal from './ReferAndEarnModal';
import logo from '../assets/sarvLogo.png';
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Help & Support', path: '/support' },
  { label: 'Refer And Earn', path: '/refer' }
];

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavigation = (path) => {
    if (path === '/refer') {
      setIsModalOpen(true);
    } else {
      navigate(path);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="bg-white py-2.5 px-4 md:px-6 shadow-md sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto flex items-center">
        {/* Logo */}
        <div className="mr-4 flex items-center">
          <button className="md:hidden" onClick={toggleDrawer}>
            {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden md:flex items-center text-xs italic text-[#9e9e9e]">
            <img 
              src={logo} 
              width="80" 
              height="80" 
              className="ml-0.5"
              alt="Plus icon"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-grow relative mx-2 md:mx-4">
          <div className="flex items-center bg-[#f0f5ff] rounded-sm overflow-hidden">
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              className="w-full py-2 px-4 bg-transparent border-none outline-none text-sm"
            />
            <button className="px-4 py-2 text-[#2874f0]">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Items - Desktop */}
        <div className="hidden md:flex items-center space-x-6 mr-6">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className="text-sm font-medium hover:text-[#2874f0] whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Menu Options */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center bg-white text-[#2874f0] px-5 py-1 font-medium text-sm border border-[#dbdbdb] rounded-sm">
            <LogIn size={16} className="mr-2" />
            Login
            <ChevronDown size={16} className="ml-1" />
          </button>
          
          <button className="flex items-center text-sm font-medium">
            <ShoppingCart size={20} className="mr-1" />
            Cart
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} navItems={navItems} />

      {/* Refer And Earn Modal */}
      <ReferAndEarnModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </header>
  );
};

export default Header;
