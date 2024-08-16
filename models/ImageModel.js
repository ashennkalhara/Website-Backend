import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    filePath: {
        type: String,
        required: true
    },
    // Add other fields if necessary (e.g., description, tags)
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
