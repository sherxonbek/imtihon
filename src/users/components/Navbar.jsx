import {
  LucideShoppingBag,
  Search,
  User,
  ShoppingCart,
  ShieldCheck,
  User2,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { users } from "../../services/api";
import { BiLogIn } from "react-icons/bi";
import { PackageCheck } from "lucide-react";

function Navbar() {
  const [user, setUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    const localUser = localStorage.getItem("username");

    if (localUser) {
      setUser(localUser);
    }
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  function handleLogout() {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    setUser(""); // stateni bo'shatsangiz, ekran o'sha zahoti o'zgarib, yana "Kirish" tugmasi paydo bo'ladi
    navigate("/signin");
  }

  return (
    <div className="flex justify-between items-center px-8 py-3 bg-white shadow-sm border-b border-gray-100  mx-auto w-full gap-6">
      <NavLink
        to="/"
        className="flex gap-2 items-center cursor-pointer select-none"
      >
        <LucideShoppingBag
          size={34}
          className="rounded-full p-1.5 text-white bg-[#7C3AED]"
        />
        <h1 className="font-extrabold text-2xl text-[#7C3AED] font-Nunito tracking-tight">
          UzumShop
        </h1>
      </NavLink>

      <div className="flex flex-grow max-w-xl border-gray-300 border p-2 rounded-xl gap-2 items-center bg-gray-50 focus-within:border-[#7C3AED] focus-within:bg-white transition-all duration-200">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Mahsulot qidirish..."
          className="focus:outline-none bg-transparent w-full text-sm text-gray-700"
        />
      </div>

      <div className="flex items-center gap-6">
        <NavLink to="/packagecheck">
          <PackageCheck />
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-xs font-medium ${isActive ? "text-[#7C3AED]" : "text-gray-500 hover:text-[#7C3AED]"}`
          }
        >
          <div className="relative">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </div>
        </NavLink>

        <div>
          {user ? (
            <div className="flex flex-col items-center gap-2 relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="font-bold text-white text-xl px-2 rounded-full bg-blue-500 shadow-uzum "
              >
                {isOpen ? (
                  <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 flex flex-col gap-0.5">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-xs text-gray-400 font-medium">
                        Tizimga kirildi:
                      </p>
                      <p className="text-sm font-bold text-gray-800 truncate">
                        {user}
                      </p>
                    </div>

                    <button className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-purple-50 hover:text-[#7C3AED] transition-colors flex items-center gap-2 cursor-pointer">
                      <User2 size={16} />
                      Mening profilim
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50 mt-1 flex items-center gap-2 cursor-pointer"
                    >
                      <BiLogIn size={16} className="rotate-180" />
                      Tizimdan chiqish
                    </button>
                  </div>
                ) : (
                  <div>{user[0].toUpperCase()}</div>
                )}
              </div>
            </div>
          ) : (
            <Link
              to="/signin"
              className="flex flex-col items-center gap-1.5 text-gray-600 hover:text-[#7C3AED]"
            >
              <User2 size={20} />
              <span className="text-sm font-medium">Kirish</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
