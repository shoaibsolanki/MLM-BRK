import React from 'react';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="text-center p-10 bg-white rounded-lg shadow-lg">
                <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4">404</h1>
                <p className="text-2xl text-gray-700 mb-8">Oops! Page Not Found</p>
                <a href="/" className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full hover:from-green-500 hover:to-blue-600 transition duration-300">
                    Go Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;