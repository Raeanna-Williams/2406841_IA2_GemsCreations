// Author: Raeanna Williams 
// ID #: 2406841 
// Date: November 11, 2025 
// JavaScript for cart.html [IA#2]

//Waits until all html code is loaded completely 
document.addEventListener("DOMContentLoaded", () => 
  {
    //Connects JavaScript elements in cart.html
    const tbody = document.querySelector("#cartTable tbody");
    const totalCell = document.getElementById("totalCell");
    const clearBtn = document.getElementById("clearCart");
    const checkoutBtn = document.getElementById("checkoutBtn");
    const closeBtn = document.getElementById("closeBtn");

    //Loads the user's cart
    function loadCart() 
      {
        //Clears the table each time it runs
        tbody.innerHTML = "";
        let total = 0;
        //Loads cart from local storage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        //Calculates the subtotal for each item and adds it to the total
        cart.forEach((item) => 
          {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            //Creates a new table row
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${item.name}</td>
              <td>$${item.price.toFixed(2)}</td>
              <td>${item.quantity}</td>
              <td>$${subtotal.toFixed(2)}</td>
              `;
              tbody.appendChild(row);
          });
        // Updates the total cell
        totalCell.textContent = `$${total.toFixed(2)}`;
      }

    //Event listener for when the "Clear All" button is clicked
    clearBtn.addEventListener("click", () => 
      {
        //Deletes cart from local storage
        if (confirm("Clear all items from cart?")) 
          {
            localStorage.removeItem("cart");
            //Refreshes the display so it shows empty
            loadCart();
          }
      });

    //Event listener for when the "Checkout" button is clicked
    checkoutBtn.addEventListener("click", () => 
      {
        //If the cart has one or more items it redirects to the checkout page
        if (JSON.parse(localStorage.getItem("cart"))?.length) 
          {
            window.location.href = "checkout.html";
          } 
          //If the cart is empty an alert pops up
          else 
            {
              alert("Your cart is empty.");
            }
      });

    //Event listener for when the "Close" button is clicked
    closeBtn.addEventListener("click", () => 
      {
        //Redirects to products page
        window.location.href = "products.html";
      });
    
    //Load & display the cart items as soon as the page finishes loading
    loadCart();
  });
