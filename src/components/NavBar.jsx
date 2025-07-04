import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";
import images from "../../constants/images.js"; // Using LogIn icon for login

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="sticky top-0 z-50 bg-background-secondary px-6 py-4">
            <div className="flex items-center justify-between">

                {/* Left side: Logo and Links */}
                <div className="flex items-center gap-10">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div>
                            <img src={images.buck} alt="MovingBucks logo" className="h-8 w-8" />
                        </div>
                        <span className="font-semibold text-3xl tracking-tight text-gray-900">
                            <span>Moving</span><span className="text-button">Bucks</span>
                        </span>
                    </Link>


                    {/* Nav Links */}
                    <nav className="hidden md:flex items-center gap-8 text-gray-800 font-semibold">
                        <NavLink to="/Home" className="hover:text-primary">Home</NavLink>
                        <NavLink to="/Quote" className="hover:text-primary">Quote</NavLink>
                        <NavLink to="/About" className="hover:text-primary">About Us</NavLink>
                    </nav>
                </div>

                {/* Right side: Login + CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/AdminLogin" className="flex items-center gap-2 text-gray-700 font-medium hover:text-primary">
                        <LogIn size={18} /> Admin Login
                    </Link>
                    <Link
                        to="/Quote"
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow-sm transition-colors"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Icon with animation */}
                <button
                    className="md:hidden w-8 h-8 relative z-50 flex items-center justify-center"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <div className={`relative w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                        {/* Top Line */}
                        <span
                            className={`absolute left-0 top-1/2 w-full h-[2px] bg-gray-900 transition-transform duration-300 ${
                                isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                            }`}
                        />
                        {/* Middle Line (fades out) */}
                        <span
                            className={`absolute left-0 top-1/2 w-full h-[2px] bg-gray-900 transition-opacity duration-200 ${
                                isOpen ? "opacity-0" : "opacity-100"
                            }`}
                        />
                        {/* Bottom Line */}
                        <span
                            className={`absolute left-0 top-1/2 w-full h-[2px] bg-gray-900 transition-transform duration-300 ${
                                isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                            }`}
                        />
                    </div>
                </button>


            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-4 text-gray-800">
                    <NavLink to="/Home" onClick={() => setIsOpen(false)}>Home</NavLink>
                    <NavLink to="/Quote" onClick={() => setIsOpen(false)}>Get a Quote</NavLink>
                    <NavLink to="/About" onClick={() => setIsOpen(false)}>About Us</NavLink>
                    <Link
                        to="/AdminLogin"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 text-gray-700 font-medium hover:text-primary font-semibold"
                    >
                        <LogIn size={18} /> Admin Login
                    </Link>
                    <Link
                        to="/Quote"
                        onClick={() => setIsOpen(false)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg text-center"
                    >
                        Get Started
                    </Link>
                </div>
            )}

        </header>
    );
};

export default NavBar;
