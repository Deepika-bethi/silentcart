const video = document.getElementById("webcam");
const itemDisplay = document.getElementById("itemDisplay");
const cartList = document.getElementById("cartList");

let model = null;
let currentItemIndex = 0;
let cart = [];
let lastGesture = "";

const items = [
    "Milk", "Bread", "Fruits", "Rice", "Toothpaste",
    "Pickles", "Soap", "Biscuits", "Chips", "Cream"
];

const modelParams = {
    flipHorizontal: true,
    maxNumBoxes: 1,
    iouThreshold: 0.5,
    scoreThreshold: 0.6,
};

function startVideo() {
    handTrack.startVideo(video).then(status => {
        if (status) {
            console.log("Webcam started!");
            runDetection();
        } else {
            console.log("Please enable camera access.");
        }
    }).catch(err => {
        console.error("Error starting video:", err);
    });
}

function runDetection() {
    model.detect(video).then(predictions => {
        if (predictions.length > 0) {
            const gesture = predictions[0].label;

            if (gesture !== lastGesture) {
                console.log("Gesture detected:", gesture);
                lastGesture = gesture;

                if (gesture === "open") {
                    const currentItem = items[currentItemIndex];
                    if (!cart.includes(currentItem)) {
                        cart.push(currentItem);
                        updateCart();
                    } else {
                        alert(`${currentItem} already in cart!`);
                    }
                } else if (gesture === "point") {
                    currentItemIndex = (currentItemIndex + 1) % items.length;
                    updateItemDisplay();
                } else if (gesture === "closed") {
                    alert("Checkout complete!");
                    cart = [];
                    updateCart();
                }
            }
        }

        requestAnimationFrame(runDetection);
    });
}

function updateItemDisplay() {
    itemDisplay.innerText = items[currentItemIndex];
}

function updateCart() {
    cartList.innerHTML = "";
    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item;
        cartList.appendChild(li);
    });
}

handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
    updateItemDisplay();
    startVideo();
});
