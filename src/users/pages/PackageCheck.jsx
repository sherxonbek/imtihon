import React, { useEffect, useState } from "react";
import { carts } from "../../services/api";
import { Package, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

function PackageCheck() {
  const [buyurtmalar, setBuyurtmalar] = useState([]);
const [yuklanmoqda, setYuklanmoqda] = useState(true);

const foydalanuvchiId = localStorage.getItem("userId");

useEffect(() => {
  getBuyurtmalar();
}, []);

const getBuyurtmalar = async () => {
  try {
    const data = await carts.getAll();

    const result = data.filter(item => item.userId == foydalanuvchiId);

    setBuyurtmalar(result);
    setYuklanmoqda(false);
  } catch (err) {
    console.log(err);
    setYuklanmoqda(false);
  }
};

  if (yuklanmoqda) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-xl font-bold text-gray-600">
          Buyurtmalar yuklanmoqda...
        </h1>
      </div>
    );
  }

  if (buyurtmalar.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 font-Nunito text-center">
        <div className="p-6 bg-purple-50 rounded-full text-[#7C3AED] mb-5">
          <ShoppingBag size={55} />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Siz hali buyurtma bermagansiz
        </h2>

        <p className="text-gray-500 mb-6">
          Xarid qilgan mahsulotlaringiz shu yerda ko'rinadi.
        </p>

        <Link
          to="/"
          className="bg-[#7C3AED] text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition"
        >
          Xarid qilish
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 font-Nunito">
      <div className="flex items-center gap-3 mb-8">
        <Package size={35} className="text-[#7C3AED]" />

        <div>
          <h1 className="text-3xl font-black">
            Mening Buyurtmalarim
          </h1>

          <p className="text-gray-500">
            Jami buyurtmalar: {buyurtmalar.length} ta
          </p>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-uzum border">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Mahsulot</th>
              <th className="p-4 text-left">Narxi</th>
              <th className="p-4 text-left">Soni</th>
              <th className="p-4 text-left">Jami</th>
              <th className="p-4 text-left">Holati</th>
            </tr>
          </thead>

          <tbody>
            {buyurtmalar.map((buyurtma, raqam) => (
              <tr
                key={buyurtma.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-bold">{raqam + 1}</td>

                <td className="p-4">{buyurtma.prodact}</td>

                <td className="p-4">
                  {Number(buyurtma.price).toLocaleString()} so'm
                </td>

                <td className="p-4">
                  {buyurtma.quantity} ta
                </td>

                <td className="p-4 font-bold text-[#7C3AED]">
                  {(
                    Number(buyurtma.price) *
                    buyurtma.quantity
                  ).toLocaleString()} so'm
                </td>

                <td className="p-4">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {buyurtma.status || "Jarayonda"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PackageCheck;