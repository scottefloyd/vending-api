'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const machineSchema = Schema({
    _id: Schema.Types.ObjectId,
    location: String,
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    created_date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Machine', machineSchema);