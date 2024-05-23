
const express = require('express');
const destinationController = require('../controllers/destinationController'); // Make sure this path is correct
const router = express.Router();

// Define your routes
router.get('/', destinationController.getAllDestinations);
router.get('/:id', destinationController.getDestinationById);
router.post('/', destinationController.createDestination);
router.put('/:id', destinationController.updateDestination);
router.delete('/:id', destinationController.deleteDestination);

module.exports = router;
