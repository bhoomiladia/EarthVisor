const mongoose = require('mongoose');

const DataEntrySchema = new mongoose.Schema({
  dataType: { type: String, required: true },
  value: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('DataEntry', DataEntrySchema);
