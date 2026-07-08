import React, { useEffect, useState } from 'react'
import { bannerAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Carousel() {
    const navigate = useNavigate();
    const [banners, setBanners] = useState(() => {
        const savedBanners = localStorage.getItem('uzum_banners');
        return savedBanners ? JSON.parse(savedBanners) : [];
    });
    const [tartibRaqam, setTartibRaqam] = useState(0);
    const [loading, setLoading] = useState(banners.length === 0);

    useEffect(() => {
        bannerAPI.getAll()
            .then(data => {
                setBanners(data);
                setLoading(false);
                
                localStorage.setItem('uzum_banners', JSON.stringify(data));
            })
            .catch(err => {
                console.error("Bannerlarni olishda xatolik:", err);
                setLoading(false);
            });
    }, []);

    const back = () => {
        const isBack = tartibRaqam === 0;
        const newIndex = isBack ? banners.length - 1 : tartibRaqam - 1;
        setTartibRaqam(newIndex);
    };

    const next = () => {
        const isNext = tartibRaqam === banners.length - 1;
        const newIndex = isNext ? 0 : tartibRaqam + 1;
        setTartibRaqam(newIndex);
    };

    useEffect(() => {
        if (banners.length === 0) return;
        const vaqt = setInterval(() => {
            next();
        }, 4000);
        return () => clearInterval(vaqt);
    }, [tartibRaqam, banners]);

    const handleBannerClick = () => {
        if (banners.length > 0) {
            const targetUrl = banners[tartibRaqam].linkTo;
            navigate(targetUrl);
        }
    };

    if (loading || banners.length === 0) {
        return (
            <div className="w-full mx-auto h-[160px] sm:h-[280px] md:h-[360px] bg-gray-200 animate-pulse rounded-2xl mb-6 px-4"></div>
        );
    }

    return (
        <div className="w-full mx-auto h-[160px] sm:h-[280px] md:h-[360px] relative group mb-6 px-4 select-none">

            <div
                onClick={handleBannerClick}
                style={{ backgroundImage: `url(${banners[tartibRaqam].image})` }}
                className="w-full  h-full rounded-2xl bg-center bg-[length:100%_100%] duration-500 shadow-sm border border-gray-100 cursor-pointer transition-transform active:scale-[0.99]"
            ></div>

            <button
                onClick={(e) => { e.stopPropagation(); back(); }}
                className="hidden group-hover:block absolute top-[50%] -translate-y-[50%] left-8 text-2xl rounded-full p-2 bg-white/80 text-gray-800 hover:bg-white shadow-md cursor-pointer transition-all duration-200"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="hidden group-hover:block absolute top-[50%] -translate-y-[50%] right-8 text-2xl rounded-full p-2 bg-white/80 text-gray-800 hover:bg-white shadow-md cursor-pointer transition-all duration-200"
            >
                <ChevronRight size={24} />
            </button>

            <div className="flex justify-center absolute bottom-4 left-0 right-0 gap-2">
                {banners.map((_, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex(slideIndex); }}
                        className={`transition-all duration-300 h-2 rounded-full cursor-pointer ${tartibRaqam === slideIndex ? 'w-6 bg-[#7C3AED]' : 'w-2 bg-white/60'
                            }`}
                    ></div>
                ))}
            </div>

        </div>
    )
}

export default Carousel