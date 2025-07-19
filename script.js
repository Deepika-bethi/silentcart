// script.js - SilentCart Final Gesture Logic

let currentSessionIndex = 0;
let currentItemIndex = 0;
const sessions = {
    "Fruits": ["Apple", "Banana", "Orange"],
    "Groceries": ["Rice", "Wheat", "Sugar"],
    "Snacks": ["Chips", "Biscuits", "Cookies"]
};
const sessionNames = Object.keys(sessions);
let cart = {};

function updateDisplay() {
    const session = sessionNames[currentSessionIndex];
    const item = sessions[session][currentItemIndex];
    document.getElementById("session-name").innerText = session;
    document.getElementById("item-name").innerText = item;
    document.getElementById("cart-items").innerText = JSON.stringify(cart, null, 2);
}

function addToCart() {
    const session = sessionNames[currentSessionIndex];
    const item = sessions[session][currentItemIndex];
    if (cart[item]) {
        alert(item + " is already in the cart!");
    } else {
        cart[item] = 1;
        alert(item + " added to cart!");
    }
    updateDisplay();
}

function nextItem() {
    const session = sessionNames[currentSessionIndex];
    currentItemIndex = (currentItemIndex + 1) % sessions[session].length;
    updateDisplay();
}

function nextSession() {
    currentSessionIndex = (currentSessionIndex + 1) % sessionNames.length;
    currentItemIndex = 0;
    updateDisplay();
}

function checkout() {
    alert("Checkout complete! Thank you.");
    cart = {};
    currentItemIndex = 0;
    currentSessionIndex = 0;
    updateDisplay();
}

// Simulated gesture detection using keys (for now)
function onGesture(gesture) {
    switch (gesture) {
        case "Open_Palm": addToCart(); break;
        case "Closed_Fist": checkout(); break;
        case "Two_Fingers": nextItem(); break;
        case "Thumbs_Up": nextSession(); break;
        default: console.log("Unknown gesture");
    }
}

// Mock gestures with keyboard keys (can be replaced with model)
document.addEventListener("keydown", (e) => {
    if (e.key === "a") onGesture("Open_Palm");      // Add to cart
    if (e.key === "c") onGesture("Closed_Fist");    // Checkout
    if (e.key === "n") onGesture("Two_Fingers");    // Next item
    if (e.key === "s") onGesture("Thumbs_Up");      // Next session
});

window.onload = updateDisplay;
