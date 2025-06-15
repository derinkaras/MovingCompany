import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const IMAGES_PER_PAGE = 4;
const TOTAL_IMAGES = 12; // total number of gallery images

const CompanyGallery = () => {
    const [page, setPage] = useState(1);

    const galleryImages = Array.from({ length: TOTAL_IMAGES }, (_, i) =>
        `/images/gallery/inAction${i + 1}.webp`
    );

    const totalPages = Math.ceil(galleryImages.length / IMAGES_PER_PAGE);
    const startIndex = (page - 1) * IMAGES_PER_PAGE;
    const currentImages = galleryImages.slice(startIndex, startIndex + IMAGES_PER_PAGE);

    return (
        <div className="w-full max-w-screen-xl mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-8">
                <Typewriter
                    words={["Our team at work", "Behind the scenes"]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={50}
                    deleteSpeed={30}
                    delaySpeed={2500}
                />
            </h2>

            <div className="w-fit mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-4">
                    {currentImages.map((src, idx) => (
                        <div key={startIndex + idx} className="rounded overflow-hidden shadow-md">
                            <img
                                loading="lazy"
                                src={src}
                                alt={`Team ${startIndex + idx + 1}`}
                                className="w-full h-60 object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex justify-center items-center space-x-3 text-sm text-gray-600">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`px-2 py-1 rounded ${
                            page === i + 1 ? "text-green-700 font-bold" : "hover:underline"
                        }`}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                {page < totalPages && (
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="text-blue-600 hover:underline"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default CompanyGallery;
