import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: {
    type: String,
    default: "Pending"
  },
  email: {
    type: String,
    required: true
  }
});

const Reservation = mongoose.model('Reservation', ReservationSchema);
export default Reservation;
