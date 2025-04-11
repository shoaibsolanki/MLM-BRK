import { useFormContext } from 'react-hook-form';
import FormField from '../ui/FormField';


const AddressStep = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="pb-4 mb-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Address Information</h2>
        <p className="mt-1 text-sm text-gray-500">Provide your current and permanent address details</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium text-gray-700">Communication Address</h3>
          <div className="mt-3">
            <FormField
              label="Complete Address"
              id="communication_address"
              type="textarea"
              placeholder="Enter your full communication address"
              error={errors.communication_address?.message?.toString()}
              registration={register('communication_address', { 
                required: "Communication address is required",
                minLength: { value: 10, message: "Please enter a complete address" }
              })}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-md font-medium text-gray-700">Permanent Address</h3>
          </div>
          <div className="mt-3">
            <FormField
              label="Complete Address"
              id="permanent_address"
              type="textarea"
              placeholder="Enter your full permanent address"
              error={errors.permanent_address?.message?.toString()}
              registration={register('permanent_address', { 
                required: "Permanent address is required",
                minLength: { value: 10, message: "Please enter a complete address" }
              })}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Your permanent address will be used for official correspondence and verification purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddressStep;
