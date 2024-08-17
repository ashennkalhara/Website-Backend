import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }, // URL or filename, depending on your setup
}, {
    timestamps: true,
});

const Food = mongoose.model('Food', foodSchema);

export default Food;