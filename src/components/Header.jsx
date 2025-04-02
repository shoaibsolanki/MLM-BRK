import { ChevronDown, LogIn, Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MobileDrawer from './MobileDrawer';
import ReferAndEarnModal from './ReferAndEarnModal';
import logo from '../assets/sarvLogo.png';
import { useAuth } from '../contexts/AuthConext';
import DataService from "../services/requestApi";
import { useCart } from '../contexts/CartContext';
import Badge from "@mui/material/Badge";
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Help & Support', path: '/support' },
  { label: 'Refer And Earn', path: '/refer' }
];

const Header = () => {
  const { searchKeyword, setSearchKeyword, setSearchResults,logout } = useAuth();
  const { cart, totalItems } = useCart();

  const [inputValue, setInputValue] = useState(searchKeyword);
  const { saasid, storeid } = useAuth();

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchKeyword.trim() === "") {
        setSearchResults([]);
        return;
      }
  
      const response = await DataService.GetrecommendedItemByKeyword(storeid, saasid, searchKeyword);
      if (response.status) {
        setSearchResults(response.data.data || []);
      }else{
        setSearchResults([])
      }
    }, 1000); // Delay of 500ms
  
    return () => clearTimeout(handler); // Cleanup function to clear the previous timeout
  }, [searchKeyword]);
  






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
  const clearSearch = () => {
    setInputValue("");
    setSearchKeyword("");
    setSearchResults([]);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const isAuthenticated = localStorage.getItem("token");

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
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setSearchKeyword(e.target.value);
              }}
              placeholder="Search for Products, Brands and More"
              className="w-full py-2 px-4 bg-transparent border-none outline-none text-sm"
            />
             {inputValue && (
              <button onClick={clearSearch} className="absolute right-10 text-gray-500 hover:text-gray-700">
                <X size={18} />
              </button>
            )}
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
         {isAuthenticated?
         <button 
         onClick={() =>logout()}
     
     className="hidden md:flex items-center bg-white text-[#2874f0] px-5 py-1 font-medium text-sm border border-[#dbdbdb] rounded-sm">
       <LogIn  size={16} className="mr-2" />
       Logout
     </button>:
         <button 
              onClick={() =>setIsModalOpen(true)}
          
          className="hidden md:flex items-center bg-white text-[#2874f0] px-5 py-1 font-medium text-sm border border-[#dbdbdb] rounded-sm">
            <LogIn  size={16} className="mr-2" />
            Login
          </button>}
          
          <Link to="/cart">
          <button className="flex items-center text-sm font-medium relative">
      <Badge 
        badgeContent={totalItems} 
        color="error"
        overlap="circular"
      >
        <ShoppingCart size={26} />
      </Badge>
      <span className="ml-1">Cart</span>
    </button>
    </Link>
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
