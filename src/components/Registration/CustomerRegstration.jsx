import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import DataService from "../../services/requestApi";
import { useAuth } from '../../contexts/AuthConext';

const CustomerRegstration = () => {
  // Form state
    const { saasid, storeid } = useAuth();
  
  const [formData, setFormData] = useState({
    sponsorId: '',
    sponsorName: '',
    mobile_number: "",
    email: "",
    name: "",
    password: "",
    confirmPassword:"",
    address_1: "",
    address_2: "",
    address_3: "",
    dob: "",
    gender: "",
    saas_id: saasid,
    store_id: storeid,
    city: "",
    state: "",
    country: "",
    direction: "org2",
    referId: "",
  });

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // Fixed captcha value (in a real app, this would be dynamically generated)
  const captchaValue = '360964';

  // Handle input change
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Call API when Sponsor ID is entered
    if (name === "referId" && value.length == 3) {
      try {
        const response = await DataService.getReferName(value);
        if (response.data) {
          setFormData((prev) => ({
            ...prev,
            sponsorName: response.data.data, // Assuming API returns { name: "John Doe" }
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            sponsorName: "", // Clear if invalid ID
          }));
        }
      } catch (error) {
        console.error("Error fetching sponsor name:", error);
        setFormData((prev) => ({
          ...prev,
          sponsorName: "",
        }));
      }
    }
  };
  // Handle form submission
   // Handle form submission
   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await DataService.createCustomer(formData);
      if (response.data) {
        setMessage("Customer created successfully!");
      }
    } catch (error) {
      console.error("Error creating customer:", error);
      setMessage("Failed to create customer.");
    } finally {
      setLoading(false);
    }
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
                name="referId"
                placeholder="Enter SSS Sponsor ID"
                value={formData.referId}
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
              name="direction"
                value={formData.direction}
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
              name="name"
              placeholder="Enter Full Name"
              value={formData.name}
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
              name="dob"
              placeholder="dd-mm-yyyy"
              value={formData.dob}
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
              name="mobile_number"
              placeholder="Enter Mobile Number"
              value={formData.mobile_number}
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
