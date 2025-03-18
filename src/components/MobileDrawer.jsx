import { LogIn, User, X } from 'lucide-react';

const MobileDrawer = ({ isOpen, onClose, navItems }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="absolute top-0 left-0 h-full w-[80%] max-w-[300px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#2874f0] text-white">
          <div className="flex items-center">
            <User size={24} className="mr-2" />
            <div>
              <div className="font-medium">Hello, User</div>
              <div className="text-xs">Welcome to Flipkart</div>
            </div>
          </div>
          <button onClick={onClose} className="text-white">
            <X size={24} />
          </button>
        </div>
        
        {/* Login Button */}
        <div className="p-4 border-b">
          <button className="flex items-center justify-center w-full bg-[#2874f0] text-white py-2 px-4 rounded-sm">
            <LogIn size={16} className="mr-2" />
            <span>Login / Sign Up</span>
          </button>
        </div>
        
        {/* Navigation Items */}
        <div className="overflow-y-auto">
          <div className="py-2">
            {navItems.map((item, index) => (
              <a 
                key={index} 
                href="#" 
                className="block px-4 py-3 text-sm border-b border-gray-100 hover:bg-gray-50"
              >
                {item}
              </a>
            ))}
          </div>
          
          {/* Additional Mobile Menu Items */}
          <div className="mt-2 border-t">
           
            <a href="#" className="block px-4 py-3 text-sm border-b border-gray-100">
              My Orders
            </a>
            <a href="#" className="block px-4 py-3 text-sm border-b border-gray-100">
              My Wishlist
            </a>
            <a href="#" className="block px-4 py-3 text-sm">
              Customer Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
