import React, { useState } from 'react'
import AdminLayout from '../admilayout/AdminLayout'
import Home from '../page/Home'

const Adminhome = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <AdminLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        {children}
    </AdminLayout>
  )
}

export default Adminhome