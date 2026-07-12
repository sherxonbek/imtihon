import React from 'react'
import { NavLink } from 'react-router-dom'

function Buttons() {
    return (
        <div>
            <div className='flex w-full justify-around text-center'>
                <NavLink to="/admin/product-management"
                    end
                    className={({ isActive }) => `w-1/3 border p-5 rounded-2xl shadow-uzum font-bold text-xl ${isActive ? 'bg-green-400' : ' hover:text-[#7C3AED] hover:bg-gray-200'
                        }`}
                >
                    <h1 className='font-bold'>Maxsulotlar</h1>
                </NavLink>
                <NavLink to="/admin/product-management/banner-manage"
                    end
                    className={({ isActive }) => `w-1/3 border p-5 rounded-2xl shadow-uzum font-bold text-xl ${isActive ? 'bg-green-400' : ' hover:text-[#7C3AED] hover:bg-gray-200'
                        }`}
                >
                    <h1 className='font-bold'>Bannerlar</h1>
                </NavLink>
            </div>
        </div>
    )
}

export default Buttons