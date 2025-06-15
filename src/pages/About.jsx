import React from 'react';
import images from '../../constants/images';
import { CheckCircle, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-white text-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-20">
                {/* Header */}
                <h1 className="text-5xl font-bold text-center text-green-700 mb-6 tracking-tight">
                    About <span className="text-gray-900">MovingBucks</span>
                </h1>
                <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto mb-16">
                    Alberta’s trusted choice for reliable, stress-free moving — built by people, for people.
                </p>

                {/* Our Story */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-semibold text-green-600 mb-4">Our Story</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            MovingBucks began with a mission: to eliminate the stress and surprises from moving. Tired of outdated service and unreliable companies, we launched a people-first business focused on care, communication, and consistency.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            From humble beginnings in Edmonton to serving across Alberta, we’ve grown by earning trust, job after job. Our crew is sharp, efficient, and trained to handle every move with professionalism and precision.
                        </p>
                    </div>
                    <img
                        src={images.teamPhoto}
                        alt="MovingBucks Team"
                        className="w-full rounded-2xl shadow-lg object-cover"
                    />
                </div>

                {/* Why Choose Us */}
                <div className="mb-24">
                    <h2 className="text-3xl font-semibold text-green-600 text-center mb-10">Why Choose Us</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {[
                            {
                                icon: <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-4" />,
                                title: "Reliable Service",
                                desc: "We show up on time, fully equipped, and ready to get the job done — the right way."
                            },
                            {
                                icon: <DollarSign className="w-8 h-8 mx-auto text-green-600 mb-4" />,
                                title: "Upfront Pricing",
                                desc: "We believe in clear, honest estimates with no hidden fees or surprise charges."
                            },
                            {
                                icon: <Users className="w-8 h-8 mx-auto text-green-600 mb-4" />,
                                title: "People-First Approach",
                                desc: "You’re not just another client. We treat your move with the same care as our own."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 bg-gray-50 border rounded-xl shadow hover:shadow-md transition">
                                {item.icon}
                                <h3 className="text-xl font-semibold text-green-700 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-green-50 p-10 md:p-14 rounded-2xl text-center shadow-lg">
                    <h2 className="text-3xl font-bold text-green-700 mb-4">
                        Let’s Make Your Move the Easiest One Yet
                    </h2>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                        Contact our friendly team for a free, no-obligation quote. Whether it's a local move or long-distance, MovingBucks is here to handle it with care and confidence.
                    </p>
                    <Link
                        to="/Quote"
                        className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition"
                    >
                        Get Your Quote
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;
