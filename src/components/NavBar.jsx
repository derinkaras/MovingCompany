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
                        <div className="p-[6px] bg-green-100 rounded-full">
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
                    <Link to="/login" className="flex items-center gap-2 text-gray-700 font-medium hover:text-primary">
                        <LogIn size={18} /> Login
                    </Link>
                    <Link
                        to="/Quote"
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow-sm transition-colors"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Icon */}
                <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
                    {isOpen ? (
                        <X size={28} className="text-gray-800" />
                    ) : (
                        <div className="flex flex-col justify-center items-center gap-[6px]">
                            <span className="block w-6 h-[2px] bg-gray-900"></span>
                            <span className="block w-6 h-[2px] bg-gray-900"></span>
                        </div>
                    )}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-4 text-gray-800 font-semibold">
                    <NavLink to="/Home">Home</NavLink>
                    <NavLink to="/Quote">Get a Quote</NavLink>
                    <NavLink to="/About">About</NavLink>
                    <Link to="/login" className="flex items-center gap-2 text-gray-700 font-medium hover:text-primary">
                        <LogIn size={18} /> Login
                    </Link>
                    <Link to = "/Quote" className="bg-green-500 text-white px-4 py-2 rounded-lg text-center">
                        Get Started
                    </Link>
                </div>
            )}
        </header>
    );
};

export default NavBar;
