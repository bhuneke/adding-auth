const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    amenities: {
        type: String,
        enum: ['playground', 'fountain', 'trails', 'dog-friendly']
    }
});

const Park = mongoose.model('Park', schema)
module.exports = Park;