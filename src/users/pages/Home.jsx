import React, { useContext, useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import Filter from '../components/Filter'
import { productAPI } from '../../services/api';
import { ShoppingBag } from 'lucide-react';
import { CartContext } from '../../context/CartContext';

function Home() {

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [Categorya, setCategorya] = useState('Hamma');
  const [narxBoyicha, setNarxBoyicha] = useState('');

  const { addCart } = useContext(CartContext);

  useEffect(() => {
    productAPI.getAll()
      .then(data => {
        setProducts(data);
        setFilterProducts(data);
        setLoading(false);
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  useEffect(() => {
    let result = [...products];
    if (Categorya !== 'Hamma') {
      result = result.filter(item => item.category === Categorya);
    }
    if (narxBoyicha === 'arzon') {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (narxBoyicha === 'qimmat') {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }
    setFilterProducts(result);
  }, [Categorya, narxBoyicha, products]);


  const Random = () => {
    const saralangan = [...filterProducts].sort(() => Math.random() - 0.5);
    setFilterProducts(saralangan);
  };

  if (loading) return <div className="text-center py-20">Yuklanmoqda...</div>;


  return (
    <div>

      <Carousel />

      <Filter
        Categorya={Categorya}
        setCategorya={setCategorya}
        narxBoyicha={narxBoyicha}
        setNarxBoyicha={setNarxBoyicha}
        Random={Random}
      />


      <div className="px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filterProducts.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
              <div className="w-full h-[220px] bg-gray-50 flex items-center justify-center">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-medium text-gray-800 line-clamp-2">{item.title}</h3>
                  <p className="text-sm font-bold mt-2">{Number(item.price).toLocaleString()} so'm</p>
                </div>
                <button
                  onClick={() => {
                    addCart(item);
                  }}
                  className='flex p-2 rounded-2xl font-bold gap-2 bg-blue-400 text-white shadow-uzum transition-all duration-200 hover:bg-blue-500'><ShoppingBag /> Savat </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home