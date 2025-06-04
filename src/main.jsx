import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';

import Home from "./pages/Home.jsx";
import Quote from "./pages/Quote.jsx";
import About from "./pages/About.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import { initMetaPixel } from './utils/metaPixel';

// Initialize Meta Pixel once
initMetaPixel();

// 👇 Hook-based route tracker
function MetaPixelTracker() {
    const location = useLocation();

    useEffect(() => {
        if (window.fbq) {
            window.fbq('track', 'PageView');
        }
    }, [location.pathname]);

    return null;
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <MetaPixelTracker />
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
                <NavBar />
                <div className="flex-grow">
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/Home" element={<Home />} />
                        <Route path="/Quote" element={<Quote />} />
                        <Route path="/About" element={<About />} />
                        <Route path="/AdminLogin" element={<AdminLogin />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    </StrictMode>
);
