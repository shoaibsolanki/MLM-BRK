import { useState } from 'react';
import KycForm from './KycForm';
import { useNavigate } from 'react-router-dom';

export function CreateKyc() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">KYC Application Portal</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-2xl mx-auto py-6 px-2 sm:px-6 lg:px-0">
        {submitted ? (
          <div className="bg-white shadow sm:rounded-lg p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Application Submitted</h2>
            <p className="text-gray-600 mb-6">
              Your KYC application has been successfully submitted. We'll review your details and get back to you shortly.
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Profile
            </button>
          </div>
        ) : (
          <KycForm onSubmitSuccess={() => setSubmitted(true)} />
        )}
      </main>
    </div>
  );
}

export default CreateKyc;
