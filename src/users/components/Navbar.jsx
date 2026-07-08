import { LucideShoppingBag, Search, User, ShoppingCart, ShieldCheck } from 'lucide-react'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../../context/CartContext';

function Navbar() {

  const { cartItems } = useContext(CartContext);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className='flex justify-between items-center px-8 py-3 bg-white shadow-sm border-b border-gray-100  mx-auto w-full gap-6'>

      <NavLink to="/" className='flex gap-2 items-center cursor-pointer select-none'>
        <LucideShoppingBag size={34} className='rounded-full p-1.5 text-white bg-[#7C3AED]' />
        <h1 className='font-extrabold text-2xl text-[#7C3AED] font-Nunito tracking-tight'>UzumShop</h1>
      </NavLink>

      <div className='flex flex-grow max-w-xl border-gray-300 border p-2 rounded-xl gap-2 items-center bg-gray-50 focus-within:border-[#7C3AED] focus-within:bg-white transition-all duration-200'>
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Mahsulot qidirish..."
          className='focus:outline-none bg-transparent w-full text-sm text-gray-700'
        />
      </div>

      <div className='flex items-center gap-6'>

        <NavLink to="/cart" className={({ isActive }) => `flex flex-col items-center gap-0.5 text-xs font-medium ${isActive ? 'text-[#7C3AED]' : 'text-gray-500 hover:text-[#7C3AED]'}`}>
          <div className="relative">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </div>
          <span>Savat</span>
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) => `flex flex-col items-center gap-0.5 text-xs font-medium ${isActive ? 'text-[#7C3AED]' : 'text-gray-500 hover:text-[#7C3AED]'}`}
        >
          <ShieldCheck size={22} />
          <span>Adminman</span>
        </NavLink>

      </div>

    </div>
  )
}

export default Navbar
