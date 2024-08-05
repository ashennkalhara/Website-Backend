import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGO_CONNECTION)

mongoose.connect(
    process.env.MONGO_CONNECTION
).then(() => {
    console.log("Connected")
}).catch((err) => {
    console.log("Failed",err)
})

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
