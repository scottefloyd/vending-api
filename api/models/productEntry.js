'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productEntrySchema = Schema({
    _id: Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    machine: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine', required: true },
    quantity: Number
});


module.exports = mongoose.model('ProductEntry', productEntrySchema);