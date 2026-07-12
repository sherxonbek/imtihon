import React, { useEffect, useState } from 'react'
import { GrEdit } from 'react-icons/gr'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { productAPI } from '../../services/api';

function ProdactsManage() {

    const [allPraducts, setAllPraducts] = useState([]);
    const [loading, setLoading] = useState(false);


    async function orders() {
        setLoading(true);

        try {
            const allPraduct = await productAPI.getAll();


            setAllPraducts(allPraduct)

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        orders();
    }, []);


    return (
        <div className='w-full bg-gray-50 '>
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-extrabold text-gray-900">Maxsulotlar</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                <th className="py-3 pl-4">Rasm</th>
                                <th className="py-3 pl-4">Mahsulot Nomi</th>
                                <th className="py-3">Narxi</th>
                                <th className="py-3 pr-16 text-right">Amallar</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm font-medium text-gray-700 bg-white">

                            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">

                                <td className="py-4 pl-1 w-24">
                                    <div className="w-16 h-20 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-400 font-bold">
                                        Rasm
                                    </div>
                                </td>

                                <td className="py-4 max-w-xs md:max-w-md pl-2">
                                    <h3 className="font-bold text-gray-900 line-clamp-2 pr-4">
                                        BMW M5 sedan luxury car edition
                                    </h3>
                                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded mt-1 inline-block">
                                        Mashinalar
                                    </span>
                                </td>

                                <td className="py-4 font-extrabold text-gray-950 whitespace-nowrap">
                                    70,000,000 so'm
                                </td>

                                <td className="py-4 pr-12 text-right w-36">
                                    <div className="flex items-center justify-end gap-4">

                                        <button
                                            type="button"
                                            className="px-3 py-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors cursor-pointer"
                                        >
                                            <GrEdit size={20} />
                                        </button>

                                        <button
                                            type="button"
                                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                        >
                                            <RiDeleteBin6Fill size={20} />
                                        </button>

                                    </div>
                                </td>

                            </tr>

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProdactsManage

