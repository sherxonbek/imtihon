import React from 'react'
import Navbar from './Navbar'
import Saidbar from './Saidbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='bg-gray-900 text-white'>
      <Navbar />
      <div className='flex min-h-screen'>
        <Saidbar />
        <div className='flex-grow p-6'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}