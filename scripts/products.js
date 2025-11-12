// Author: Raeanna Williams 
// ID #: 2406841 
// Date: November 11, 2025 
// JavaScript for products.html [IA#2] *

//Waits until all html code is loaded completely 
document.addEventListener("DOMContentLoaded", () => 
  {
    //Gets all "Add to Cart" buttons
    const addButtons = document.querySelectorAll(".btn-add");

    //Loops through each "Add to Cart" button
    addButtons.forEach((btn) => 
      {
        //Event listener for when an "Add to Cart" button is clicked
        btn.addEventListener("click", () => 
          {
            //Finds the nearest element with the .product class
            const product = btn.closest(".product");
            //Finds the product name
            const name = product.querySelector("h3").textContent;
            //Finds the product's price, converts the string to a number & removes the dollar sign
            const price = parseFloat(product.querySelector("p").textContent.replace("$", ""));
            
            //Opens popup to prompt user for the quantity of the selected item
            let quantity = prompt(`Enter quantity for "${name}":`, "1");

            //If the user selects cancel, the code stops
            if (quantity === null) return; 
            
            //Validates quantity input
            quantity = parseInt(quantity);
            if (isNaN(quantity) || quantity <= 0) 
              {
                alert("Please enter a valid quantity.");
                return;
              }

            //Gets the user's existing cart data or creates an empty array if none exists
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            //Checks if the product already exists in the cart
            const existing = cart.find((item) => item.name === name);
            
            //If product already exists, increase its quantity
            if (existing) 
              {
                existing.quantity += quantity;
              } 
            //Otherwise, add a new object to the array
            else 
              {
                cart.push({ name, price, quantity });
              }
            
            //Saves the updated cart information
            localStorage.setItem("cart", JSON.stringify(cart));

            //Displays confirmation message
            const go = confirm("Item added to cart successfully! View your cart now?");
            //Redirects to cart.html if user selects yes
            if (go) window.location.href = "cart.html";
          });
      });
  });
