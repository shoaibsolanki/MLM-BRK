import { ArrowUp, Facebook, Instagram, Linkedin, Mail, MessageCircle, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  // Function to scroll back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-200 text-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-screen-2xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="flex flex-col">
            {/* Logo */}
            <div className="mb-4">
              <img 
                   src="https://www.sarvswapn.com/assets/images/new-logo.png"
                alt="Sarv Swapn Solutions Logo" 
                className="h-20 w-auto"
              />
            </div>
            
            {/* Address */}
            <div className="text-sm mb-2">
              630, Hinglaj Margh, Gandhi Colony,<br />
              Jaisalmer 345001, (Rajasthan) India
            </div>
            
            {/* Contact Information */}
            <div className="mt-2">
              <div className="flex items-center text-sm mb-1">
                <span>+91 7597663555</span>
              </div>
              <div className="flex items-center text-sm">
                <span>alldreamssolutions@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-base font-semibold uppercase mb-4">Supports</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-gray-600 transition duration-300">Legal</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-600 transition duration-300">Shipping & Returns</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-600 transition duration-300">Terms & Condition</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-600 transition duration-300">Privacy</a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-base font-semibold uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-gray-600 transition duration-300">Gallery</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-600 transition duration-300">Contact Us</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-600 transition duration-300">Blog</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-base font-semibold uppercase mb-4">Social Links</h3>
            <div className="grid grid-cols-4 gap-2">
              <a href="#" className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-300 transition duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-300 transition duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-300 transition duration-300">
                <Youtube size={18} />
              </a>
              <a href="#" className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-300 transition duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-300 transition duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-300 transition duration-300">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-300 transition duration-300">
                <Mail size={18} />
              </a>
              <a href="#" className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-300 transition duration-300">
                <span className="text-lg">🔗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-gray-800 text-white py-4 relative">
        <div className="max-w-screen-2xl mx-auto px-4 text-center text-sm">
          Copyright © 2023, Sarv Swapn Solutions Pvt. Ltd. All Rights Reserved.
        </div>
        {/* Back to top button */}
        <button 
          onClick={scrollToTop}
          className="absolute right-6 bottom-4 bg-gray-700 p-2 rounded-md hover:bg-gray-600 transition duration-300"
          aria-label="Back to top"
        >
          <ArrowUp size={20} className="text-white" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
