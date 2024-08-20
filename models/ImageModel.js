import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    filePath: {
        type: String,
        required: true
    },
    
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
