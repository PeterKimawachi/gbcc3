const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// POST endpoint to handle form submissions
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Log the form data (for testing)
  console.log("Received Form Data:", { name, email, subject, message });

  // Save the data to a database (optional)
  // Example: Save to a JSON file or database like MongoDB

  // Send a response back to the client
  res.json({ message: "Form submitted successfully!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




const { MongoClient } = require("mongodb");

const uri = "your-mongodb-connection-string"; // Replace with your MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await client.connect();
    const database = client.db("gospelbelievers");
    const collection = database.collection("messages");

    // Insert the form data into the database
    await collection.insertOne({ name, email, subject, message });

    res.json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  } finally {
    await client.close();
  }
});