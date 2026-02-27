const express = require("express");
const app = express();
const PORT = 3000;

// Import travel data
let dreamTravelDestinations = require("./travel");

// Middleware
app.use(express.json());

// HOME
app.get("/", (req, res) => {
  res.send("🌍 Exploring New Vibes - Dream Travel API");
});

// =======================
// GET (READ)
// =======================

// Get all destinations
app.get("/destinations", (req, res) => {
  res.json(dreamTravelDestinations);
});

// Get destination by ID
app.get("/destinations/:id", (req, res) => {
  const { id } = req.params;
  const destination = dreamTravelDestinations.find(d => d.id === id);

  if (!destination) {
    return res.status(404).json({ message: "Destination not found" });
  }

  res.json(destination);
});

// =======================
// POST (CREATE)
// =======================

app.post("/destinations", (req, res) => {
  const newDestination = req.body;

  dreamTravelDestinations.push(newDestination);

  res.status(201).json({
    message: "Destination added",
    data: newDestination
  });
});

// =======================
// PUT (UPDATE)
// =======================

app.put("/destinations/:id", (req, res) => {
  const { id } = req.params;

  const index = dreamTravelDestinations.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Destination not found" });
  }

  dreamTravelDestinations[index] = {
    ...dreamTravelDestinations[index],
    ...req.body
  };

  res.json({
    message: "Destination updated",
    data: dreamTravelDestinations[index]
  });
});

// =======================
// DELETE (REMOVE)
// =======================

app.delete("/destinations/:id", (req, res) => {
  const { id } = req.params;

  const index = dreamTravelDestinations.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Destination not found" });
  }

  const deleted = dreamTravelDestinations.splice(index, 1);

  res.json({
    message: "Destination deleted",
    data: deleted[0]
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});