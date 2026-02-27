const mongoose = require("mongoose");

const vibeSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  continent: String,
  bestTimeToVisit: String,
  estimatedBudgetUSD: Number,
  famousFor: [String],
  activities: [String],
  isVisaRequired: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Vibe", vibeSchema);