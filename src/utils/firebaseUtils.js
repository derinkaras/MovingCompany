// src/lib/firebaseUtils.js

import { signInWithEmailAndPassword } from "firebase/auth";


import {
    collection,
    doc,
    addDoc,
    serverTimestamp,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
} from "firebase/firestore";
import {auth, db} from "./firebase.js";



// 🔄 Get all quotes, ordered by creation date
export const fetchAllQuotes = async () => {
    const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 📝 Update a quote
export const updateQuote = async (quoteId, updatedFields) => {
    const quoteRef = doc(db, "quotes", quoteId);
    await updateDoc(quoteRef, updatedFields);
};

// 🗑 Delete a quote
export const deleteQuote = async (quoteId) => {
    const quoteRef = doc(db, "quotes", quoteId);
    await deleteDoc(quoteRef);
};

// ✅ Mark as contacted
export const markQuoteAsContacted = async (quoteId) => {
    const quoteRef = doc(db, "quotes", quoteId);
    await updateDoc(quoteRef, { contacted: true });
};


/**
 * Sign in admin by email and password
 */
export const signInAdmin = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const tokenResult = await userCredential.user.getIdTokenResult();

        if (tokenResult.claims.admin) {
            return { user: userCredential.user };
        } else {
            throw new Error("User is not an admin.");
        }
    } catch (error) {
        console.error("Admin login failed:", error.message);
        throw error;
    }
};

/**
 * Submit a quote to Firestore
 */
export const submitQuoteToFirestore = async (quoteData) => {
    try {
        await addDoc(collection(db, "quotes"), {
            ...quoteData,
            createdAt: serverTimestamp()
        });
        console.log("Quote submitted to Firestore.");
    } catch (error) {
        console.error("Error submitting quote:", error.message);
        throw error;
    }
};
