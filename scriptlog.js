document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Here, you would typically validate the username and password
    // against your backend server or some database.
    // For this example, let's assume username is "user" and password is "password".

    if (username === "ADMIN" && password === "pass@123") {
        // Store the username in localStorage
        localStorage.setItem("username", username);
        // Redirect back to the landing page
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password.");
    }
});
