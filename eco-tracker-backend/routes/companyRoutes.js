const express = require('express');
const Company = require('../models/company');
const router = express.Router();
const Joi = require('joi');
const auth = require('../middleware/authMiddleware'); 

// Validation schema for company
const companySchema = Joi.object({
  name: Joi.string().min(3).required(),
  location: Joi.string().min(3).required(),
});

// POST - Add a new company with validation
router.post('/', auth, async (req, res) => {
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

// PUT - Update a company's details
router.put('/:id', auth, async (req, res) => {
  const { name, location } = req.body;
  const { error } = companySchema.validate({ name, location });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
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

// GET - Retrieve all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Delete a company by ID
router.delete('/:id', auth, async (req, res) => {
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
// Fetch company details with populated user data
router.get('/:companyId', async (req, res) => {
  try {
      const company = await Company.findById(req.params.companyId).populate('users', 'username email'); // Populate users with selected fields

      if (!company) {
          return res.status(404).json({ message: 'Company not found' });
      }

      res.json(company);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
