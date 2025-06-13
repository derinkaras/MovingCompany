// Full styled and complete version of the Quote form

import React, { useState } from "react";
import images from "../../constants/images.js";
import { submitQuoteToFirestore } from "../utils/firebaseUtils.js";
import { trackEvent } from "../utils/metaPixel.js";

const Quote = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [firebaseSubmitted, setFirebaseSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        moveDate: "",
        movingSize: "",
        customSize: "",
        fullName: "",
        email: "",
        phoneNumber: "",
        phoneType: "",
        origin: "",
        destination: "",
        stairsOrigin: "0",
        stairsDestination: "0",
        referralSource: "",
        notes: "",
        callDate: "",
        callTime: ""
    });

    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const unavailableSlots = [
        "2025-06-10_10:00 AM", "2025-06-10_1:30 PM",
        "2025-06-11_9:00 AM", "2025-06-11_12:30 PM", "2025-06-11_4:00 PM",
        "2025-06-12_10:30 AM", "2025-06-12_2:00 PM", "2025-06-12_5:00 PM",
        "2025-06-13_8:30 AM", "2025-06-13_1:00 PM", "2025-06-13_3:30 PM",
        "2025-06-14_9:30 AM", "2025-06-14_11:00 AM", "2025-06-14_2:30 PM",
        "2025-06-15_10:00 AM", "2025-06-15_12:00 PM", "2025-06-15_4:30 PM",
        "2025-06-16_9:00 AM", "2025-06-16_1:30 PM", "2025-06-16_5:00 PM",
        "2025-06-17_11:00 AM", "2025-06-17_2:00 PM", "2025-06-17_6:00 PM"
    ];

    const fullyBookedDates = ["2025-06-02", "2025-06-06"];

    const sizes = [
        "1 Bedroom Apartment", "2 Bedroom Apartment", "3 Bedroom Apartment",
        "2 Bedroom House", "2 Bedroom House (Large)", "3 Bedroom House", "3 Bedroom House (Large)",
        "4 Bedroom House", "4 Bedroom House (Large)", "5 Bedroom House", "5 Bedroom House (Large)",
        "Room or Less", "Load/Unload Portable Storage Container", "Other (Specify Below)"
    ];

    const generateTimeSlots = () => {
        const slots = [];
        const days = 8;

        for (let d = 0; d < days; d++) {
            const date = new Date();
            date.setDate(today.getDate() + d);
            const dayStr = date.toISOString().split("T")[0];
            const isDateFullyBooked = fullyBookedDates.includes(dayStr);

            for (let i = 0; i < 17; i++) {
                const time = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 30 + i * 30);
                const hours = time.getHours();
                const minutes = time.getMinutes();
                const ampm = hours >= 12 ? "PM" : "AM";
                const hrs = hours % 12 || 12;
                const mins = minutes === 0 ? "00" : minutes;
                const timeLabel = `${hrs}:${mins} ${ampm}`;
                const key = `${dayStr}_${timeLabel}`;
                const filled = isDateFullyBooked || unavailableSlots.includes(key);

                slots.push({ date: dayStr, label: timeLabel, key, filled });
            }
        }

        return slots;
    };

    const callSlots = generateTimeSlots();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
    };

    const handleFirebaseSubmit = async () => {
        try {
            await submitQuoteToFirestore(formData);
            trackEvent("Lead");
            setFirebaseSubmitted(true);
        } catch (err) {
            console.error("Firebase update failed", err);
        }
    };

    if (formSubmitted && !firebaseSubmitted) {
        return (
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 my-10">
                <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">Confirm Your Information</h2>
                <p className="mb-6 text-gray-700 text-center">Please review your contact information before final submission:</p>
                <div className="bg-gray-50 p-4 rounded-md text-sm mb-4">
                    <p><strong>Email:</strong> {formData.email || "—"}</p>
                    <p><strong>Phone:</strong> {formData.phoneNumber || "—"} ({formData.phoneType || "N/A"})</p>
                    {formData.callTime ? (
                        <p><strong>Scheduled Call:</strong> {formData.callTime.split("_").join(" at ")}</p>
                    ) : (
                        <p><strong>Scheduled Call:</strong> Not selected</p>
                    )}
                </div>
                <div className="flex justify-center gap-4">
                    <button onClick={() => setFormSubmitted(false)} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 font-semibold">
                        Edit
                    </button>
                    <button onClick={handleFirebaseSubmit} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold">
                        Confirm & Submit
                    </button>
                </div>
            </div>
        );
    }

    if (firebaseSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center mx-10">
                <img src={images.successIcon} className="w-20 h-20 mb-4" alt="Success" />
                <h2 className="text-2xl font-bold text-green-500 mb-2">Submitted Successfully</h2>
                <p className="text-gray-700">Thank you! Your quote request is now in our system and we will be in contact with you shortly.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 ">
            <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Let’s Get You Moving the Right Way</h1>

            <div className="flex justify-center mb-6">
                <a
                    href="tel:780-907-8727"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-md flex flex-col justify-center items-center"
                >
                    📞 Tap to Call Edmonton
                    <p className="text-sm text-white mt-1">780 907 8727</p>
                </a>
            </div>

            <p className="text-center text-gray-600 mb-8">
                Thank you for considering us as your moving partner. Please <strong>complete the form below</strong> with as much detail as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {["fullName", "email", "phoneNumber", "origin", "destination"].map((name) => (
                    <div key={name}>
                        <label className="block font-medium text-gray-700 mb-1 capitalize">{name.replace(/([A-Z])/g, ' $1')}</label>
                        <input
                            type={name.includes("email") ? "email" : "text"}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            className="w-full h-12 px-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                            required
                        />
                    </div>
                ))}

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Phone Type</label>
                    <select name="phoneType" value={formData.phoneType} onChange={handleChange} className="w-full h-12 px-4 border border-gray-300 rounded-xl">
                        <option value="">Select Type</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Move Date</label>
                    <input type="date" name="moveDate" min={todayStr} value={formData.moveDate} onChange={handleChange} className="w-full h-12 px-4 border border-gray-300 rounded-xl" required />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Moving Size</label>
                    <select name="movingSize" value={formData.movingSize} onChange={handleChange} className="w-full h-12 px-4 border border-gray-300 rounded-xl" required>
                        <option value="">Select</option>
                        {sizes.map((size, i) => (
                            <option key={i} value={size}>{size}</option>
                        ))}
                    </select>
                    {formData.movingSize === "Other (Specify Below)" && (
                        <input type="text" name="customSize" placeholder="Specify size" value={formData.customSize} onChange={handleChange} className="w-full mt-2 h-12 px-4 border border-gray-300 rounded-xl" />
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {["stairsOrigin", "stairsDestination"].map((field) => (
                        <div key={field}>
                            <label className="block font-medium text-gray-700 mb-1">
                                {field === "stairsOrigin" ? "Stairs at Origin" : "Stairs at Destination"}
                            </label>
                            <select name={field} value={formData[field]} onChange={handleChange} className="w-full h-12 px-4 border border-gray-300 rounded-xl">
                                {[0, 1, 2, 3].map((num) => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Referral Source (Optional)</label>
                    <input type="text" name="referralSource" value={formData.referralSource} onChange={handleChange} className="w-full h-12 px-4 border border-gray-300 rounded-xl" />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Extra Notes (Optional)</label>
                    <textarea name="notes" rows={4} value={formData.notes} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl"></textarea>
                </div>


                <div className="flex justify-between items-center mb-2">
                    <label className="block font-medium text-gray-700">Schedule a Call (Optional)</label>
                    {formData.callTime && (
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, callTime: "" }))}
                            className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 transition"
                        >
                            ❌ Deselect
                        </button>
                    )}
                </div>


                <div>
                    <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto border p-2 rounded-xl">
                        {callSlots.map(({ key, label, date, filled }) => {
                            const selected = formData.callTime === key;
                            return (
                                <label key={key} className={`relative p-2 text-sm border rounded text-center cursor-pointer transition-all duration-150 ${filled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : selected ? "bg-green-600 text-white font-bold" : "bg-white hover:bg-green-100"}`}>
                                    <input type="radio" name="callTime" value={key} onChange={handleChange} disabled={filled} className="hidden" />
                                    <div className="font-bold">{label}</div>
                                    <div className="text-xs text-gray-500">{date}</div>
                                    {filled && <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-600">Occupied</div>}
                                </label>
                            );
                        })}
                    </div>
                </div>

                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 rounded-xl shadow-md">
                    Get Estimate Now
                </button>
            </form>
        </div>
    );
};

export default Quote;