import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import PersonalInfoStep from './form-steps/PersonalInfoStep';
import AddressStep from './form-steps/AddressStep';
import BankDetailsStep from './form-steps/BankDetailsStep';
import { notistack } from "notistack"; // Import Notistack

import DataService from "../../services/requestApi";

const KycForm = ({ onSubmitSuccess }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const { authData } = useAuth();
  const { id, saasId, storeId ,mobileNumber,name,dob,email} = authData;

  const methods = useForm({
    defaultValues: {
      customer_id: id,
      applicant_name: name,
      father_name: '',
      mobile_number: mobileNumber,
      status: 'Pending',
      addhaar_number: '',
      communication_address: '',
      permanent_address: '',
      account_holder_name: '',
      bank_name: '',
      account_number: '',
      ifsc_code: '',
      pan_no: '',
      date_of_birth: dob,
      nationality: 'Indian',
      email: email,
      user_name: name,
      date_of_application: new Date().toISOString().split('T')[0],
      store_id: storeId,
      saas_id: saasId
    }
  });

  const steps = [
    { name: 'Personal Information', icon: <Check className="h-5 w-5" /> },
    { name: 'Address Details', icon: <Check className="h-5 w-5" /> },
    { name: 'Bank Information', icon: <Check className="h-5 w-5" /> },
    // { name: 'Application Details', icon: <Check className="h-5 w-5" /> }
  ];

  const goToNextStep = async () => {
    const fieldsToValidate = getCurrentStepFields();
    const isValid = await methods.trigger(fieldsToValidate);
    
    if (isValid) {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const getCurrentStepFields = () => {
    switch (currentStep) {
      case 0:
        return ['applicant_name', 'father_name', 'mobile_number', 'addhaar_number', 'pan_no', 'date_of_birth', 'nationality', 'email', 'user_name'];
      case 1:
        return ['communication_address', 'permanent_address'];
      case 2:
        return ['account_holder_name', 'bank_name', 'account_number', 'ifsc_code'];
    //   case 3:
    //     return ['customer_id', 'store_id', 'saas_id', 'date_of_application'];
      default:
        return [];
    }
  };

  // document upload state
  const [files, setFiles] = useState({
    bank: null,
    aadharFront: null,
    aadharBackImg: null,
    pan: null,
    gst: null,
  });

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    try {
      const res = await DataService.kycDocumentUpload(saasId, storeId, id, formData);
      console.log('Upload success:', res.data);
      // optionally show success UI
    } catch (error) {
      console.error('Upload error:', error);
      // optionally show error UI
    }
  };


const onSubmit = async (data) => {
    try {
        console.log('Form submitted:', data);

        const response = await DataService.CreateKYC(data);

        if (response?.status === 200) {
            onSubmitSuccess();
            handleUpload()
            notistack.enqueueSnackbar('KYC submitted successfully!', { variant: 'success' });
        } else {
            throw new Error('Failed to submit KYC');
        }
    } catch (error) {
        console.error('Error submitting KYC:', error);
        notistack.enqueueSnackbar('An error occurred while submitting the KYC. Please try again.', { variant: 'error' });
    }
};

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep handleFileChange={handleFileChange} />;
      case 1:
        return <AddressStep />;
      case 2:
        return <BankDetailsStep handleFileChange={handleFileChange}/>;
    //   case 3:
        // return <ApplicationDetailsStep />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">KYC Application Form</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Please fill in all required information</p>
      </div>
      
      <div className="border-t border-gray-200">
        {/* Progress bar */}
        <div className="px-4 py-5 sm:p-6">
          <nav aria-label="Progress">
            <ol className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
              {steps.map((step, stepIdx) => (
                <li key={step.name} className="relative md:flex-1 md:flex">
                  <div 
                    className={`group flex items-center w-full ${
                      stepIdx <= currentStep ? 'text-indigo-600' : 'text-gray-500'
                    }`}
                  >
                    <span className="px-6 py-4 flex items-center text-sm font-medium">
                      <span 
                        className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full ${
                          stepIdx < currentStep ? 'bg-indigo-600 text-white' : 
                          stepIdx === currentStep ? 'border-2 border-indigo-600' : 'border-2 border-gray-300'
                        }`}
                      >
                        {stepIdx < currentStep ? (
                          step.icon
                        ) : (
                          <span>{stepIdx + 1}</span>
                        )}
                      </span>
                      <span className="ml-2 text-sm font-medium hidden sm:inline-block">
                        {step.name}
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        
        {/* Form steps */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="px-4 py-5 sm:p-6">
              {renderStep()}
            </div>
            
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between">
              <button
                type="button"
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </button>
              
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default KycForm;
