const TheatreModel = require('../../models/theatreSchema');

exports.addTheatre = async (req, res) => {
    try {
        const data = req.body;

        if (!data) {
            return res.status(400).json({ error: 'Data not found!' });
        }

        const saveData = new TheatreModel(data);

        const existingTheatre = await TheatreModel.findOne({ name: data.name });
        if (existingTheatre) {
            return res.status(409).json({ error: 'Theatre with this name already exists' });
        }

        await saveData.save();  
        res.status(201).json({ message: 'Theatre data saved successfully' });

    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
}
