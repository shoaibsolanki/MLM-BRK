import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleAlert, CircleCheck, Clock, Pen, Plus } from 'lucide-react';
import DataService from "../../services/requestApi";
import { useAuth } from '../../contexts/AuthConext';

const KycStatus = ({ userId }) => {
  const navigate = useNavigate();
  const [kycData, setKycData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const [kycStatus, setKycStatus] = useState(null);
  const { id, saasid, storeid, } = useAuth();
  const getkycData = async () => {  
    try {
      const response = await DataService.Getkycstatus(saasid, storeid,id);
      const kycStatus = response.data?.data?.status;
      if (response?.data?.status) {
        localStorage.setItem('kycStatus', kycStatus);
        setKycStatus(response?.data?.data?.status);
        setKycData(response?.data?.data);


      }
    } catch (error) {
      console.error("Error fetching saved addresses:", error);
    }
  };
  useEffect(() => {
   
    getkycData();
  }, [ saasid, storeid,id]);

  const handleAddKyc = () => {
    navigate('/kyc');
  };

//   if (isLoading) {
//     return (
//       <div className="w-full max-w-xs mt-3 flex items-center justify-center space-x-2 bg-gray-100 px-4 py-3 rounded-lg shadow-md">
//         <Clock size={18} className="text-gray-500 animate-pulse" />
//         <span className="text-sm text-gray-600">Loading KYC status...</span>
//       </div>
//     );
//   }

  if (error) {
    return (
      <div className="w-full max-w-xs mt-3 flex items-center space-x-2 bg-red-50 px-4 py-3 rounded-lg shadow-md">
        <CircleAlert size={18} className="text-red-500" />
        <span className="text-sm text-red-600">{error}</span>
      </div>
    );
  }

  // No KYC data available - show "Add KYC" option
  if (!kycData || !kycData.status) {
    return (
      <div className="w-full max-w-xs mt-3 bg-indigo-50 px-4 py-3 rounded-lg shadow-md transition-all hover:shadow-lg">
        <button 
          onClick={handleAddKyc}
          className="w-full flex items-center justify-center space-x-2 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <Plus size={18} />
          <span className="text-sm">Complete Your KYC</span>
        </button>
      </div>
    );
  }

  // KYC is pending
  if (kycData?.status === "Pending") {
    return (
      <div className="w-full max-w-xs mt-3 bg-amber-50 px-4 py-3 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock size={18} className="text-amber-500" />
            <span className="text-sm font-medium text-amber-700">Your KYC is Processing</span>
          </div>
          <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
            {kycData.applyDate ? new Date(kycData.applyDate).toLocaleDateString() : 'Pending'}
          </span>
        </div>
        
        {kycData.bankName && (
          <div className="mt-2 text-xs text-amber-700">
            <p className="truncate">Bank: {kycData.bankName}</p>
            {kycData.accountNo && (
              <p className="truncate">Account: ••••{kycData.accountNo.slice(-4)}</p>
            )}
          </div>
        )}
      </div>
    );
  }

  // KYC is active
  if (kycData.status === "Approved") {
    return (
      <div className="w-full max-w-xs mt-3 bg-green-50 px-4 py-3 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CircleCheck size={18} className="text-green-500" />
            <span className="text-sm font-medium text-green-700">Your KYC is Activated</span>
          </div>
          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
            Active
          </span>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-green-700">Wallet Balance</span>
          <span className="text-sm font-bold text-green-700">
            ₹{kycData.walletBalance?.toFixed(2) || '0.00'}
          </span>
        </div>
      </div>
    );
  }

  // Default fallback (should rarely happen)
  return (
    <div className="w-full max-w-xs mt-3 flex items-center space-x-2 bg-gray-100 px-4 py-3 rounded-lg shadow-md">
      <CircleAlert size={18} className="text-gray-500" />
      <span className="text-sm text-gray-600">Check KYC Status</span>
    </div>
  );
};

export default KycStatus;
