import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthConext'
import NotPermission from './page/NotPermision'

const ProtectedRouteForAdmin = (props) => {
    const { Component , index, page} = props
    const token = localStorage.getItem("token")
    const userData = JSON.parse(localStorage.getItem("user_data")) || {}
    const { userType } = userData
    const { permission, isLoding, role } = useAuth();

     
    const checkPermission = (index, page) => {
       console.log(index , page )
        return (
          userType === "ADMIN" ||
          (( userType == "subadmin" ) &&
          permission[index]?.name === page &&
          permission[index]?.status === true )
        );
      };

      if (isLoding && !userData || permission?.length == 0) {
        return <div>Loading...</div>; // Optional: Add a spinner or loader
      }
    
    //   if (!userData) {
    //     return <Navigate to="/admin/login" />;
    //   }
    //   if (userType != role) {
    //     // localStorage.clear()
    //     return <Navigate to="/admin/login" />;
    //   }
    return (
        <>
            {checkPermission(index , page)? (
                <Component />
            ) : (
                <NotPermission/>
            )}
        </>
    )
}

export default ProtectedRouteForAdmin
