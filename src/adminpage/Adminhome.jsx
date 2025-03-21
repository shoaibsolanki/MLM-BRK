import React, { useState } from 'react'
import AdminLayout from '../admilayout/AdminLayout'

const Adminhome = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <AdminLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        {children}
    </AdminLayout>
  )
}

export default Adminhome