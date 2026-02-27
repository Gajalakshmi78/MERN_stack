// server.js

const express = require("express");
const connectDB = require("./config/db");
const Vibe = require("./model/Vibe");

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

// Connect Database
connectDB();

/* ============================
   CREATE Vibe
============================ */

app.post("/vibes", async (req, res) => {
  try {
    const vibe = await Vibe.create(req.body);
    res.status(201).json(vibe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* ============================
   GET All Vibes
============================ */

app.get("/vibes", async (req, res) => {
  try {
    const vibes = await Vibe.find();
    res.status(200).json(vibes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ============================
   GET Single Vibe
============================ */

app.get("/vibes/:id", async (req, res) => {
  try {
    const vibe = await Vibe.findById(req.params.id);

    if (!vibe) {
      return res.status(404).json({ message: "Vibe not found" });
    }

    res.status(200).json(vibe);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

/* ============================
   UPDATE Vibe
============================ */

app.put("/vibes/:id", async (req, res) => {
  try {
    const updatedVibe = await Vibe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedVibe) {
      return res.status(404).json({ message: "Vibe not found" });
    }

    res.status(200).json(updatedVibe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* ============================
   DELETE Vibe
============================ */

app.delete("/vibes/:id", async (req, res) => {
  try {
    const deletedVibe = await Vibe.findByIdAndDelete(req.params.id);

    if (!deletedVibe) {
      return res.status(404).json({ message: "Vibe not found" });
    }

    res.status(200).json({ message: "Vibe Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server Running on Port 3000");
});