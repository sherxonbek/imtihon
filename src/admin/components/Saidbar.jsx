import { LayoutDashboard, BarChart3, PlusCircle, ImagePlus } from 'lucide-react'

import React from 'react'
import { FaLayerGroup } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'

function Saidbar() {

    const baseStyle = 'flex items-center gap-2.5 text-[16px] font-bold w-[210px] py-2 px-3 rounded-lg transition-all duration-200';

    return (
        <div className='bg-gray-200 w-[250px] h-screen pl-3.5 flex flex-col gap-2'>
            <h1 className='text-[#6B7280] font-bold text-[18px] pl-2 pt-2'>Navigatsiya</h1>
            <NavLink to="/admin"
                end
                className={({ isActive }) => `${baseStyle} ${isActive ? 'bg-[#c4baf3] text-[#7C3AED]' : 'text-gray-500 hover:text-[#7C3AED] hover:bg-gray-200'
                    }`}
            >
                <LayoutDashboard size={18} />
                <h1 className='font-bold'>Dashboard</h1>
            </NavLink>

            <NavLink to="/admin/statistika"
                className={({ isActive }) => `${baseStyle} ${isActive ? 'bg-[#c4baf3] text-[#7C3AED]' : 'text-gray-500 hover:text-[#7C3AED] hover:bg-gray-200'
                    }`}
            >
                <BarChart3 size={18} />
                <h1 className='font-bold'>Statistika</h1>
            </NavLink>

            <NavLink to="/admin/addprodact"
                className={({ isActive }) => `${baseStyle} ${isActive ? 'bg-[#c4baf3] text-[#7C3AED]' : 'text-gray-500 hover:text-[#7C3AED] hover:bg-gray-200'
                    }`}
            >
                <PlusCircle size={18} />
                <h1 className='font-bold'>Mahsulot qo'shish</h1>
            </NavLink>
            <NavLink to="/admin/addbanners"
                className={({ isActive }) => `${baseStyle} ${isActive ? 'bg-[#c4baf3] text-[#7C3AED]' : 'text-gray-500 hover:text-[#7C3AED] hover:bg-gray-200'
                    }`}
            >
                <ImagePlus size={18} />
                <h1 className='font-bold'>Bannerlar</h1>
            </NavLink>
            <NavLink to="/admin/product-management"
                className={({ isActive }) => `${baseStyle} ${isActive ? 'bg-[#c4baf3] text-[#7C3AED]' : 'text-gray-500 hover:text-[#7C3AED] hover:bg-gray-200'
                    }`}
            >
                <FaLayerGroup size={18} />
                <h1 className='font-bold'>Mahsulotlar ro'yxati</h1>
            </NavLink>
        </div>
    )
}

export default Saidbar