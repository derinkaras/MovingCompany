import React from 'react';
import images from '../../constants/images';

const About = () => {
    return (
        <div className="bg-white text-gray-800">
            <div className="max-w-5xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold text-center text-green-700 mb-8">About MovingBucks</h1>

                <div className="text-center mb-12">
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        At MovingBucks, we’re more than just movers — we’re your trusted relocation partners. Our mission is to make every move effortless, stress-free, and handled with care, no matter the distance.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-2xl font-semibold text-green-600 mb-4">Our Story</h2>
                        <p className="text-gray-700 leading-relaxed">
                            MovingBucks was founded by a group of young, energetic professionals with one goal: to disrupt the moving industry with unbeatable service, modern tools, and a people-first approach. What started as a local operation has grown into a regional leader in smart, reliable moving services.
                        </p>
                    </div>
                    <img src={images.companyImg1} alt="Our Team" className="w-full rounded-xl shadow-lg" />
                </div>

                <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
                    {[
                        {
                            title: "Reliable Service",
                            desc: "Our team shows up on time, communicates clearly, and handles your belongings with care."
                        },
                        {
                            title: "Transparent Pricing",
                            desc: "No hidden fees. Just honest quotes that make budgeting your move easy and fair."
                        },
                        {
                            title: "Customer First",
                            desc: "We're dedicated to making your move seamless. From first call to final unload, we’ve got your back."
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="p-6 border rounded-lg shadow hover:shadow-md transition">
                            <h3 className="text-xl font-semibold text-green-700 mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-green-100 p-8 rounded-xl text-center shadow">
                    <h2 className="text-2xl font-bold text-green-700 mb-2">Let’s Make Your Move Simple</h2>
                    <p className="text-gray-700 mb-4">Contact our team today for a free estimate and discover how stress-free moving can really be.</p>
                    <a href="/Quote" className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition">
                        Get Your Quote
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
