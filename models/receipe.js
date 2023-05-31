const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
  },
  recipeTime: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  serves: {
    type: String,
    required: true,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
