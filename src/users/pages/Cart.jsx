import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext'; // Context-ni ulaymiz
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFroma, update, clearCart } = useContext(CartContext);

  const totalCurrentPrice = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);


  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 font-Nunito text-center">
        <div className="p-6 bg-purple-50 rounded-full text-[#7C3AED] mb-4">
          <ShoppingBag size={50} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Savatchangiz hozircha bo'sh</h2>
        <p className="text-sm text-gray-500 max-w-sm mb-6">Bosh sahifadan to'ldirasan ko'* (davomi yaq).</p>
        <Link to="/" className="bg-[#7C3AED] text-white font-bold py-2.5 px-6 rounded-xl shadow-md hover:bg-purple-700 transition-all active:scale-95">
          Xarid qilishni boshlash
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 font-Nunito text-gray-800">
      <h1 className="text-2xl font-extrabold mb-6">Savatchangda ({cartItems.length} turdagi mahsulot bor)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-uzum border border-gray-100 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 max-w-md">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">Turkum: {item.category || "Do'kon"}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">
                
                <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 px-2 py-1 gap-3">
                  <button 
                    onClick={() => update(item.id, -1)}
                    className="p-1 text-gray-500 hover:text-red-500 cursor-pointer transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold text-gray-800 min-w-[16px] text-center">{item.quantity}</span>
                  <button 
                    onClick={() => update(item.id, 1)}
                    className="p-1 text-gray-500 hover:text-green-500 cursor-pointer transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="text-right min-w-[100px]">
                  <p className="text-base font-extrabold text-gray-950">{(Number(item.price) * item.quantity).toLocaleString()} so'm</p>
                </div>

                <button 
                  onClick={() => removeFroma(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>
          ))}
        </div>


        <div className="bg-white rounded-2xl p-5 shadow-uzum border border-gray-100 flex flex-col gap-4">
          <h2 className="text-lg font-bold border-b border-gray-100 pb-2">Buyurtma berish</h2>
          
          <div className="flex flex-col gap-2.5 text-sm font-medium text-gray-600 border-b border-gray-100 pb-4">
            <div className="flex justify-between">
              <span>Mahsulotlar soni:</span>
              <span className="text-gray-900 font-bold">{cartItems.reduce((sum, i) => sum + i.quantity, 0)} ta</span>
            </div>
            
            <div className="flex justify-between text-green-600 font-semibold">
              <span>(Chegirma):</span>
              <span>Sizga chegirma yo`q jonidan</span>
            </div>
          </div>

          <div className="flex justify-between items-end my-1">
            <span className="text-base font-bold text-gray-800">Jami to'lov:</span>
            <div className="text-right">
              <span className="text-xl font-extrabold text-[#7C3AED]">{totalCurrentPrice.toLocaleString()} so'm</span>
            </div>
          </div>

          <button 
            className="w-full bg-[#7C3AED] text-white font-bold py-3 rounded-xl shadow-md hover:bg-purple-700 active:scale-[0.98] transition-all cursor-pointer text-center text-sm"
          >
            Xaridni rasmiylashtirish
          </button>
        </div>

      </div>
    </div>
  );
}

export default Cart;
