const mongoose = require('mongoose');

const EcoMetricSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  metricName: { type: String, required: true }, // E.g., CO2 emissions, fuel efficiency
  unit: { type: String, required: true }, // E.g., kg, liters, etc.
  targetValue: { type: Number }, // Optional target for the metric
  currentValue: { type: Number }, // Current measured value for the metric
  historicalValues: [
    {
      value: { type: Number },
      date: { type: Date, default: Date.now }
    }
  ],
  description: { type: String }, // Optional description of the metric
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EcoMetric', EcoMetricSchema);
