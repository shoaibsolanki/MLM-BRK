import { useFormContext } from 'react-hook-form';
import FormField from '../ui/FormField';

const PersonalInfoStep = ({handleFileChange}) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="pb-4 mb-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
        <p className="mt-1 text-sm text-gray-500">Provide your basic personal details for identification</p>
      </div>
      
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        {/* <div className="sm:col-span-3">
          <FormField
            label="Applicant Name"
            id="applicant_name"
            className="p-2"
            placeholder="Enter your full name"
            error={errors.applicant_name?.message?.toString()}
            registration={register('applicant_name', { 
              required: "Applicant name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" }
            })}
          />
        </div> */}

        {/* <div className="sm:col-span-3">
          <FormField
            label="Father's Name"
            id="father_name"
            placeholder="Enter father's full name"
            error={errors.father_name?.message?.toString()}
            registration={register('father_name', { 
              required: "Father's name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" }
            })}
          />
        </div> */}

        {/* <div className="sm:col-span-3">
          <FormField
            label="Email Address"
            id="email"
            type="email"
            placeholder="your.email@example.com"
            error={errors.email?.message?.toString()}
            registration={register('email', { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            label="User Name"
            id="user_name"
            placeholder="Choose a username"
            error={errors.user_name?.message?.toString()}
            registration={register('user_name', { 
              required: "Username is required",
              minLength: { value: 4, message: "Username must be at least 4 characters" }
            })}
          />
        </div> */}

        {/* <div className="sm:col-span-3">
          <FormField
            label="Mobile Number"
            id="mobile_number"
            type="tel"
            placeholder="Enter 10-digit mobile number"
            error={errors.mobile_number?.message?.toString()}
            registration={register('mobile_number', { 
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit mobile number"
              }
            })}
          />
        </div> */}

        <div className="sm:col-span-3">
          <FormField
            label="Aadhaar Number"
            id="addhaar_number"
            placeholder="12-digit Aadhaar number"
            error={errors.addhaar_number?.message?.toString()}
            registration={register('addhaar_number', { 
              required: "Aadhaar number is required",
              pattern: {
                value: /^[0-9]{12}$/,
                message: "Please enter a valid 12-digit Aadhaar number"
              }
            })}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            label="PAN Number"
            id="pan_no"
            placeholder="Enter PAN number"
            error={errors.pan_no?.message?.toString()}
            registration={register('pan_no', { 
              required: "PAN number is required",
              pattern: {
                value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                message: "Please enter a valid PAN number (e.g., ABCDE1234F)"
              }
            })}
          />
        </div>

        {/* <div className="sm:col-span-3">
          <FormField
            label="Date of Birth"
            id="date_of_birth"
            type="date"
            error={errors.date_of_birth?.message?.toString()}
            registration={register('date_of_birth', { 
              required: "Date of birth is required" 
            })}
          />
        </div> */}

        {/* <div className="sm:col-span-3">
          <FormField
            label="Nationality"
            id="nationality"
            placeholder="Enter your nationality"
            error={errors.nationality?.message?.toString()}
            registration={register('nationality', { 
              required: "Nationality is required" 
            })}
          />
        </div> */}


      </div>
      <div className="sm:col-span-3">
{['aadharFront', 'aadharBackImg', 'pan'].map((field) => (
        <div className='mt-2' key={field}>
          <label className="block text-sm font-medium text-gray-700 capitalize">
            {field.replace(/([A-Z])/g, ' $1')}
          </label>
          <input
            type="file"
            name={field}
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      ))}
        </div>
    </div>
  );
};

export default PersonalInfoStep;
