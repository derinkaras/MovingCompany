import React, { useEffect, useState } from "react";
import {
    fetchAllQuotes,
    updateQuote,
    deleteQuote
} from "../utils/firebaseUtils";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import classNames from "classnames";

dayjs.extend(isoWeek);

const groupQuotesByWeek = (quotes) => {
    const groups = {};
    quotes.forEach((quote) => {
        const date = quote.createdAt?.toDate?.();
        if (!date) return; // skip if no date

        const weekStart = dayjs(date).startOf("isoWeek").format("YYYY-MM-DD");
        if (!groups[weekStart]) groups[weekStart] = [];
        groups[weekStart].push(quote);
    });
    return groups;
};

const QuotesList = () => {
    const [quotesByWeek, setQuotesByWeek] = useState({});
    const [expanded, setExpanded] = useState({});
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editedQuote, setEditedQuote] = useState({});

    useEffect(() => {
        const load = async () => {
            const quotes = await fetchAllQuotes();
            const grouped = groupQuotesByWeek(quotes);
            setQuotesByWeek(grouped);
            setLoading(false);
        };
        load();
    }, []);

    const toggleExpand = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleDelete = async (id) => {
        await deleteQuote(id);
        setQuotesByWeek((prev) => {
            const updated = {};
            for (const [week, quotes] of Object.entries(prev)) {
                updated[week] = quotes.filter((q) => q.id !== id);
            }
            return updated;
        });
    };

    const handleToggleContacted = async (id, contacted) => {
        await updateQuote(id, { contacted: !contacted });
        setQuotesByWeek((prev) => {
            const updated = {};
            for (const [week, quotes] of Object.entries(prev)) {
                updated[week] = quotes.map((q) =>
                    q.id === id ? { ...q, contacted: !contacted } : q
                );
            }
            return updated;
        });
    };

    const startEditing = (quote) => {
        setEditingId(quote.id);
        setEditedQuote({ ...quote });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedQuote((prev) => ({ ...prev, [name]: value }));
    };

    const saveQuote = async (id) => {
        const { id: _, ...updatedFields } = editedQuote;
        await updateQuote(id, updatedFields);
        setEditingId(null);
        setEditedQuote({});
        setQuotesByWeek((prev) => {
            const updated = {};
            for (const [week, quotes] of Object.entries(prev)) {
                updated[week] = quotes.map((q) =>
                    q.id === id ? { ...q, ...updatedFields } : q
                );
            }
            return updated;
        });
    };

    if (loading) return <p className="p-4 text-center">Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Quotes Dashboard</h1>
            {Object.entries(quotesByWeek).map(([week, quotes]) => (
                <div key={week} className="mb-8">
                    <h2 className="text-xl font-semibold mb-3 text-green-700">
                        Week of {dayjs(week).format("MMMM D, YYYY")}
                    </h2>
                    <div className="space-y-2">
                        {quotes.map((q) => (
                            <div
                                key={q.id}
                                className="border rounded-md shadow p-4 bg-white"
                            >
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleExpand(q.id)}
                                >
                                    <div>
                                        <p className="font-semibold">{q.fullName}</p>
                                        <p className="text-sm text-gray-600">
                                            {q.origin} → {q.destination} | {q.moveDate}
                                        </p>
                                    </div>
                                    <p
                                        className={classNames(
                                            "text-sm font-bold",
                                            q.contacted ? "text-green-600" : "text-red-500"
                                        )}
                                    >
                                        {q.contacted ? "Contacted" : "Not Contacted"}
                                    </p>
                                </div>

                                {expanded[q.id] && (
                                    <div className="mt-4 text-sm grid grid-cols-2 gap-4">
                                        {editingId === q.id ? (
                                            <>
                                                {Object.keys(q).filter((key) => key !== "id" && key !== "createdAt" && key !== "contacted").map((field) => (
                                                    <div key={field} className="col-span-1">
                                                        <label className="block text-xs font-medium mb-1 capitalize">{field}</label>
                                                        <input
                                                            type="text"
                                                            name={field}
                                                            value={editedQuote[field] || ""}
                                                            onChange={handleChange}
                                                            className="w-full border p-2 rounded"
                                                        />
                                                    </div>
                                                ))}
                                                <div className="col-span-2 flex gap-4 mt-2">
                                                    <button
                                                        onClick={() => saveQuote(q.id)}
                                                        className="bg-green-600 text-white px-4 py-2 rounded"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="bg-gray-400 text-white px-4 py-2 rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <p><strong>Email:</strong> {q.email}</p>
                                                    <p><strong>Phone:</strong> {q.phoneNumber} ({q.phoneType})</p>
                                                    <p><strong>Referral Source:</strong> {q.referralSource || "—"}</p>
                                                    <p><strong>Call Time:</strong> {q.callTime?.split("_").join(" at ") || "—"}</p>
                                                </div>
                                                <div>
                                                    <p><strong>Stairs (Origin):</strong> {q.stairsOrigin}</p>
                                                    <p><strong>Stairs (Destination):</strong> {q.stairsDestination}</p>
                                                    <p><strong>Size:</strong> {q.movingSize} {q.customSize && `(${q.customSize})`}</p>
                                                    <p><strong>Notes:</strong> {q.notes || "—"}</p>
                                                </div>

                                                <div className="col-span-2 flex gap-4 mt-4">
                                                    <button
                                                        onClick={() => handleToggleContacted(q.id, q.contacted)}
                                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                                    >
                                                        {q.contacted ? "Unmark as Contacted" : "Mark as Contacted"}
                                                    </button>
                                                    <button
                                                        onClick={() => startEditing(q)}
                                                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(q.id)}
                                                        className="bg-red-600 text-white px-4 py-2 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuotesList;
