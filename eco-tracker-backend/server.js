
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const companyRoutes = require('./routes/companyRoutes');
const authRoutes = require('./routes/authRoutes'); // Import the auth routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use('/api/companies', companyRoutes);
app.use('/api/auth', authRoutes);
// Simple Route
app.get('/', (req, res) => {
  res.send('Eco Tracker API is running');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => console.log(error.message));

