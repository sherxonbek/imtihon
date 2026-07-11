import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';

import { users } from '../services/api';

function SignUp() {

    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);




    const inputStyle = "w-full px-3 py-2 border border-gray-300 mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

    async function handleSubmit(e) {
        e.preventDefault()
        if (!fullName || !userName || !pass) return setError("Ma'lumotni to'liq kiriting!")
        setLoading(true);

        const addUser = {
            user: userName,
            pass: pass,
            name: fullName,
        };

        try {
            const allUsers = await users.getAll();

            const isExist = allUsers.find(item => item.user === userName);

            if (isExist) {
                setError("Bu username allaqachon band!")
                setLoading(false);
                return;
            }

            await users.create(addUser);

            setError("Ma'lumotni to'liq kiriting!")
            handleClear();
        } catch (error) {


            console.log("Xatolik bo'ldi!", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error]);



    const handleClear = () => {
        setFullName('');
        setPass('');
        setUserName('');

    }

    return (
        <div className='w-full h-screen bg-gray-600 flex items-center justify-center'>

            <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg border'>
                <h1 className='text-2xl font-bold text-center mb-6 text-gray-800'>Ro'yxatdan o'tish</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1 mb-4">
                        <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                            Ism va familiya:
                        </label>

                        <input
                            id="fullName"
                            type="text"
                            placeholder="Ismingizni kiriting"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={inputStyle}
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-4">
                        <label htmlFor="userName" className="text-sm font-medium text-gray-700">
                            Username:
                        </label>

                        <input
                            id="userName"
                            type="text"
                            placeholder="Username kiriting"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className={inputStyle}
                        />
                    </div>
                    <label htmlFor="pass" className="text-sm font-medium text-gray-700">Passwoard</label>
                    <div className=' relative w-full '>
                        <input
                            id='pass'
                            type={showPass ? 'text' : 'password'}
                            placeholder='Passwoard kiriting'
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className='w-full px-3 py-2 pr-10 border border-gray-300 mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                        >
                            {showPass ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className='flex flex-col text-center gap-2'>
                        <button type='submit'
                            className='w-full h-12 rounded-2xl bg-blue-500 shadow-uzum text-white font-bold mt-1 hover:bg-blue-700 transition-all active:scale-95 '
                        >
                            {loading ? "Loading..." : "Ro'yxatdan o'tish"}
                        </button>
                        <h1 className='text-xl'>
                            Tizimga
                            <Link to="/signin" className="text-blue-500 hover:underline ml-1">
                                Kirish
                            </Link>
                        </h1>
                    </div>

                    {error && (
                        <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md mb-4 text-sm font-medium border border-red-200">
                            {error}
                        </div>
                    )}
                </form>

            </div>
        </div>
    )
}

export default SignUp
