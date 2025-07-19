const categories = {
  "Groceries": ["Rice", "Wheat", "Oil"],
  "Fruits": ["Apple", "Banana", "Mango"],
  "Utensils": ["Plate", "Spoon", "Glass"],
  "Food Items": ["Biscuits", "Chips", "Chocolates"],
  "Creams & Pickles": ["Face Cream", "Mango Pickle", "Lime Pickle"]
};

let cart = [];

function openCategory(name) {
  document.getElementById("categories").classList.add("hidden");
  document.getElementById("product-section").classList.remove("hidden");
  document.getElementById("category-title").textContent = name;

  const productDiv = document.getElementById("products");
  productDiv.innerHTML = "";

  categories[name].forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item;
    btn.onclick = () => addToCart(item);
    productDiv.appendChild(btn);
  });
}

function backToCategories() {
  document.getElementById("categories").classList.remove("hidden");
  document.getElementById("product-section").classList.add("hidden");
}

function addToCart(item) {
  if (!cart.includes(item)) {
    cart.push(item);
    updateCartDisplay();
  } else {
    alert(item + " is already in your cart.");
  }
}

function updateCartDisplay() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Thanks for shopping! You selected: " + cart.join(", "));
    cart = [];
    updateCartDisplay();
  }
}
