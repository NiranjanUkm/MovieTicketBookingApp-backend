const TheatreModel = require('../../models/theatreSchema');
const CityModel = require('../../models/citySchema'); // Import the CityModel

exports.addTheatre = async (req, res) => {
    try {
        const data = req.body;
        console.log("These are the datas received:", data);

        if (!data || !data.ticketPrice || !data.city) {
            return res.status(400).json({ error: 'Please provide all fields!' });
        }

        const newTheater = new TheatreModel({
            name: data.name,
            city: data.city,
            ticketPrice: data.ticketPrice,
            beverage: data.beverage === 'true' || data.beverage === true,
            runningMovies: Array.isArray(data.runningMovies) ? data.runningMovies : [data.runningMovies]
        });

        const savedTheater = await newTheater.save();

        // Update the city to add the new theatre
        await CityModel.findByIdAndUpdate(data.city, { $push: { theatres: savedTheater._id } });

        res.status(201).json(savedTheater);
    } catch (error) {
        console.error("Error adding theater:", error);
        res.status(500).json({ error: 'Error saving theater!' });
    }
};


exports.getTheatre = async (req, res) => {
    try {
        const theaters = await TheatreModel.find({});
        res.json(theaters);
    } catch (error) {
        console.error("Error fetching theaters:", error);
        res.status(500).json({ error: 'Error fetching theaters!' });
    }
};
