require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dataRoutes = require('./routes/dataEntryRoutes'); // Data routes file
const app = express();
const userRoutes = require('./routes/authRoutes');
app.use('/api/users', userRoutes);
app.use('/api/data-entry', dataRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/ecometrics', require('./routes/ecoMetricRoutes'));


// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)))
  .catch(err => console.error('Database connection error:', err));
