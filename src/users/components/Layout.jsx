import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <Navbar />
      <div className=''>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout