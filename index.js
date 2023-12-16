const express = require("express");
const cors = require("cors");

const sectorsCollection = require("./data/sectorsdata.json");
let userDataCollection = require("./data/userData.json");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



// Get sectors
app.get("/sectors", (req, res) => {
  res.send(sectorsCollection);
});

// Get form
app.get("/form", (req, res) => {
  res.send(userDataCollection);
});

// Update form
app.patch("/form-update", async (req, res) => {
  const data = req.body;
  try {
    userDataCollection.name = data.name;
    userDataCollection.sector = data.sector;
    userDataCollection.terms = data.terms;

    res.send({ message: "Form updated successfully" });
  } catch (error) {
    console.error("Error updating form:", error.message);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// Delete form
app.delete("/form-clear", async (req, res) => {
  userDataCollection.name = "";
  userDataCollection.sector = "";
  userDataCollection.terms = false;
  res.send({ message: "Form cleared successfully" });
});

// Default route
app.get("/", (req, res) => {
  res.send("Form server is running");
});

// Start the server
app.listen(port, () => {
  console.log("Server is listening on port:", port);
});
