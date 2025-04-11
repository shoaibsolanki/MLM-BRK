import { useFormContext } from 'react-hook-form';
import FormField from '../ui/FormField';


const ApplicationDetailsStep = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="pb-4 mb-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Application Details</h2>
        <p className="mt-1 text-sm text-gray-500">Provide final application and reference information</p>
      </div>
      
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <FormField
            label="Customer ID"
            id="customer_id"
            placeholder="Enter customer ID"
            error={errors.customer_id?.message?.toString()}
            registration={register('customer_id', { 
              required: "Customer ID is required"
            })}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            label="Date of Application"
            id="date_of_application"
            type="date"
            error={errors.date_of_application?.message?.toString()}
            registration={register('date_of_application', { 
              required: "Date of application is required" 
            })}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            label="Store ID"
            id="store_id"
            placeholder="Enter store ID"
            error={errors.store_id?.message?.toString()}
            registration={register('store_id', { 
              required: "Store ID is required" 
            })}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            label="SAAS ID"
            id="saas_id"
            placeholder="Enter SAAS ID"
            error={errors.saas_id?.message?.toString()}
            registration={register('saas_id', { 
              required: "SAAS ID is required" 
            })}
          />
        </div>
      </div>
      
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Please review all information before submitting your application. Once submitted, your application status will be set to "Pending" and you will not be able to edit it.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="terms" className="text-sm text-gray-600">
              I confirm that all the information provided is accurate and complete. I understand that any false information may result in the rejection of my application.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsStep;
