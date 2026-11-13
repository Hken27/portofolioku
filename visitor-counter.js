
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
    runTransaction,
    increment,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore document
const statsRef = doc(db, "stats", "portfolio");

// DOM elements
const totalViewsElement = document.getElementById("totalViews");
const lastVisitedElement = document.getElementById("lastVisited");

const SESSION_KEY = "portfolio_visit_counted";

// Format timestamp to WIB
function formatWIB(timestamp) {
    if (!timestamp) return "--";

    const date = timestamp.toDate
        ? timestamp.toDate()
        : new Date(timestamp);

    return new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).format(date);
}

// Update visitor statistics on the page
function renderStats(data) {
    if (!data) return;

    totalViewsElement.textContent =
        Number(data.totalViews || 0).toLocaleString("id-ID");

    lastVisitedElement.textContent =
        formatWIB(data.lastVisited);
}

// Record one visit per browser tab session
async function recordVisit() {
    if (sessionStorage.getItem(SESSION_KEY)) {
        return;
    }

    await runTransaction(db, async (transaction) => {
        const snapshot = await transaction.get(statsRef);

        if (!snapshot.exists()) {
            transaction.set(statsRef, {
                totalViews: 1,
                lastVisited: serverTimestamp()
            });
            return;
        }

        transaction.update(statsRef, {
            totalViews: increment(1),
            lastVisited: serverTimestamp()
        });
    });

    sessionStorage.setItem(SESSION_KEY, "true");
}

// Load statistics and record visit
async function initializeVisitorStats() {
    if (!totalViewsElement || !lastVisitedElement) return;

    try {
        totalViewsElement.textContent = "Loading...";
        lastVisitedElement.textContent = "Loading...";

        await recordVisit();

        const snapshot = await getDoc(statsRef);

        if (snapshot.exists()) {
            renderStats(snapshot.data());
        } else {
            totalViewsElement.textContent = "0";
            lastVisitedElement.textContent = "--";
        }
    } catch (error) {
        console.error("Firebase visitor counter error:", error);

        totalViewsElement.textContent = "--";
        lastVisitedElement.textContent = "Unavailable";
    }
}

initializeVisitorStats();
