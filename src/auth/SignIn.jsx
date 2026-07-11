import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { users } from '../services/api';
import Home from '../users/pages/Home';

function SignIn() {

    const [userName, setUserName] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();



    const inputStyle = "w-full px-3 py-2 border border-gray-300 mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

    async function handleSubmit(e) {
        e.preventDefault()
        if (!userName || !pass) return setError("Ma'lumotni to'liq kiriting!")
        setLoading(true);

        const addUser = {
            user: userName,
            pass: pass,
        };

        try {
            const allUsers = await users.getAll();

            const userFound = allUsers.find(item => item.user === userName && item.pass === pass);


            if (!userFound) {
                setError("Bu username yoki passwoard xato")
                setLoading(false);
                return;
            }


            localStorage.setItem("userId", userFound.id);
            localStorage.setItem("userRole", userFound.role || "user");
            navigate("/"); 

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
        setPass('');
        setUserName('');

    }

    return (
        <div className='w-full h-screen bg-gray-600 flex items-center justify-center'>

            <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg border'>
                <h1 className='text-2xl font-bold text-center mb-6 text-gray-800'>Ro'yxatdan o'tish</h1>
                <form action="" onSubmit={handleSubmit}>

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
                    <button type='submit'
                        className='w-full h-12 rounded-2xl bg-blue-500 shadow-uzum text-white font-bold mt-1 hover:bg-blue-700 transition-all active:scale-95 '
                    >
                        {loading ? "Loading..." : "Kirish"}
                    </button>
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

export default SignIn
