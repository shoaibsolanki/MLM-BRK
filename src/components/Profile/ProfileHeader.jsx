import { useEffect, useState } from 'react';
import { Calendar, Facebook, Gem, Instagram, Mail, Pen, Phone, Twitter, X } from 'lucide-react';
import DataService from "../../services/requestApi"; // Import DataService

const ProfileHeader = ({ profile, updateProfile }) => {


 const [data, setData] = useState([])
  const GetRewardPoint = async ()=>{
    try {
      const response = await DataService.GetRewardPoint(profile?.id)
      if(response.data.status){
        setData(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
      GetRewardPoint();
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    bio: profile.bio
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header background */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-32 relative">
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <Pen size={16} className="text-gray-700" />
          </button>
        )}
      </div>

      <div className="px-6 pb-6 relative">
        {/* Avatar */}
        <div className="absolute -top-16 left-6">
          <img 
            src={profile.avatar} 
            alt={profile.name} 
            className="w-28 h-28 rounded-full object-cover border-4 border-white"
          />
        </div>

        <div className="pt-16">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Pen Profile</h2>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Profile info */}
              <div className="mt-2 flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                  <div className="text-sm text-indigo-600 font-medium">{profile.rank}</div>
                </div>
                <div className="flex flex-col-3 md:items-end mt-3 md:mt-0">
  <div className="mx-2 flex items-center space-x-2 text-sm text-gray-700 font-medium bg-indigo-50 px-3 py-2 rounded-lg shadow-sm">
    <Gem size={18} className="text-indigo-600" />
    <span>{data?.points ?? 0} Ponits</span>
  </div>
  <div className="mx-2 flex items-center space-x-2 text-sm text-gray-700 font-medium bg-indigo-50 px-3 py-2 rounded-lg shadow-sm">
    <Gem size={18} className="text-indigo-600" />
    <span>{data?.monthlyRp ?? 0} Monthly RP</span>
  </div>
  <div className="mx-2 flex items-center space-x-2 text-sm text-gray-700 font-medium bg-indigo-50 px-3 py-2 rounded-lg shadow-sm">
    <Gem size={18} className="text-indigo-600" />
    <span>{data?.monthlyRp ?? 0} Total RP</span>
  </div>
</div>
              </div>

              {/* Contact details */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail size={16} className="mr-2" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={16} className="mr-2" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  <span>Member since {formatDate(profile.joinDate)}</span>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-5">
                <h3 className="text-sm font-medium text-gray-700 mb-1">About</h3>
                <p className="text-gray-600">{profile.bio}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
