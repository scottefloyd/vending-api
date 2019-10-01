
const Product = require("../models/product");
const Machine = require("../models/machine");
const ProductEntry = require("../models/productEntry");
const mongoose = require("mongoose");

exports.machines_get_all = (req, res, next) => {
  Machine.find()
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        machines: docs.map(doc => {
          return {
            _id: doc._id,
            products: doc.products,
            products: doc.products.map(product => {
              if (product) {
                return {
                  brand: product.brand,
                  model: product.model,
                  category: product.category
                };
              }
            }),
            created_date: doc.created_date
          };
        })
      });
    });
};

exports.add_machine = (req, res, next) => {
  const machine = new Machine({
    _id: new mongoose.Types.ObjectId(),
    location: req.body.location
  });
  machine
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created product successfully",
        createdMachine: {
          location: result.location,
          _id: result._id,
          request: {
            type: "GET",
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

exports.add_product_to_machine = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      } else if (Machine.find)
      const entry = new ProductEntry({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        machine: req.body.machineId,
        quantity: req.body.quantity
      });
      return entry.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          machine: result.machine,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/machines/product/" + result._id
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

exports.view_products_by_machine = (req, res, next) => {
  ProductEntry.find({'machine': `${req.params.machineId}`})
    .populate('product')
    .then(inventory => {
      if (!inventory) {
        return res.status(404).json({
            message: "No inventory found"
          });
      }
      res.status(200).json({
            results: inventory.map(inventory => {
              return {
                id: inventory.product._id,
                brand: inventory.product.brand,
                model: inventory.product.model,
                category: inventory.product.category,
                quantity: inventory.quantity
              }
            })
          });
    });
};
