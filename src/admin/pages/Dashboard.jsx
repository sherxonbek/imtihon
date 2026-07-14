import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { IoLogoUsd } from "react-icons/io";

import { carts, users } from '../../services/api';



function bugunVaqt() {
  const date = new Date();
  const kun = String(date.getDate()).padStart(2, '0');
  const oy = String(date.getMonth() + 1).padStart(2, '0');
  const yil = date.getFullYear();

  return (`${kun} - ${oy} - ${yil}`)
}



function Dashboard() {
  const [allUser, setAllUser] = useState([]);
  const [allCart, setAllCarts] = useState([]);



  const [loading, setLoading] = useState(false);


  async function orders() {
    setLoading(true);

    try {
      const allUsers = await users.getAll();
      const allCarts = await carts.getAll();


      setAllUser(allUsers);
      setAllCarts(allCarts)

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  console.log(allCart);
  

  useEffect(() => {
    orders();
  }, []);


  const newCarts = allCart.toReversed().slice(0, 5);
  const totalPrice = allCart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);


  return (
    <div className="p-6 bg-gray-50 min-h-screen font-Nunito text-gray-800">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Boshqaruv Paneli (Dashboard)</h1>
          <p className="text-sm text-gray-500 mt-1">Do'konning bugungi holat va statistika</p>
        </div>
        <div className="text-sm font-semibold bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-gray-600">
          Bugun: <span className="text-purple-700">{bugunVaqt()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="flex bg-white p-6 rounded-2xl shadow-uzum border border-gray-100 items-center">
          <IoLogoUsd className="text-6xl text-green-500" />
          <div className="ml-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Jami Savdo</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              {loading ? ("Xisoblanmoqda...") : `${totalPrice.toLocaleString()} so'm`}
            </h3>
            <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-md mt-2 inline-block">+12% bu oy</span>
          </div>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-uzum border border-gray-100 flex items-center ">
          <GoPackage className="text-6xl text-blue-600" />
          <div className="ml-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Buyurtmalar</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              {loading ? "Xisoblanmoqda..." : allCart.length}
            </h3>
            <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md mt-2 inline-block">Faol buyurtmalar</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-uzum border border-gray-100 flex items-center">
          <FaUsers className="text-6xl text-purple-600" />
          <div className="ml-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mijozlar</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              {loading ? "Xisoblanmoqda..." : allUser.length}
            </h3>
            <span className="text-xs text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-md mt-2 inline-block">Ro'yxatdan o'tganlar</span>
          </div>
        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-extrabold text-gray-900">Yaqindagi Buyurtmalar</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Xaridor ID</th>
                <th className="pb-3">Mahsulot ID</th>
                <th className="pb-3">Soni</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-gray-700">

              {newCarts.map((item) => {
                return (
                  <tr className="border-b border-gray-300 hover:bg-gray-200 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-gray-900">{allUser.find(u => u.id === item.userId)?.user || "Mijoz topilmadi"}</td>
                    <td className="py-3.5">{item.prodact ? item.prodact : "Maxsulot yuklanmoqda ..."}</td>
                    <td className="py-3.5">{item.quantity ? item.quantity : "Yuklanmoqda..."}</td>

                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>
      </div>

    </div>

  );
}

export default Dashboard;
