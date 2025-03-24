import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRouteForAdmin = (props) => {
    const token = localStorage.getItem("token")
    const userData = JSON.parse(localStorage.getItem("user_data"))
    const { Component } = props

    return (
        <>
            {token && userData?.userType === 'ADMIN' ? (
                <Component />
            ) : (
                <Navigate to="/admin/login" />
            )}
        </>
    )
}

export default ProtectedRouteForAdmin
