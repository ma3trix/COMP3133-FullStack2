const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('./restaurant'); // Assuming your Restaurant schema is defined in a file named restaurant.js

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://malikbiyi:nrNYG7dlYFaDqzcz@cluster0.s6z3j2j.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Route to fetch all restaurants
app.get('/restaurants/all', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch restaurant details by cuisine
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  const { cuisine } = req.params;
  try {
    const restaurants = await Restaurant.find({ cuisines: cuisine });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch restaurant details sorted by restaurant_id
app.get('/restaurants', async (req, res) => {
  const { sortBy } = req.query;
  try {
    const restaurants = await Restaurant.find().sort({ restaurant_id: sortBy === 'ASC' ? 1 : -1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch restaurant details where cuisines are equal to Delicatessen and the city is not equal to Brooklyn
app.get('/restaurants/Delicatessen', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ cuisines: 'Delicatessen', city: { $ne: 'Brooklyn' } }, { _id: 0, cuisines: 1, name: 1, city: 1 }).sort({ name: 1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
