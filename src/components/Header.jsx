import { ChevronDown, LogIn, Menu, Search, ShoppingCart, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white py-2.5 px-4 md:px-6 shadow-md sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto flex items-center">
        {/* Logo */}
        <div className="mr-4 flex items-center">
          <div className="text-2xl font-bold text-[#2874f0]">Flipkart</div>
          <div className="hidden md:flex items-center text-xs italic text-[#9e9e9e]">
            Explore <span className="text-[#ffe500] font-medium ml-0.5">Plus</span>
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNGRkUwMDAiIGQ9Ik0wIDBoMTZ2MTZIMHoiLz48cGF0aCBkPSJNNi41NzIgNC000LjkxNCA3LjA3MmMtLjE5Mi4xOTItLjMuNDUyLS4zLjcyOCAwIC4yNzUuMS41MzYuMy43MjhsMS41IDEuNWMuMTkzLjE5Mi40NTMuMyA3MjguMy43MjguMzAwIDAgLjUzNS0uMTA4LjcyOC0uM2wyLjcyOC0yLjgzIDIuNzMgMi44M2MuMTkyLjE5Mi40NTIuMy43MjcuMy4yNzYgMCAuNTM2LS4xMDguNzI4LS4zbDEuNS0xLjVjLjE5My0uMTkyLjMtLjQ1My4zLS43MjggMC0uMjc2LS4xMDctLjUzNi0uMy0uNzI4TDguNzE1IDRjLS4yLS4xOTMtLjQ4LS4zLS43NTgtLjNoLS42MjdjLS4yOCAwLS41Ni4xMDctLjc1OC4zeiIgc3Ryb2tlPSIjRkZFMDAwIiBzdHJva2Utd2lkdGg9Ii4yNSIgZmlsbD0iIzI2MjYyNiIvPjwvZz48L3N2Zz4K" 
              width="10" 
              height="10" 
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

        {/* Right Menu Options */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center bg-white text-[#2874f0] px-5 py-1 font-medium text-sm border border-[#dbdbdb] rounded-sm">
            <LogIn size={16} className="mr-2" />
            Login
            <ChevronDown size={16} className="ml-1" />
          </button>
          
          <button className="hidden md:flex items-center text-sm font-medium">
            Become a Seller
          </button>
          
          <button className="flex items-center text-sm font-medium">
            <ShoppingCart size={20} className="mr-1" />
            Cart
          </button>
          
          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
