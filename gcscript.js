/* ==========================================================
   GemsCreations JavaScript 
   Author: Raeanna Williams 
   ID #: 2406841 
   Date: November 11, 2025 
   Project: Web Programming IA#2
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  console.log("GemsCreations script loaded successfully ✔");

  setupRegisterForm();
  setupLoginForm();
  setupProductButtons();
  setupCartPage();
  setupCheckoutPage();
});


/* ==========================================================
   ✔ REGISTER PAGE FUNCTIONALITY
   ========================================================== */
function setupRegisterForm() {
  // FIX: match HTML form id
  const form = document.getElementById("register-form");
  if (!form) return;

  console.log("Register page detected");

  const messageBoxId = "registerMessageBox";

  // Create message box if not found
  if (!document.getElementById(messageBoxId)) {
    const box = document.createElement("div");
    box.id = messageBoxId;
    box.className = "message-box";
    form.insertAdjacentElement("afterend", box);
  }

  const messageBox = document.getElementById(messageBoxId);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get user input data
    const fullName = document.getElementById("fullname").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    let errors = [];

    // Validation
    if (!fullName || !dob || !email || !username || !password || !confirmPassword)
      errors.push("All fields must be filled out.");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) errors.push("Please enter a valid email.");

    if (password.length < 6) errors.push("Password must be at least 6 characters.");

    if (password !== confirmPassword) errors.push("Passwords do not match.");

    if (errors.length > 0) {
      messageBox.textContent = errors.join(" ");
      messageBox.className = "message-box error";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.username === username)) {
      messageBox.textContent = "That username is taken. Choose another.";
      messageBox.className = "message-box error";
      return;
    }

    if (users.some(u => u.email === email)) {
      messageBox.textContent = "Email already registered.";
      messageBox.className = "message-box error";
      return;
    }

    // Save user
    users.push({ fullName, dob, email, username, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Success Feedback
    messageBox.textContent = "🎉 Registration successful! Redirecting...";
    messageBox.className = "message-box success";

    setTimeout(() => window.location.href = "login.html", 1500);
  });
}



/* ==========================================================
   ✔ LOGIN FUNCTIONALITY
   ========================================================== */
function setupLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  console.log("Login page detected");

  const messageBoxId = "loginMessageBox";

  if (!document.getElementById(messageBoxId)) {
    const box = document.createElement("div");
    box.id = messageBoxId;
    box.className = "message-box";
    form.insertAdjacentElement("afterend", box);
  }

  const messageBox = document.getElementById(messageBoxId);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
      messageBox.textContent = "Please enter both username and password.";
      messageBox.className = "message-box error";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username.trim().toLowerCase() === username.toLowerCase() && u.password === password);

    if (!user) {
      messageBox.textContent = "Invalid username or password.";
      messageBox.className = "message-box error";
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");

    messageBox.textContent = `Welcome back, ${user.fullName}! Redirecting...`;
    messageBox.className = "message-box success";

    setTimeout(() => window.location.href = "products.html", 900);
  });
}


/* ==========================================================
   ✔ PRODUCT PAGE: ADD TO CART
   ========================================================== */
function setupProductButtons() {
  const buttons = document.querySelectorAll(".btn-add");
  if (!buttons.length) return;

  console.log("Products page detected");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product");
      const name = product.querySelector("h3").textContent;
      const price = parseFloat(product.querySelector("p").textContent.replace("$", ""));

      let quantity = prompt(`Enter quantity for "${name}":`, "1");
      if (quantity === null) return;

      quantity = parseInt(quantity);
      if (isNaN(quantity) || quantity <= 0) {
        alert("Enter a valid quantity.");
        return;
      }

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(item => item.name === name);

      if (existing) existing.quantity += quantity;
      else cart.push({ name, price, quantity });

      localStorage.setItem("cart", JSON.stringify(cart));

      if (confirm("Item added! View cart?")) window.location.href = "cart.html";
    });
  });
}


/* ==========================================================
   ✔ CART PAGE
   ========================================================== */
function setupCartPage() {
  const table = document.getElementById("cartTable");
  if (!table) return;

  console.log("Cart page detected");

  const tbody = table.querySelector("tbody");
  const totalCell = document.getElementById("totalCell");
  const clearBtn = document.getElementById("clearCart");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const closeBtn = document.getElementById("closeBtn");

  function loadCart() {
    tbody.innerHTML = "";
    let total = 0;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(item => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>${item.quantity}</td>
        <td>$${subtotal.toFixed(2)}</td>
      `;
      tbody.appendChild(row);
    });

    totalCell.textContent = `$${total.toFixed(2)}`;
  }

  clearBtn.addEventListener("click", () => {
    if (confirm("Clear all items?")) {
      localStorage.removeItem("cart");
      loadCart();
    }
  });

  checkoutBtn.addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem("cart"))?.length)
      window.location.href = "checkout.html";
    else alert("Your cart is empty.");
  });

  closeBtn.addEventListener("click", () => window.location.href = "products.html");

  loadCart();
}


/* ==========================================================
   ✔ CHECKOUT PAGE FUNCTIONALITY
   ========================================================== */
function setupCheckoutPage() {
  const table = document.getElementById("summaryTable");
  if (!table) return;

  console.log("Checkout page detected");

  const tbody = table.querySelector("tbody");
  const grandTotal = document.getElementById("grandTotal");
  const form = document.getElementById("checkoutForm");
  const cancelBtn = document.getElementById("cancelBtn");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${subtotal.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });

  grandTotal.textContent = `$${total.toFixed(2)}`;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("shipName").value.trim();
    const address = document.getElementById("shipAddress").value.trim();
    const paid = parseFloat(document.getElementById("amountPaid").value);

    if (!name || !address || isNaN(paid)) {
      alert("Please complete all fields.");
      return;
    }

    if (paid !== total) {
      alert(`Payment must equal total: $${total.toFixed(2)}`);
      return;
    }

    const popup = document.getElementById("confirmationPopup");
    document.getElementById("popupMessage").textContent = 
      `Thank you, ${name}! Your payment of $${paid.toFixed(2)} has been received.`;

    popup.style.display = "flex";

    document.getElementById("closePopup").addEventListener("click", () => {
      popup.style.display = "none";
      localStorage.removeItem("cart");
      window.location.href = "products.html";
    });
  });

  cancelBtn.addEventListener("click", () => {
    if (confirm("Cancel checkout?"))
      window.location.href = "cart.html";
  });
}
