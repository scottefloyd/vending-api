'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
    _id: Schema.Types.ObjectId,
    brand: String,
    model: String,
    category: String,
    date_created: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Product', productSchema);