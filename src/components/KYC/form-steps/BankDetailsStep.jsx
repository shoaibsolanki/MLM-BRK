import { useFormContext } from 'react-hook-form';
import FormField from '../ui/FormField';


const BankDetailsStep = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="pb-4 mb-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Bank Information</h2>
        <p className="mt-1 text-sm text-gray-500">Provide your bank account details for financial transactions</p>
      </div>
      
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <FormField
            label="Account Holder Name"
            id="account_holder_name"
            placeholder="Enter account holder's full name"
            error={errors.account_holder_name?.message?.toString()}
            registration={register('account_holder_name', { 
              required: "Account holder name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" }
            })}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            label="Bank Name"
            id="bank_name"
            placeholder="Enter bank name"
            error={errors.bank_name?.message?.toString()}
            registration={register('bank_name', { 
              required: "Bank name is required" 
            })}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            label="Account Number"
            id="account_number"
            placeholder="Enter your account number"
            error={errors.account_number?.message?.toString()}
            registration={register('account_number', { 
              required: "Account number is required",
              pattern: {
                value: /^[0-9]{9,18}$/,
                message: "Please enter a valid account number"
              }
            })}
          />
        </div>

        <div className="sm:col-span-3">
          <FormField
            label="IFSC Code"
            id="ifsc_code"
            placeholder="Enter bank IFSC code"
            error={errors.ifsc_code?.message?.toString()}
            registration={register('ifsc_code', { 
              required: "IFSC code is required",
              pattern: {
                value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                message: "Please enter a valid IFSC code (e.g., HDFC0001234)"
              }
            })}
          />
        </div>
      </div>
      
      <div className="rounded-md bg-blue-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-blue-700">
              Please ensure that the bank account details provided are accurate as they will be used for all financial transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetailsStep;
