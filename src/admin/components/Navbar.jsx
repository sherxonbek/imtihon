import { LucideShoppingBag, Search, User, ShoppingCart, User2 } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <div className='flex justify-between items-center px-8 py-3 bg-white shadow-sm border-b border-gray-100  mx-auto w-full gap-6'>

            <NavLink to="/" className='flex gap-2 items-center cursor-pointer select-none'>
                <LucideShoppingBag size={34} className='rounded-full p-1.5 text-white bg-[#7C3AED]' />
                <h1 className='font-extrabold text-2xl text-[#7C3AED] font-Nunito tracking-tight'>Admin Panel</h1>
            </NavLink>

            <NavLink
                to="/"
                className={({ isActive }) => `flex flex-col items-center gap-0.5 text-xs font-medium ${isActive ? 'text-[#7C3AED]' : 'text-gray-500 hover:text-[#7C3AED]'}`}
            >
                <User2 size={22} />
                <span>Userman</span>
            </NavLink>


        </div>
    )
}

export default Navbar
