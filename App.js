// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("./models/receipe");

// Create Express application
const app = express();

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://root:admin123@receipe.n7e8z0j.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes
app.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.render("index", { recipes });
  } catch (error) {
    console.error("Error retrieving recipes:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/add-recipe", async (req, res) => {
  try {
    const { recipeName, recipeTime, ingredients, serves } = req.body;
    const recipe = new Recipe({
      recipeName,
      recipeTime,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      serves,
    });
    await recipe.save();
    res.redirect("/");
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/delete-recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Recipe.findByIdAndRemove(id);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/update-recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { recipeTime, serves } = req.body;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        recipeTime,
        serves,
      },
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
