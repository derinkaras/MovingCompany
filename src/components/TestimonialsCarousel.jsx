import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import useScrollFadeUp from "../../hooks/useScrollFadeUp";

const step = 3;

const reviews = [
    { name: "Rachel P.", text: "MovingBucks made our cross-province move completely stress-free..." },
    { name: "Jordan L.", text: "From the first quote to the last box being unloaded..." },
    { name: "Alicia M.", text: "I’ve moved five times in the last ten years..." },
    { name: "Kevin D.", text: "As a single parent, I was dreading the hassle of moving..." },
    { name: "Fatima R.", text: "The team showed up early, worked non-stop..." },
    { name: "Liam S.", text: "Honestly blown away. The quote was fast and fair..." },
    { name: "Nora K.", text: "From the first call to the last box..." },
    { name: "Dylan M.", text: "MovingBucks didn’t just move us — they moved us with care..." },
    { name: "Amira B.", text: "Professional, polite, and prepared..." },
    { name: "Ethan J.", text: "They made our office relocation seamless..." },
    { name: "Sasha V.", text: "I was nervous about hiring movers, but..." },
    { name: "Marcus C.", text: "They wrapped every item like it was a museum piece..." }
];

const TestimonialsCarousel = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [animateIndex, setAnimateIndex] = useState(0);
    const [sectionRef, isVisible] = useScrollFadeUp();

    const prev = () => {
        setStartIndex((prev) => (prev - step + reviews.length) % reviews.length);
        setAnimateIndex((prev) => prev + 1);
    };

    const next = () => {
        setStartIndex((prev) => (prev + step) % reviews.length);
        setAnimateIndex((prev) => prev + 1);
    };

    let visibleReviews = reviews.slice(startIndex, startIndex + step);
    if (visibleReviews.length < step) {
        visibleReviews = [...visibleReviews, ...reviews.slice(0, step - visibleReviews.length)];
    }

    return (
        <div
            ref={sectionRef}
            className={`py-20 px-6 bg-white fade-up ${isVisible ? 'visible' : ''}`}
        >
            <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold text-primary uppercase tracking-wide">
                    What Our Clients Say
                </h2>
                <p className="text-gray-600 mt-2 max-w-xl mx-auto">
                    We don’t just move boxes — we move lives. Here’s what our customers have to say.
                </p>
            </div>

            <div className="relative max-w-6xl mx-auto flex items-center gap-6">
                <button onClick={prev} className="text-gray-600 hover:text-primary arrow-button">
                    <ChevronLeft size={32} />
                </button>

                <div
                    key={animateIndex}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full carousel-transition"
                >
                    {visibleReviews.map((review, idx) => (
                        <div key={idx} className="bg-background-secondary p-6 rounded-xl shadow-md text-center">
                            <div className="flex justify-center mb-3 text-yellow-400">
                                {Array(5).fill(0).map((_, i) => (
                                    <Star key={i} size={20} fill="#facc15" stroke="#facc15" />
                                ))}
                            </div>
                            <p className="text-gray-800 mb-4">{review.text}</p>
                            <h4 className="font-semibold text-primary">{review.name}</h4>
                        </div>
                    ))}
                </div>

                <button onClick={next} className="text-gray-600 hover:text-primary arrow-button">
                    <ChevronRight size={32} />
                </button>
            </div>
        </div>
    );
};

export default TestimonialsCarousel;
