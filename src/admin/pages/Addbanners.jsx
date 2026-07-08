import React, { useState } from 'react'
import { bannerAPI } from '../../services/api';

function Addbanners() {
    const [imgUrl, setImgUrl] = useState('');
    const [linkTo, setLinkTo] = useState('');

    const [loading, setLoading] = useState(false);

//saqlash bannerni 

    const handleSave = async (e) => {
        e.preventDefault();
        if (!imgUrl || !linkTo) return alert("Ma'lumotlarni to'liq kiriting!");

        setLoading(true);

        const newBanner = {
            image: imgUrl,
            linkTo,
        };

        try {
            await bannerAPI.create(newBanner);

            alert("Mahsulot muvaffaqiyatli qo'shildi! 🎉");
            handleClear();
        } catch (error) {
            console.log("Xatolik bo'ldi!", error);
        } finally {
            setLoading(false);
        }
    };

//orqani tozalash

    const handleClear = () => {
        setImgUrl('');
        setLinkTo('');
    };

    return (
        <div>
            <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                <div className='bg-gray-200 rounded-2xl p-4 gap-4 flex flex-col'>
                    <div>
                        <h1 className='text-black'>Banner rasmini yuklash (url)</h1>
                        <div className='border border-gray-500 rounded-2xl p-1.5 bg-gray-50'>
                            <input type="text"
                                value={imgUrl}
                                onChange={(e) => setImgUrl(e.target.value)}
                                className=' focus:outline-none text-xl ml-2.5 text-black w-full' placeholder='https://...' />
                        </div>
                    </div>
                    <div>
                        <h1 className='text-black'>Banner manzilini yuklang</h1>
                        <div className='border border-gray-500 rounded-2xl p-1.5 bg-gray-50'>
                            <input type="text"
                                value={linkTo}
                                onChange={(e) => setLinkTo(e.target.value)}
                                className=' focus:outline-none text-xl ml-2.5 text-black w-full' placeholder='Masalan: /maishiy' />
                        </div>
                    </div>
                    

                    <div className='flex gap-2 font-bold text-2xl'>
                        <button
                            type="button"
                            onClick={handleClear}
                            className='text-black border w-1/2 rounded-2xl border-gray-600 shadow-sm transition-colors duration-200 hover:bg-gray-300 hover:scale-95 active:scale-95'>
                            Tozalash
                        </button>
                        <button
                            type="submit"
                            disabled={loading}

                            className='border bg-blue-600 w-1/2 p-3 rounded-2xl transition-colors duration-200 hover:bg-blue-800 hover:scale-95 active:scale-95'>
                            {loading ? "Saqlanmoqda..." : "Saqlash"}
                        </button>
                    </div>
                </div>
            </form>


        </div>
    )
}

export default Addbanners