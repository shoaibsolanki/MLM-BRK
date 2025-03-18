import { Copy, X } from 'lucide-react';
import { useState } from 'react';

const ReferAndEarnModal = ({ isOpen, onClose }) => {
  const [referralCode, setReferralCode] = useState('FRIEND25OFF');
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Modal */}
      <div className="bg-white rounded shadow-lg w-11/12 max-w-md relative z-10">
        {/* Header */}
        <div className="bg-[#c2185b] text-white p-4 relative">
          <h2 className="text-xl font-semibold">Refer and Earn</h2>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">How it works</h3>
            <input
              type="text"
              placeholder="User ID"
              className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded outline-none bg-transparent"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded outline-none bg-transparent"
            />
         

         
            <div className="flex justify-between">
              <button className="bg-[#2874f0] text-white px-6 py-2 rounded">Login</button>
              <button className="bg-gray-200 dark:bg-gray-700 px-6 py-2 rounded">Register</button>
            </div>
            {copySuccess && (
              <p className="text-green-600 text-sm mt-1">Copied to clipboard!</p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Share via</h3>
            <div className="flex space-x-4">
              <button className="bg-[#3b5998] text-white px-4 py-2 rounded">Facebook</button>
              <button className="bg-[#1da1f2] text-white px-4 py-2 rounded">Twitter</button>
              <button className="bg-[#25d366] text-white px-4 py-2 rounded">WhatsApp</button>
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default ReferAndEarnModal;
