// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./user'); // Assuming your user schema is defined in a file named user.js

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://userdb:O9uONKSDYAFMkfu0@atlascluster.qkxi527.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

// Define User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    minlength: 4
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  address: {
    street: String,
    suite: String,
    city: {
      type: String,
      match: /^[a-zA-Z\s]+$/
    },
    zipcode: {
      type: String,
      match: /^\d{5}-\d{4}$/
    },
    geo: {
      lat: String,
      lng: String
    }
  },
  phone: {
    type: String,
    match: /^1-\d{3}-\d{3}-\d{4}$/
  },
  website: {
    type: String,
    match: /^(http|https):\/\/[^\s]+$/
  },
  company: {
    name: String,
    catchPhrase: String,
    bs: String
  }
});

// Create User model
const UserModel = mongoose.model('User', userSchema);

// POST API to insert user data with validation
app.post('/users', async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.validate(); // Validate user data against schema
    await user.save(); // Save user data to MongoDB
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
