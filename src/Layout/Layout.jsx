import React from 'react'
import Navbar from '../Component/Navbar'
import RegistrationForm from '../Component/RegistrationForm'

function Layout() {
  return (
    <div>
             <div className="flex relative flex-col items-center max-w-[100%] min-h-[100vh]">
          <Navbar />
          <div className="shrink-0 mt-6 max-w-full h-px border border-white border-solid w-[1131px]" />
          <RegistrationForm />
        </div>
    </div>
  )
}

export default Layout
