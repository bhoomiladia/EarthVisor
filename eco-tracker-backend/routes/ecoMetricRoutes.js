const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const EcoMetric = require('../models/EcoMetric');

// POST /api/ecometrics - Add a new EcoMetric for a company
router.post('/', async (req, res) => {
    try {
      const { company, metricName, unit, targetValue, currentValue, historicalValues, description } = req.body;
  
      // Check if the company exists
      const companyExists = await Company.findById(company);
      if (!companyExists) {
        return res.status(400).json({ message: 'Company not found' });
      }
  
      // Create new EcoMetric
      const newMetric = new EcoMetric({
        company,
        metricName,
        unit,
        targetValue,
        currentValue,
        historicalValues,
        description
      });
  
      // Save the EcoMetric
      await newMetric.save();
      res.status(201).json(newMetric);
    } catch (error) {
      res.status(400).json({ message: 'Error creating EcoMetric', error });
    }
  });

  // GET /api/ecometrics/company/:companyId - Get EcoMetrics by Company ID
router.get('/company/:companyId', async (req, res) => {
    try {
      const ecoMetrics = await EcoMetric.find({ company: req.params.companyId }).populate('company', 'name location');
      if (ecoMetrics.length === 0) {
        return res.status(404).json({ message: 'No EcoMetrics found for this company' });
      }
      res.status(200).json(ecoMetrics);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching EcoMetrics for this company', error });
    }
  });
  
  
  module.exports = router;