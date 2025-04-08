import { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import Transactions from './Transactions';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
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

  




  if (!profile) return <div className="p-6">Loading profile...</div>;




  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - optional */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">
          {/* Profile Header */}
          <ProfileHeader profile={profile} updateProfile={updateProfile}/>

          <Transactions customerId={profile.id} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
