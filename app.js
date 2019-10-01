const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const machineRoutes = require('./api/routes/machine');
const productRoutes = require('./api/routes/product');


mongoose.connect('mongodb+srv://gotti:' + process.env.MONGO_ATLAS_PW + '@api-e5ndm.azure.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/machines', machineRoutes);
app.use('/products', productRoutes);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: { 
            message: error.message
        }
    });
});


module.exports = app;