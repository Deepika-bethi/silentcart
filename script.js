let cart = [];
let selectedCategory = "";
let itemsData = {
  Fruits: ["Apple", "Banana", "Orange"],
  Groceries: ["Rice", "Dal", "Salt"],
  Creams: ["Fairness Cream", "Moisturizer", "Sunscreen"]
};

// Load webcam
const video = document.getElementById('webcam');
const statusBox = document.getElementById('status');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    statusBox.textContent = "🟢 Camera started. Show hand gesture.";
  })
  .catch(err => {
    statusBox.textContent = "🔴 Failed to access camera.";
    console.error(err);
  });

// Show items by category
function showItems(category) {
  selectedCategory = category;
  const items = itemsData[category];
  const listDiv = document.getElementById('items-list');
  listDiv.innerHTML = `<h3>${category} Items:</h3>`;
  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = "item";
    itemDiv.innerText = item;
    listDiv.appendChild(itemDiv);
  });
}

// Simulate gesture detection
setInterval(() => {
  const gesture = detectGesture(); // Mock gesture
  if (!gesture || !selectedCategory) return;

  const items = itemsData[selectedCategory];
  if (gesture === 'open') {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    if (!cart.includes(randomItem)) {
      cart.push(randomItem);
      updateCart();
      statusBox.textContent = `🛒 Added ${randomItem}`;
    } else {
      statusBox.textContent = `⚠️ ${randomItem} already in cart`;
    }
  } else if (gesture === 'fist') {
    if (cart.length === 0) {
      statusBox.textContent = "🛑 Cart is empty!";
    } else {
      statusBox.textContent = "✅ Checkout Complete!";
      cart = [];
      updateCart();
    }
  }
}, 2500);

// Fake gesture detection (random demo)
function detectGesture() {
  const gestures = [null, 'open', 'fist', null];
  return gestures[Math.floor(Math.random() * gestures.length)];
}

// Update cart
function updateCart() {
  const ul = document.getElementById('cart');
  ul.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
}
