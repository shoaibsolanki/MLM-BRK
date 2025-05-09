import React from "react";

const NotPermission = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="text-center p-10 bg-white shadow-2xl rounded-2xl max-w-md">
                <h1 className="text-5xl font-extrabold text-red-600 mb-6">
                    Access Denied
                </h1>
                <p className="text-gray-700 text-lg mb-8">
                    Oops! You don't have the necessary permissions to view this page.
                </p>
                <div className="flex justify-center"></div>
                    <a
                        href="/admin"
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105"
                    >
                        Go to Homepage
                    </a>
                </div>
            </div>
    );
};

export default NotPermission;