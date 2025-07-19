document.addEventListener("DOMContentLoaded", function () {
  const categories = {
    Milk: ["Cow Milk", "Toned Milk", "Butter", "Curd"],
    Bread: ["White Bread", "Brown Bread", "Garlic Bread", "Burger Bun"],
    Fruits: ["Apple", "Banana", "Mango", "Watermelon"],
  };

  const categoryButtons = document.querySelectorAll(".category-buttons button");
  const itemsGrid = document.getElementById("items-grid");
  const cartItems = document.getElementById("cart-items");
  const gestureMessage = document.getElementById("gesture-message");
  const checkoutBtn = document.getElementById("checkout");

  let cart = [];

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      showItems(category);
    });
  });

  function showItems(category) {
    itemsGrid.innerHTML = "";
    const items = categories[category];
    items.forEach((itemName) => {
      const div = document.createElement("div");
      div.className = "item-card";
      div.textContent = itemName;
      div.addEventListener("click", () => addToCart(itemName));
      itemsGrid.appendChild(div);
    });
  }

  function addToCart(item) {
    cart.push(item);
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      cartItems.appendChild(li);
    });
  }

  checkoutBtn.addEventListener("click", () => {
    if (cart.length > 0) {
      gestureMessage.textContent = "🛒 Checkout complete!";
      cart = [];
      renderCart();
    } else {
      gestureMessage.textContent = "Cart is empty!";
    }
  });

  // DUMMY: Gesture simulation for now
  // In real use, you'd connect this with hand gesture detection
  setTimeout(() => {
    gestureMessage.textContent = "👋 Showing gesture recognition...";
  }, 3000);
});
