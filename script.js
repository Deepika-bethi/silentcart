let model = null;
let currentCategoryIndex = 0;
let currentItemIndex = 0;
let categories = ["Fruits", "Groceries", "Creams", "Pickles", "Utensils"];
let cart = [];

const itemsByCategory = {
    Fruits: ["Apple", "Banana", "Mango"],
    Groceries: ["Rice", "Wheat", "Dal"],
    Creams: ["Face Cream", "Sunscreen", "Moisturizer"],
    Pickles: ["Mango Pickle", "Lemon Pickle", "Mixed Pickle"],
    Utensils: ["Plate", "Spoon", "Pan"]
};

function loadNextItem() {
    currentItemIndex++;
    if (currentItemIndex >= itemsByCategory[categories[currentCategoryIndex]].length) {
        currentItemIndex = 0;
        currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
    }
    updateUI();
}

function updateUI() {
    const category = categories[currentCategoryIndex];
    const item = itemsByCategory[category][currentItemIndex];
    document.getElementById("itemDisplay").innerText = `${category} > ${item}`;
}

function addToCart() {
    const category = categories[currentCategoryIndex];
    const item = itemsByCategory[category][currentItemIndex];

    if (!cart.includes(item)) {
        cart.push(item);
        updateCartDisplay();
    } else {
        alert("Item already in cart!");
    }
}

function updateCartDisplay() {
    document.getElementById("cartList").innerHTML = cart.map(i => `<li>${i}</li>`).join('');
}

function checkout() {
    alert("Checkout complete! Items: " + cart.join(", "));
    cart = [];
    updateCartDisplay();
}

const video = document.getElementById("webcam");

const modelParams = {
    flipHorizontal: true,
    imageScaleFactor: 0.7,
    maxNumBoxes: 1,
    iouThreshold: 0.5,
    scoreThreshold: 0.6,
};

handTrack.startVideo(video).then(function (status) {
    if (status) {
        runDetection();
    }
});

function runDetection() {
    model.detect(video).then(predictions => {
        if (predictions.length > 0) {
            const label = predictions[0].label;
            console.log("Detected:", label);

            if (label === "open") {
                addToCart();
            } else if (label === "closed") {
                checkout();
            } else if (label === "point") {
                loadNextItem();
            }
        }
        requestAnimationFrame(runDetection);
    });
}

handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
    updateUI();
});
