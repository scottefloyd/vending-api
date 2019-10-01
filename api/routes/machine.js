const express = require('express');
const router = express.Router();
const machineController = require('../controllers/machine');
const Machine = require('../models/machine');

router.get('/', machineController.machines_get_all);

router.get('/:machineId', machineController.view_products_by_machine);

//router.get('/:machineId', );

router.post('/', machineController.add_machine);

router.post('/products/', machineController.add_product_to_machine);

router.put('/:machineId', );

router.delete('/:machineId', );



module.exports = router;