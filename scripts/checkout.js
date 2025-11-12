// Author: Raeanna Williams 
// ID #: 2406841 
// Date: November 11, 2025 
// JavaScript for checkout.html [IA#2]

// Waits until all HTML content is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Connect JavaScript elements to checkout.html
  const tbody = document.querySelector("#summaryTable tbody");
  const grandTotal = document.getElementById("grandTotal");
  const form = document.getElementById("checkoutForm");
  const cancelBtn = document.getElementById("cancelBtn");

  // Read the user's saved cart from localStorage, or create an empty array if no cart exists
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  // Display all cart items in a summary table with subtotals
  cart.forEach((item) => {
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

  // Display overall total
  grandTotal.textContent = `$${total.toFixed(2)}`;

  // Event listener for when the "Confirm" button is clicked
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Read user-entered shipping and payment information
    const name = document.getElementById("shipName").value.trim();
    const address = document.getElementById("shipAddress").value.trim();
    const paid = parseFloat(document.getElementById("amountPaid").value);

    // Validate user inputs
    if (!name || !address || isNaN(paid)) {
      alert("Please fill in all shipping details.");
      return;
    }

    // Check if payment is less than the total due
    if (paid < total) {
      alert(`Insufficient payment. Total due: $${total.toFixed(2)}`);
      return;
    }

    // Check if payment exceeds the total due
    if (paid > total) {
      alert(`Excessive payment. Total due: $${total.toFixed(2)}`);
      return;
    }

    // Handle exact payment (successful transaction)
    if (paid === total) {
      // Show confirmation popup instead of alert
      document.getElementById("popupMessage").textContent = 
        `Thank you, ${name}! Your payment of $${paid.toFixed(2)} has been received.`;

      const popup = document.getElementById("confirmationPopup");
      popup.style.display = "flex";

      // Event listener for closing the popup
      document.getElementById("closePopup").addEventListener("click", () => {
        popup.style.display = "none";
        // Clear the user's cart
        localStorage.removeItem("cart");
        // Redirect user to store page
        window.location.href = "store.html";
      });
    }
  });

  // Event listener for the "Cancel" button
  cancelBtn.addEventListener("click", () => {
    if (confirm("Cancel checkout and return to cart?")) {
      // Redirect back to cart page
      window.location.href = "cart.html";
    }
  });
});
