import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { getIdTokenResult, signInWithEmailAndPassword } from "firebase/auth";
import QuotesList from "../components/QuotesList";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await getIdTokenResult(userCredential.user);

            if (token.claims.admin) {
                setIsAdmin(true);
            } else {
                setError("Access denied: Not an admin.");
            }
        } catch (err) {
            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    if (isAdmin) return <QuotesList />;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4 py-10 overflow-y-auto">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-lg px-6 py-8 space-y-5"
            >
                <h2 className="text-2xl font-bold text-center text-green-700">
                    Admin Login
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 rounded"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {error && (
                    <p className="text-red-600 text-sm text-center">{error}</p>
                )}
            </form>
        </div>
    );
};

export default AdminLogin;
