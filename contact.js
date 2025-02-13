document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way
  
    // Fetch user input
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
  
    // Create an object with the form data
    const formData = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };
  
    // Log the form data to the console (for testing)
    console.log("Form Data:", formData);
  
    // Send the form data to a backend server (see Step 3)
    sendFormData(formData);
  });
  
  // Function to send form data to the backend
  function sendFormData(formData) {
    // Replace with your backend API endpoint
    const apiUrl = "http://localhost:3000/api/contact";
  
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Your message has been sent successfully!");
        document.getElementById("contactForm").reset(); // Clear the form
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  }