import React, { useState } from 'react'

//prodact qo'shish un importlar
import { productAPI } from '../../services/api';

function Addprodact() {

    //statelar
    const [imgUrl, setImgUrl] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [desc, setDesc] = useState('');

    //loading state
    const [loading, setLoading] = useState(false);


    const handleSave = async (e) => {
        e.preventDefault();
        if (!title || !price || !imgUrl) return alert("Ma'lumotlarni to'liq kiriting!");

        setLoading(true);

        const newProduct = {
            title,
            price: Number(price),
            image: imgUrl,
            category,
            description: desc,
            createdAt: new Date().toISOString()
        };

        try {
            await productAPI.create(newProduct);

            alert("Mahsulot muvaffaqiyatli qo'shildi! 🎉");
            handleClear();
        } catch (error) {
            console.log("Xatolik bo'ldi!", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setImgUrl('');
        setTitle('');
        setPrice('');
        setCategory('');
        setDesc('');
    };


    return (
        <div className='text-white'>
            <h1 className='font-bold text-2xl'>Mahsulot qo'shish</h1>
            <p className='text-gray-400'>Yangi maxsulot ma'lumotlarini kiriting</p>

            <div className='flex grid grid-cols-2 gap-2 mt-4'>
                <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                    <div className='bg-gray-200 rounded-2xl p-4 gap-4 flex flex-col'>
                        <div>
                            <h1 className='text-black'>Rasm yuklash (url)</h1>
                            <div className='border border-gray-500 rounded-2xl p-1.5 bg-gray-50'>
                                <input type="text"
                                    value={imgUrl}
                                    onChange={(e) => setImgUrl(e.target.value)}
                                    className=' focus:outline-none text-xl ml-2.5 text-black w-full' placeholder='https://...' />
                            </div>
                        </div>
                        <div>
                            <h1 className='text-black'>Mahsulot nomi</h1>
                            <div className='border border-gray-500 rounded-2xl p-1.5 bg-gray-50'>
                                <input type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className=' focus:outline-none text-xl ml-2.5 text-black w-full' placeholder='Masalan: Samsung S24 Ultra' />
                            </div>
                        </div>
                        <div>
                            <h1 className='text-black'>Narx</h1>
                            <div className='border border-gray-500 rounded-2xl p-1.5 bg-gray-50'>
                                <input type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className=' focus:outline-none text-xl ml-2.5 text-black w-full' placeholder='1234' />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-sm font-semibold text-gray-600">Kategoriyani tanlang</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:border-[#7C3AED] focus:bg-white text-gray-700 text-sm font-medium transition-all duration-200"
                            >
                                <option value="">Turkumni belgilang...</option>
                                <option value="electronics">Elektronika</option>
                                <option value="clothes">Kiyim-kechak</option>
                                <option value="appliances">Maishiy texnika</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-sm font-bold text-gray-600 font-Nunito">
                                Mahsulot haqida qisqacha ma'lumot
                            </label>

                            <textarea
                                rows="4"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Mahsulotning asosiy xususiyatlari, ranglari va afzalliklari haqida yozing..."
                                className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#7C3AED] focus:bg-white resize-none transition-all duration-200"
                            ></textarea>
                        </div>

                        <div className='flex gap-2 font-bold text-2xl'>
                            <button
                                type="button"
                                onClick={handleClear}
                                className='text-black border w-1/2 w-full rounded-2xl border-gray-600 shadow-sm transition-colors duration-200 hover:bg-gray-300 hover:scale-95 active:scale-95'>
                                Tozalash
                            </button>
                            <button
                                type="submit"
                                disabled={loading}

                                className='border bg-blue-600 w-1/2 w-full p-3 rounded-2xl transition-colors duration-200 hover:bg-blue-800 hover:scale-95 active:scale-95'>
                                {loading ? "Saqlanmoqda..." : "Saqlash"}
                            </button>
                        </div>
                    </div>
                </form>

                <div className="flex flex-col items-center justify-center p-6 bg-gray-900/10 border-2 border-dashed border-gray-300 rounded-2xl min-h-[460px]">
                    <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Jonli ko'rinish Card xolatda ko`ramiz</h3>

                    <div className="w-[220px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">

                        <div className="w-full h-[230px] bg-gray-400 flex items-center justify-center overflow-hidden">
                            {imgUrl ? (
                                <img src={imgUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-xs text-gray-800 text-center px-4">Rasm havolasi kiritilsa shu yerda chiqadi</span>
                            )}
                        </div>

                        <div className="p-3 flex flex-col gap-1">
                            <h4 className="text-xs font-medium text-gray-800 line-clamp-2 min-h-[32px]">
                                {title || "Mahsulot nomi shu yerda chiqadi"}
                            </h4>


                            <p className="text-sm font-bold text-gray-900">
                                {price ? Number(price).toLocaleString() : "0"} so'm
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Addprodact