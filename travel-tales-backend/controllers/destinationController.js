const Destination = require('../models/Destination');

// @desc    Create a new destination
// @route   POST /api/destinations
exports.createDestination = async (req, res) => {
  const { name, description, guides } = req.body;
  try {
    const newDestination = new Destination({
      name,
      description,
      guides
    });

    await newDestination.save();
    res.json(newDestination);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all destinations
// @route   GET /api/destinations
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get destination by ID
// @route   GET /api/destinations/:id
exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ msg: 'Destination not found' });
    }
    res.json(destination);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a destination
// @route   PUT /api/destinations/:id
exports.updateDestination = async (req, res) => {
  const { name, description, guides } = req.body;
  try {
    let destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ msg: 'Destination not found' });
    }

    destination.name = name;
    destination.description = description;
    destination.guides = guides;

    await destination.save();
    res.json(destination);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a destination
// @route   DELETE /api/destinations/:id
exports.deleteDestination = async (req, res) => {
  try {
    let destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ msg: 'Destination not found' });
    }

    await destination.remove();
    res.json({ msg: 'Destination removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
