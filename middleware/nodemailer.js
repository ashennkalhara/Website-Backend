import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_APP_PASS,
    },
});

const sendReservationAccepted = (to, reservation, formattedDate) => {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: to,
        subject: 'Reservation Status Update',
        text: `Dear ${reservation.name}, your reservation for ${formattedDate} at ${reservation.time} has been ${reservation.status}.`, // Use reservation.status dynamically
    };

    return transporter.sendMail(mailOptions);
}

export { sendReservationAccepted };
