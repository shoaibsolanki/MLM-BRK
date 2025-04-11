import { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import Transactions from './Transactions';
import { Award, ChartBar, CircleHelp, House, LogOut, Settings, ShoppingBag, Users, X,CreditCard,History } from 'lucide-react';
import Orders from './OrderHistory';
const tabItems = [
  { id: 'order-history', label: 'Order History', icon: <History size={16} /> },

  // { id: 'dashboard', label: 'Dashboard', icon: <House size={16} /> },
  // { id: 'team', label: 'Team', icon: <Users size={16} /> },
  // { id: 'products', label: 'Products', icon: <ShoppingBag size={16} /> },
  { id: 'transactions', label: 'Transactions', icon: <CreditCard size={16} /> },
];
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('order-history');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  useEffect(() => {
    // Fetch auth data from localStorage
    const authDataString = localStorage.getItem('authData');
    if (authDataString) {
      const authData = JSON.parse(authDataString);

      // Format the data to match the profile structure
      const formattedProfile = {
        id: authData.id || '',
        name: authData.name || '',
        email: authData.email || '',
        phone: authData.mobileNumber || '',
        joinDate: authData.createdAt ? new Date(authData.createdAt).toISOString().split('T')[0] : '',
        rank: 'Customer', // fallback or mapped from somewhere else if needed
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80',
        bio: 'Welcome to your profile! Update your information to personalize your experience.',
        socialLinks: {
          facebook: '',
          instagram: '',
          twitter: ''
        }
      };

      setProfile(formattedProfile);
    }

    // Handle responsive check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateProfile = (updatedData) => {
    setProfile((prev) => {
      const newProfile = { ...prev, ...updatedData };
      localStorage.setItem('mlmProfile', JSON.stringify(newProfile));
      return newProfile;
    });
  };

  






 const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // if (isMobile) {
    //   closeSidebar();
    // }
  };
  if (!profile) return <div className="p-6">Loading profile...</div>;




  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - optional */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 md:px-20">
          {/* Profile Header */}
          <ProfileHeader profile={profile} updateProfile={updateProfile}/>
          <div className="overflow-x-auto flex justify-center mt-4 mb-2 px-2">
        <div className="flex bg-gray-100 rounded-lg p-1 w-full">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`text-nowrap flex items-center justify-center flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'transactions' && <Transactions customerId={profile.id} />}
      {activeTab === 'order-history' && <Orders  />}

        </div>
      </div>
    </div>
  );
};

export default Profile;
