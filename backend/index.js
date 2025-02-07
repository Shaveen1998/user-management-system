const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoute");

dotenv.config();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
};

app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server running on port ${process.env.PORT}`);
});
