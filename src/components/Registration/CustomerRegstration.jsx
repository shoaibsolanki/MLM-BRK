import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const CustomerRegstration = () => {
  // Form state
  const [formData, setFormData] = useState({
    sponsorId: '',
    sponsorName: '',
    organization: '',
    fullName: '',
    gender: '',
    dateOfBirth: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    captchaInput: '',
    isOver18: false,
    acceptTerms: false
  });

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);

  // Fixed captcha value (in a real app, this would be dynamically generated)
  const captchaValue = '360964';

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setFormData({
      ...formData,
      [name]: isCheckbox ? e.target.checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would add validation here before submission
    console.log('Form submitted:', formData);
    // Proceed with registration logic
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h1 className="text-2xl font-bold text-center mb-8">Register</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SSS Sponsor ID */}
          <div>
            <label htmlFor="sponsorId" className="block text-sm font-medium text-gray-700 mb-1">
              SSS Sponsor ID
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                SSS
              </span>
              <input
                type="text"
                id="sponsorId"
                name="sponsorId"
                placeholder="Enter SSS Sponsor ID"
                value={formData.sponsorId}
                onChange={handleChange}
                className="pl-12 w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Sponsor Name */}
          <div>
            <label htmlFor="sponsorName" className="block text-sm font-medium text-gray-700 mb-1">
              Sponsor Name
            </label>
            <input
              type="text"
              id="sponsorName"
              name="sponsorName"
              placeholder="Sponsor Name"
              value={formData.sponsorName}
              onChange={handleChange}
              className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
              readOnly
            />
          </div>

          {/* Organization */}
          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
              Organization
            </label>
            <select
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Organization</option>
              <option value="org1">Organization 1</option>
              <option value="org2">Organization 2</option>
              <option value="org3">Organization 3</option>
            </select>
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              placeholder="dd-mm-yyyy"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              placeholder="Enter Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email address */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email-ID"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Enter Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Enter Captcha */}
          <div>
            <label htmlFor="captchaInput" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Captcha
            </label>
            <input
              type="text"
              id="captchaInput"
              name="captchaInput"
              placeholder="Enter Captcha"
              value={formData.captchaInput}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Captcha Display */}
          <div>
            <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 mb-1">
              Captcha
            </label>
            <div className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-md text-center font-bold">
              {captchaValue}
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="isOver18"
              name="isOver18"
              checked={formData.isOver18}
              onChange={handleChange}
              className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isOver18" className="ml-2 block text-sm text-gray-700">
              Yes I am 18 Years & above
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
              I have read and understand the <a href="#" className="text-blue-600 hover:underline">terms & conditions</a>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-24 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerRegstration;
