

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useMemo, useState } from "react";

const COLORS = [
  "#7C3AED",
  "#EC4899",
  "#3B82F6",
  "#22C55E",
  "#F97316",
  "#EAB308",
];
export default function Statistike() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(p);


    const o =
      JSON.parse(localStorage.getItem("orders")) ||
      JSON.parse(localStorage.getItem("buyurtmalar")) ||
      [];

    setOrders(o);
  }, []);

  // jami mahsulot
  const totalProducts = products.length;

  // jami buyurtma
  const totalOrders = orders.length;

  // jami daromad
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, order) => {
      return sum + Number(order.total || order.price || 0);
    }, 0);
  }, [orders]);

  // sotilgan mahsulotlar soni
  const totalSold = useMemo(() => {
    return orders.reduce((sum, order) => {
      return sum + Number(order.quantity || 1);
    }, 0);
  }, [orders]);

  // kategoriya statistikasi
  const categoryData = useMemo(() => {
    const obj = {};

    products.forEach((item) => {
      const cat = item.category || "Boshqa";

      obj[cat] = (obj[cat] || 0) + 1;
    });

    return Object.entries(obj).map(([name, value]) => ({
      name,
      value,
    }));
  }, [products]);

  return (
    <div className="p-8 bg-black min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      {/* Cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500">
            Mahsulotlar
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalProducts}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500">
            Buyurtmalar
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalOrders}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500">
            Sotilgan
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalSold}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-500">
            Daromad
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {totalRevenue.toLocaleString()} so'm
          </h2>
        </div>

      </div>

      {/* Pie */}

      <div className="mt-10 bg-white rounded-3xl p-6 shadow">

        <h2 className="text-2xl font-bold mb-6">
          Mahsulot kategoriyalari
        </h2>

        <div className="h-[400px]">

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={150}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}