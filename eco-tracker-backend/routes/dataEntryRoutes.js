const express = require('express');
const router = express.Router();
const DataEntry = require('../models/DataEntry'); // Define DataEntry schema
const auth = require('../middleware/authMiddleware'); // Authorization middleware

// POST route for data entry
router.post('/data-entry', auth, async (req, res) => {
  const { dataType, value, timestamp } = req.body;
  // const { company } = req.user;

  try {
    const entry = new DataEntry({
      dataType,
      value,
      timestamp,
      company,
      // user: req.user._id,
    });
    await entry.save();
    res.status(201).json({ message: 'Data entry saved successfully', entry });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save data entry', error });
  }
});

// GET route for fetching data entries
router.get('/data', auth, async (req, res) => {
  try {
    const data = await DataEntry.find({ company: req.user.company });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve data', error });
  }
});

module.exports = router;
