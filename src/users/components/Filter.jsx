import React from 'react';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

function Filter({ Categorya, setCategorya, narxBoyicha, setNarxBoyicha, Random }) {

  const turkumlar = [
    { id: 'Hamma', name: 'Hamma' },
    { id: 'electronics', name: 'Elektronika' },
    { id: 'clothes', name: 'Kiyimlar' },
    { id: 'appliances', name: 'Maishiy texnika' }
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 font-Nunito">

      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        {turkumlar.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategorya(cat.id)}
            className={`py-1.5 px-4 rounded-xl text-sm font-bold transition-all whitespace-nowrap active:scale-95 cursor-pointer ${Categorya === cat.id
                ? 'bg-[#7C3AED] text-white shadow-md shadow-purple-100'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={Random}
          className="flex items-center gap-1.5 py-2 px-4 border border-purple-200 rounded-xl text-sm font-bold text-[#7C3AED] bg-purple-50/50 hover:bg-purple-50 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles size={16} fill="currentColor" />
          <span>Mashhurlar</span>
        </button>

        <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-1.5 bg-gray-50 focus-within:bg-white focus-within:border-[#7C3AED] transition-all">
          <SlidersHorizontal size={16} className="text-gray-400" />
          <select
            value={narxBoyicha}
            onChange={(e) => setNarxBoyicha(e.target.value)}
            className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none cursor-pointer"
          >
            <option value="">Saralash...</option>
            <option value="arzon">Arzonidan qimmatiga</option>
            <option value="qimmat">Qimmatidan arzoniga</option>
          </select>
        </div>

      </div>
    </div>
  );
}

export default Filter;
