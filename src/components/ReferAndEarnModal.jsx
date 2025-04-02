import { Copy, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataService from '../services/requestApi';
import { useSnackbar } from 'notistack';

const ReferAndEarnModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await DataService.Login({ user_name: userId, password });
      // if (response.data.data.user_data.userType !== 'ADMIN') {
      //   enqueueSnackbar('Access denied. User type is not authorized.', { variant: 'error' });
      //   return;
      // }
      if (response.data.status) {
        localStorage.clear();
        localStorage.setItem('token', response.data.data.jwt_response);
        localStorage.setItem('user_data', JSON.stringify(response.data.data.user_data));
        localStorage.setItem('authData', JSON.stringify(response.data.data.store_data));
        enqueueSnackbar(response.data.message, { variant: 'success' });
        navigate('/');
    window.location.reload();

        onClose();
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || 'Login failed', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = () => {
    onClose();
    navigate('/customer-regstration');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded shadow-lg w-11/12 max-w-md relative z-10">
        <div className="bg-[#c2185b] text-white p-4 relative">
          <h2 className="text-xl font-semibold">Log In</h2>
          <button onClick={onClose} className="absolute right-4 top-4 text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">How it works</h3>
            <input
              type="text"
              placeholder="User ID"
              className="w-full p-3 mb-4 border border-gray-300 rounded outline-none"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 border border-gray-300 rounded outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="bg-[#2874f0] text-white px-6 py-2 rounded"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <button onClick={handleRegistration} className="bg-gray-200 px-6 py-2 rounded">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferAndEarnModal;
