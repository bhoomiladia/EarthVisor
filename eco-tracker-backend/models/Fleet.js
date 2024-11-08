const mongoose = require('mongoose');

const FleetSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  vehicleType: { type: String, required: true },
  fuelType: { type: String, required: true }, // E.g., diesel, electric, hybrid
  licensePlate: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Fleet', FleetSchema);
