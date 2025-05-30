import React, { useState } from "react";
import images from "../../constants/images.js";

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

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const unavailableSlots = ["2025-06-01_10:00 AM", "2025-06-01_1:30 PM"];
    const fullyBookedDates = ["2025-06-02"];

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
    };

    const handleFirebaseSubmit = async () => {
        try {
            // const { bookQuoteMeeting } = await import("../../firebase");
            // await bookQuoteMeeting({ ...formData });
            setFirebaseSubmitted(true);
            console.log("Submitted to Firebase:", formData);
        } catch (err) {
            console.error("Firebase update failed", err);
        }
    };

    if (formSubmitted && !firebaseSubmitted) {
        return (
            <div className="max-w-xl mx-auto text-center py-12">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Confirm Your Information</h2>
                <p className="mb-6 text-gray-700">Please review your contact information before final submission:</p>

                <div className="bg-gray-100 w-full p-4 rounded-md text-left text-sm shadow mb-4">
                    <p><strong>Email:</strong> {formData.email || "—"}</p>
                    <p><strong>Phone:</strong> {formData.phoneNumber || "—"} ({formData.phoneType || "N/A"})</p>
                    {formData.callTime ? (
                        <p><strong>Scheduled Call:</strong> {formData.callTime.split("_").join(" at ")}</p>
                    ) : (
                        <p><strong>Scheduled Call:</strong> Not selected</p>
                    )}
                </div>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => setFormSubmitted(false)}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm font-semibold"
                    >
                        Edit Information
                    </button>
                    <button
                        onClick={handleFirebaseSubmit}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-semibold"
                    >
                        Confirm & Submit
                    </button>
                </div>
            </div>
        );
    }

    if (firebaseSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center max-w-xl mx-auto">
                <img src={images.successIcon} className="w-20 h-20 mb-4" alt="Success" />
                <h2 className="text-2xl font-bold text-green-500 mb-2">Submitted Successfully</h2>
                <p className="text-gray-700">Thank you! Your quote request is now in our system and we will be in contact with you shortly.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-center text-green-700 mb-4">Your Eager Beaver Moving Experience Starts Here</h1>
            <div className="flex justify-center items-center gap-4 mb-6">
                <a href="tel:780-270-1761" className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold text-center">
                    {isMobile ? "Call Edmonton 780-270-1761" : "Click to Call Edmonton Office"}
                </a>
                <a href="tel:780-270-1761" className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold text-center">
                    {isMobile ? "Call Calgary 780-270-1761" : "Click to Call Calgary Office"}
                </a>
            </div>
            <p className="text-center mb-6">
                Thank you for considering us as your moving partner. Please <strong>complete the form below</strong> with as much detail as possible.
            </p>


            <form onSubmit={handleSubmit} className="space-y-4">
                {[
                    { name: "fullName", type: "text", label: "Full Name", required: true },
                    { name: "email", type: "email", label: "Email", required: true },
                    { name: "phoneNumber", type: "tel", label: "Phone Number", required: true },
                    { name: "origin", type: "text", label: "Moving From", required: true },
                    { name: "destination", type: "text", label: "Moving To", required: true }
                ].map(({ name, type, label, required }) => (
                    <div key={name}>
                        <label className="block font-semibold mb-1">{label}</label>
                        <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            required={required}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                ))}

                <div>
                    <label className="block font-semibold mb-1">Phone Type</label>
                    <select name="phoneType" value={formData.phoneType} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="">Select Type</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold mb-1">Move Date</label>
                    <input
                        type="date"
                        name="moveDate"
                        min={todayStr}
                        value={formData.moveDate}
                        onChange={handleChange}
                        className="w-full p-2 border rounded bg-white"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Moving Size</label>
                    <select name="movingSize" value={formData.movingSize} onChange={handleChange} className="w-full p-2 border rounded" required>
                        <option value="">Select</option>
                        {sizes.map((size, i) => (
                            <option key={i} value={size}>{size}</option>
                        ))}
                    </select>
                    {formData.movingSize === "Other (Specify Below)" && (
                        <input
                            type="text"
                            name="customSize"
                            placeholder="Specify size"
                            value={formData.customSize}
                            onChange={handleChange}
                            className="w-full mt-2 p-2 border rounded"
                        />
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {["stairsOrigin", "stairsDestination"].map((field) => (
                        <div key={field}>
                            <label className="block font-semibold mb-1">
                                {field === "stairsOrigin" ? "Stairs at Origin" : "Stairs at Destination"}
                            </label>
                            <select name={field} value={formData[field]} onChange={handleChange} className="w-full p-2 border rounded">
                                {[0, 1, 2, 3].map((num) => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                <div>
                    <label className="block font-semibold mb-1">Referral Source (Optional)</label>
                    <input
                        type="text"
                        name="referralSource"
                        value={formData.referralSource}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Extra Notes (Optional)</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows={4}
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Schedule a Call (Optional)</label>
                    <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto border p-2 rounded">
                        {callSlots.map(({ key, label, date, filled }) => {
                            const selected = formData.callTime === key;
                            return (
                                <label
                                    key={key}
                                    className={`relative p-2 text-sm border rounded text-center cursor-pointer transition-all duration-150 ${
                                        filled ? "bg-gray-300 text-gray-500 cursor-not-allowed" :
                                            selected ? "bg-green-600 text-white font-bold" : "bg-white hover:bg-green-100"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="callTime"
                                        value={key}
                                        onChange={handleChange}
                                        disabled={filled}
                                        className="hidden"
                                    />
                                    <div className="font-bold">{label}</div>
                                    <div className="text-xs text-gray-500">{date}</div>
                                    {filled && (
                                        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-600">
                                            Occupied
                                        </div>
                                    )}
                                </label>
                            );
                        })}
                    </div>
                </div>

                <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700">
                    Get Estimate Now
                </button>
            </form>
        </div>
    );
};

export default Quote;
