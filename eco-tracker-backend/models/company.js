const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Link users to company
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', CompanySchema);
