const express = require('express');
const Company = require('../models/company');
const router = express.Router();
const Joi = require('joi');
const auth = require('../middleware/authMiddleware'); 

const companySchema = Joi.object({
  name: Joi.string().min(3).required(),
  location: Joi.string().min(3).required(),
});

// Add a company route with validation
router.post('/', async (req, res) => {
  // Validate request body
  const { error } = companySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new company
router.post('/', async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// PUT - Update a company's details
router.put('/:id', async (req, res) => {
    const { name, location } = req.body;
    
    // Validate input data
    if (!name || !location) {
      return res.status(400).json({ error: 'Name and location are required' });
    }
  
    try {
      const company = await Company.findByIdAndUpdate(
        req.params.id,
        { name, location },
        { new: true }
      );
      
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
      
      res.status(200).json(company);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Get all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// DELETE a company by ID
router.delete('/:id', async (req, res) => {
    try {
      const company = await Company.findByIdAndDelete(req.params.id);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.status(200).json({ message: "Company deleted successfully", company });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;
