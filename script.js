let currentIndex = 0;
let items = ["Milk", "Bread", "Fruits"];
let cart = [];

const webcam = document.getElementById("webcam");
const cartList = document.getElementById("cart-list");
const checkoutDiv = document.getElementById("checkout");
const checkoutItems = document.getElementById("checkout-items");

// Start webcam
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  webcam.srcObject = stream;
  console.log("Webcam started ✅");
});

// Dummy gesture simulation
document.addEventListener("keydown", (e) => {
  if (e.key === "a") {
    addItemToCart();
  } else if (e.key === "n") {
    nextItem();
  } else if (e.key === "c") {
    checkout();
  }
});

function addItemToCart() {
  const item = items[currentIndex];
  cart.push(item);
  updateCart();
  alert(`${item} added to cart`);
}

function nextItem() {
  currentIndex = (currentIndex + 1) % items.length;
  highlightCurrentCard();
}

function checkout() {
  checkoutDiv.classList.remove("hidden");
  checkoutItems.innerText = "You purchased: " + cart.join(", ");
}

// UI helpers
function updateCart() {
  cartList.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    cartList.appendChild(li);
  });
}

function highlightCurrentCard() {
  document.querySelectorAll(".card").forEach((card, index) => {
    card.style.border = index === currentIndex ? "3px solid #00aaff" : "none";
  });
}

// Initial highlight
highlightCurrentCard();
