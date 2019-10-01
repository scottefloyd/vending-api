const Product = require("../models/product");
const mongoose = require('mongoose');


exports.get_all_products = (req, res, next) => {
    Product.find()
        .select('brand model category date_created _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        brand: doc.brand,
                        model: doc.model,
                        category: doc.category,
                        date_created: doc.date_created,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });

        });
};

exports.get_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('brand model category date_created _id')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    message: 'check out this awesome product',
                    Product: doc,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/products/" + doc._id
                    }
                });
            } else {
                res.status(404).json({ message: "no valide entry found for ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.update_product = (req, res, next) => {
    console.log(req.body);
    
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        console.log(updateOps[ops.propName]);
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, { $set: updateOps})
       .exec()
       .then(result => {
           res.status(200).json({
               message: 'Product updated',
               request: {
                   type: 'GET',
                   url: 'http://localhost:3000/products/' + id
               }
           });
       })
       .catch(err => {
           console.log(err);
           res.status(500).json({
               error: err
           });
       });
  };

exports.add_product = (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        brand: req.body.brand,
        model: req.body.model,
        category: req.body.category
    });
    product.save()
        .then(result => {

            res.status(201).json({
                message: 'Created product successfully',
                createdProduct: {
                    brand: result.brand,
                    model: result.model,
                    category: result.category,
                    _id: result._id,
                    date_created: result.date_created,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/products/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.delete_product = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/products',
                data: {Brand: 'String', Model: 'String'}
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
  };