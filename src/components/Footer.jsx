import React from "react";
import images from "../../constants/images.js";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="relative text-white flex flex-col justify-end overflow-hidden min-h-[400px] lg:min-h-[500px] xl:min-h-[550px]">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-no-repeat bg-center bg-cover"
                style={{
                    backgroundImage: `url(${images.inAction7})`,
                }}
            >
                <div className="absolute inset-0 bg-black opacity-60" />
            </div>

            {/* All Content Area */}
            <div className="relative z-10 w-full pt-12 pb-6">
                {/* Grid Content */}
                <div className="px-6 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    {/* About */}
                    <div>
                        <h3 className="font-bold mb-2">About MovingBucks</h3>
                        <p>
                            Proudly serving Alberta, MovingBucks is committed to reliable, stress-free moving.
                            Whether you’re relocating locally or long-distance, our team is here to help.
                        </p>
                    </div>

                    {/* Hours + Socials */}
                    <div>
                        <h3 className="font-bold mb-2">Hours</h3>
                        <p>Mon–Fri: 8:30 AM – 5:00 PM</p>
                        <p>Sat: 9:00 AM – 4:00 PM</p>
                        <p>Sun: Closed</p>

                        <h3 className="font-bold mt-4">Connect With Us</h3>
                        <div className="flex space-x-4 mt-2">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebookF className="w-6 h-6 text-white hover:text-green-400" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram className="w-6 h-6 text-white hover:text-green-400" />
                            </a>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold mb-2">Join Our Newsletter</h3>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-3 py-2 rounded text-black bg-white"
                        />
                        <button className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded">
                            SUBSCRIBE
                        </button>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="text-center text-xs text-gray-300 pt-6 border-t border-gray-700 mt-10">
                    © {new Date().getFullYear()} MovingBucks —
                    <a href="#" className="hover:underline ml-1">Privacy Policy</a> •
                    <a href="#" className="hover:underline ml-1">Terms & Conditions</a> •
                    <a href="#" className="hover:underline ml-1">Claims Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
