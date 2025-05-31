import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import useScrollFadeUp from "../../hooks/useScrollFadeUp";

const step = 3;

const reviews = [
    {
        name: "Rachel P.",
        text: "MovingBucks made our cross-province move completely stress-free. The crew was incredibly friendly, arrived on time, and handled our belongings with extreme care. From start to finish, everything was organized, and we felt completely taken care of. Highly recommend them for long-distance moves!"
    },
    {
        name: "Jordan L.",
        text: "From the first quote to the last box being unloaded, MovingBucks exceeded every expectation. Communication was clear and prompt, and the team treated our home like it was their own. I’ve never experienced a move this smooth and efficient before."
    },
    {
        name: "Alicia M.",
        text: "I’ve moved five times in the last ten years, and this was by far the best experience I’ve had. The MovingBucks team was professional, well-prepared, and made sure every detail was handled. I wouldn’t trust anyone else with my move."
    },
    {
        name: "Kevin D.",
        text: "As a single parent, I was dreading the hassle of moving, but MovingBucks made it unbelievably easy. They packed everything carefully, labeled each box, and were kind and patient throughout the process. It was a relief to have such supportive movers on my side."
    },
    {
        name: "Fatima R.",
        text: "The team showed up early, worked non-stop with great energy, and took extra care with our fragile items. They stayed cheerful and professional the entire time, even when we had last-minute changes. Truly a hardworking and reliable crew."
    },
    {
        name: "Liam S.",
        text: "Honestly blown away. The quote was fast and fair, and there were no surprise fees. The crew was respectful, fast, and incredibly careful with our things. They even helped us reassemble furniture at the new place. I couldn’t have asked for more."
    },
    {
        name: "Nora K.",
        text: "From the first call to the last box, the MovingBucks team delivered on everything they promised. They were professional, efficient, and genuinely cared about making our move easy. I’m recommending them to everyone I know."
    },
    {
        name: "Dylan M.",
        text: "MovingBucks didn’t just move us — they moved us with care, attention to detail, and professionalism. They treated every box like it was priceless and made sure everything arrived intact. Our move felt less like a chore and more like a collaboration."
    },
    {
        name: "Amira B.",
        text: "Professional, polite, and prepared — the MovingBucks team made our move completely stress-free. They handled everything from disassembly to final placement in our new home. I can’t thank them enough for their help and positive energy."
    },
    {
        name: "Ethan J.",
        text: "They made our office relocation seamless, keeping disruptions to a minimum and ensuring everything was set up exactly how we needed it. Their professionalism made a huge difference during a hectic time. Highly recommended for business moves."
    },
    {
        name: "Sasha V.",
        text: "I was nervous about hiring movers, but MovingBucks quickly put those worries to rest. They were efficient, careful, and even helped with unpacking. The whole team went above and beyond — it was a great experience from start to finish."
    },
    {
        name: "Marcus C.",
        text: "They wrapped every item like it was a museum piece, and I could see they genuinely cared about protecting our belongings. Everything arrived in perfect condition, and they even helped arrange the furniture in our new home. Five stars isn’t enough."
    }
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
