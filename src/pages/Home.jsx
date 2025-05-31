import React from 'react';
import images from "../../constants/images.js";
import useScrollFadeUp from '../../hooks/useScrollFadeUp';
import TestimonialsCarousel from "../components/TestimonialsCarousel.jsx";
import CompanyGallery from "../components/CompanyGallery.jsx";
import { Link } from "react-router-dom"; // Add this at the top

const Home = () => {
    const [heroRef, heroVisible] = useScrollFadeUp();
    const [whyRef, whyVisible] = useScrollFadeUp();
    const [featuresRef, featuresVisible] = useScrollFadeUp();

    return (
        <>
            <div className="w-full bg-background-secondary">
                <div
                    ref={heroRef}
                    className={`container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-16 lg:flex-row lg:justify-evenly w-full fade-up ${heroVisible ? 'visible' : ''}`}
                >
                    {/* Banner CTA Section */}
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-2xl lg:text-left">
                        <h1 className="text-5xl font-bold sm:text-6xl">
                            Big Moves. <span className="cta-title">Low Costs.</span> Zero Stress.
                        </h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12">
                            MovingBucks delivers unbeatable service and pricing — whether you're moving within the city, across Alberta, across provinces, or anywhere in the U.S. All starting from Edmonton and Calgary.
                        </p>
                        <div className="bg-green-500 text-white rounded-md text-center h-16 w-full flex justify-center items-center shadow-md hover:bg-green-600 hover:cursor-pointer mx-auto">
                            <Link to="/Quote" className="bg-green-500 text-white rounded-md text-center h-16 w-full flex justify-center items-center shadow-md hover:bg-green-600 mx-auto text-xl font-semibold">
                                Get Started
                            </Link>
                        </div>
                    </div>

                    {/* Banner Image Section */}
                    <div className="flex items-center justify-center p-6 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        <img
                            src={images.hero}
                            alt=""
                            className="object-contain h-96 w-96 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
                        />
                    </div>
                </div>
            </div>

            <div
                ref={whyRef}
                className={`py-10 px-6 text-center bg-white fade-up ${whyVisible ? 'visible' : ''}`}
            >
                <div className="flex justify-center mb-6">
                    <div className={`truck-wrapper ${whyVisible ? 'visible' : ''}`}>
                        <img
                            src={images.movingTruck}
                            alt="MovingBucks Truck"
                            className="w-24 h-auto"
                        />
                    </div>
                </div>

                <h3 className="text-sm font-semibold text-green-600 uppercase tracking-widest">
                    Why MovingBucks?
                </h3>

                <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-gray-900">
                    Trusted Experience. Unmatched Value.
                </h2>

                <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
                    With years of hands-on experience and hundreds of successful moves, MovingBucks has built a reputation for reliability, professionalism, and unbeatable value. Whether you’re relocating within your city, across provinces, or anywhere in North America, we make the process smooth, affordable, and stress-free — starting from Edmonton and Calgary.
                </p>
            </div>
            <div className="mb-6">
                <CompanyGallery/>
            </div>
            {/* Features Section */}
            <div
                ref={featuresRef}
                className={`bg-white py-10 px-6`}
            >

                <div className="text-center mb-12">
                    <h2 className="text-4xl sm:text-5xl font-bold text-primary">
                        6 Reasons People Choose MovingBucks
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            title: "Quick, Customized Solutions",
                            desc: "Time matters. That’s why we respond quickly and deliver tailored estimates within 24 hours—clear, accurate, and built around your move.",
                            icon: images.checkMark,
                        },
                        {
                            title: "No Surprises",
                            desc: "Our quotes are clear and upfront—no hidden fees, no last-minute chaos. Just a smooth, stress-free move with a team you can trust.",
                            icon: images.suprisedFace,
                        },
                        {
                            title: "We Go Above & Beyond",
                            desc: "We don’t just move boxes—we move people. With thousands of five-star reviews, we take pride in going the extra mile every time.",
                            icon: images.mountain,
                        },
                        {
                            title: "The Personal Touch",
                            desc: "Moving is personal—and so are we. Clients return and request us by name because they know we treat every move like our own.",
                            icon: images.hands,
                        },
                        {
                            title: "Hassle-Free Moving",
                            desc: "Sit back—we’ve got this. From planning to unpacking, we handle the heavy lifting so your moving day feels effortless.",
                            icon: images.umbrella,
                        },
                        {
                            title: "We Protect Your Stuff",
                            desc: "We treat your belongings like our own—with care and precision. Our damage claim rate is 10x lower than the industry average.",
                            icon: images.shield,
                        }
                    ].map(({ title, desc, icon }, idx) => (
                        <div
                            key={idx}
                            className={`bg-background-secondary p-6 rounded-lg shadow-lg text-center flex flex-col items-center justify-center ${featuresVisible ? 'visible' : ''}`}
                            style={{ animationDelay: `${idx * 0.15}s`, animationFillMode: "forwards" }}
                        >
                            <img src = {icon} className="size-24 mb-4" />
                            <h4 className="text-xl font-semibold mb-2">{title.toUpperCase()}</h4>
                            <p className="text-gray-700">{desc}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-10">
                    <Link to="/Quote" className="bg-green-500 text-white text-xl font-bold px-10 py-5 rounded-full hover:bg-green-600 transition text-center">
                        FREE QUOTE
                    </Link>
                </div>
            </div>
            {/* Achievements Section */}
            <div className="bg-background-secondary py-20 px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-widest text-primary drop-shadow-[1px_1px_0px_rgba(0,0,0,0.2)]">
                        Our Achievements
                    </h2>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-10 text-center">
                    {[
                        { value: "450", label: "Happy Customers" },
                        { value: "25", label: "Local Business Partners" },
                        { value: "600", label: "Moves Completed" },
                        { value: "2", label: "Years in Business" }
                    ].map(({ value, label }, idx) => (
                        <div key={idx} className="fade-up visible">
                            <h3 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                                {value}
                                <span className="text-[#08cf65] text-4xl align-top pl-1">+</span>
                            </h3>
                            <p className="uppercase mt-2 text-sm tracking-wider text-gray-700">
                                {label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <TestimonialsCarousel />

        </>
    );
};

export default Home;
