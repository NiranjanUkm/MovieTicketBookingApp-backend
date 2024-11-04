const CityModel = require('../../models/citySchema');

// Create a new city
exports.addCity = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.name) {
            return res.status(400).json({ error: 'City name is required' });
        }

        const newCity = new CityModel({
            name: data.name,
            description: data.description || '' // Assign default value if not provided
        });
        const savedCity = await newCity.save();
        res.status(201).json({ message: 'City added successfully', city: savedCity });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all cities
// Get all cities with associated theatres
exports.getCities = async (req, res) => {
    try {
        const cities = await CityModel.find().populate({
            path: 'theatres', // Field name to populate
            select: 'name' // Only retrieve the theatre name
            
        });
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get a city by ID
exports.getCityById = async (req, res) => {
    try {
        const cityId = req.params.id;
        const city = await CityModel.findById(cityId);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a city by ID
exports.updateCity = async (req, res) => {
    try {
        const cityId = req.params.id;
        const updates = req.body;

        const updatedCity = await CityModel.findByIdAndUpdate(cityId, updates, { new: true, runValidators: true });
        if (!updatedCity) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.status(200).json({ message: 'City updated successfully', city: updatedCity });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a city by ID
exports.deleteCity = async (req, res) => {
    try {
        const cityId = req.params.id;
        const deletedCity = await CityModel.findByIdAndDelete(cityId);
        if (!deletedCity) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.status(200).json({ message: 'City deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
