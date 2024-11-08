const express = require('express');
const router = express.Router();
const EcoMetric = require('../models/EcoMetric');

// POST /api/ecometrics - Add a new EcoMetric
router.post('/', async (req, res) => {
  try {
    const { company, metricName, unit, targetValue, currentValue, historicalValues, description } = req.body;

    const newMetric = new EcoMetric({
      company,
      metricName,
      unit,
      targetValue,
      currentValue,
      historicalValues,
      description
    });

    await newMetric.save();
    res.status(201).json(newMetric);
  } catch (error) {
    res.status(400).json({ message: 'Error creating EcoMetric', error });
  }
});

module.exports = router;
