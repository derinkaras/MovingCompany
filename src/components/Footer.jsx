import React from "react";
import images from "../../constants/images.js";

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
                <div className="px-6 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                    {/* Edmonton */}
                    <div>
                        <h3 className="font-bold mb-2">Edmonton</h3>
                        <p className="hover:underline cursor-pointer">7043 56 Avenue NW</p>
                        <p className="hover:underline cursor-pointer">Edmonton, AB</p>
                        <p className="hover:underline cursor-pointer">T6B 3L2</p>
                        <p className="mt-2">780 434 1100</p>
                    </div>

                    {/* Calgary */}
                    <div>
                        <h3 className="font-bold mb-2">Calgary</h3>
                        <p className="hover:underline cursor-pointer">4620 Manilla Rd SE</p>
                        <p className="hover:underline cursor-pointer">Suite 1A</p>
                        <p className="hover:underline cursor-pointer">Calgary, AB</p>
                        <p className="hover:underline cursor-pointer">T2G 4B7</p>
                        <p className="mt-2">403 906 3446</p>
                    </div>

                    {/* Hours + Socials */}
                    <div>
                        <h3 className="font-bold mb-2">Hours</h3>
                        <p>Mon-Fri: 8:30 AM – 5:00 PM</p>
                        <p>Sat: 9:00 AM – 4:00 PM</p>
                        <p>Sun: Closed</p>

                        <h3 className="font-bold mt-4">Connect With Us</h3>
                        <div className="flex space-x-2 mt-2">
                            {["F", "I", "G", "Y", "T"].map((char) => (
                                <div key={char} className="w-6 h-6 bg-white text-black rounded-full text-center leading-6">
                                    {char}
                                </div>
                            ))}
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
                    Copyright MovingBucks 2025 —
                    <a href="#" className="hover:underline ml-1">Privacy Policy</a> •
                    <a href="#" className="hover:underline ml-1">Terms and Conditions</a> •
                    <a href="#" className="hover:underline ml-1">Claims Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
