// Author: Raeanna Williams 
// ID #: 2406841 
// Date: November 11, 2025 
// JavaScript for login.html [IA#2] *

//Waits until all html code is loaded completely 
document.addEventListener("DOMContentLoaded", () => 
  {
    //Gets the login form from login.html
    const form = document.getElementById("loginForm");
    //Defines a unique ID for the message box for displaying messages
    const messageBoxId = "loginMessageBox";

    //Checks if there is already a message box
    if (!document.getElementById(messageBoxId)) 
      {
        //Creates aa message box if one does not exist
        const box = document.createElement("div");
        box.id = messageBoxId;
        box.className = "message-box";
        form.parentNode.insertBefore(box, form.nextSibling);
      }

      //Stores a reference to the message box for easy updates
      const messageBox = document.getElementById(messageBoxId);

      //Event listener for form submission
      form.addEventListener("submit", (e) => 
        {
          //Prevents the form from reloading the page
          e.preventDefault();

          //Reads what the user tyyped into the login fields 
          const username = document.getElementById("username").value.trim();
          const password = document.getElementById("password").value;

          //Checks for empty input fields
          if (!username || !password) 
            {
              //Displays error message
              messageBox.textContent = "Please enter both username and password.";
              messageBox.className = "message-box error";
              return;
            }

          //Gets existing user information or creates an empty array if the user does not exist yet
          const users = JSON.parse(localStorage.getItem("users")) || [];

          //Checks if the entered credentials match any user
          const user = users.find(u => u.username === username && u.password === password);
          
          //If no match was found 
          if (!user) 
            {
              //Displays error message
              messageBox.textContent = "Invalid username or password. Try again.";
              messageBox.className = "message-box error";
              //Stops the code
              return;
            }

          //If login succeeds
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          //Marks user as logged in
          localStorage.setItem("isLoggedIn", "true");
          //Updates message box with a success message
          messageBox.textContent = `Welcome back, ${user.fullName}! Redirecting...`;
          messageBox.className = "message-box success";

          //Waits 900 milliseconds (0.9 seconds) to redirect user
          setTimeout(() => 
            {
               //Redirects user to products page
              window.location.href = "products.html";
            }, 900);
  });
});
