const mongoose = require('mongoose');

const ProgressUpdateSchema = new mongoose.Schema({
  ecoMetric: { type: mongoose.Schema.Types.ObjectId, ref: 'EcoMetric', required: true },
  value: { type: Number, required: true }, // Recorded metric value
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ProgressUpdate', ProgressUpdateSchema);
