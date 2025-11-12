// Author: Raeanna Williams 
// ID #: 2406841 
// Date: November 11, 2025 
// JavaScript for register.html [IA#2]

// Waits until all HTML elements are fully loaded before running any script
document.addEventListener("DOMContentLoaded", () => {
  // Get the registration form from register.html
  const form = document.getElementById("registerForm");
  // Define a unique ID for the message box
  const messageBoxId = "registerMessageBox";

  // If a message box does not exist, create one
  if (!document.getElementById(messageBoxId)) {
    const box = document.createElement("div");
    box.id = messageBoxId;
    box.className = "message-box";
    form.parentNode.insertBefore(box, form.nextSibling);
  }

  // Reference to the message box for feedback display
  const messageBox = document.getElementById(messageBoxId);

  // Add event listener for form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevents page reload

    // Read user input values
    const fullName = document.getElementById("fullname").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Initialize empty array to collect validation errors
    let errors = [];

    // Validate all fields are filled
    if (!fullName || !dob || !email || !username || !password || !confirmPassword) {
      errors.push("All fields must be filled out.");
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) errors.push("Please enter a valid email address.");

    // Validate password length
    if (password.length < 6) errors.push("Password must be at least 6 characters long.");

    // Validate password match
    if (password !== confirmPassword) errors.push("Passwords do not match.");

    // If there are validation errors, display them and stop submission
    if (errors.length > 0) {
      messageBox.textContent = errors.join(" ");
      messageBox.className = "message-box error";
      console.warn("Registration validation failed:", errors);
      return;
    }

    // Retrieve stored users from localStorage or initialize an empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check for existing username
    if (users.some((u) => u.username === username)) {
      messageBox.textContent = "That username is already taken. Please choose another.";
      messageBox.className = "message-box error";
      return;
    }

    // Check for existing email
    if (users.some((u) => u.email === email)) {
      messageBox.textContent = "That email is already registered. Use another email or login.";
      messageBox.className = "message-box error";
      return;
    }

    // Create new user object
    const newUser = { fullName, dob, email, username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Display success message and redirect
    messageBox.textContent = "Registration successful! Redirecting to login...";
    messageBox.className = "message-box success";
    console.log("Registered new user:", newUser);

    // Reset form fields
    form.reset();

    // Redirect to login page after short delay
    setTimeout(() => {
      window.location.href = "login.html";
    }, 900);
  });
});

