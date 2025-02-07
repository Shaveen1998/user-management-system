const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Auth = require("./models/authModel");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
};

const seedDatabase = async () => {
  try {
    const existingAdmin = await Auth.findOne({ username: "haulmatic" });
    if (existingAdmin) {
      console.log("User already exists. Seeding skipped.");
      return;
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = new Auth({
      username: "haulmatic",
      password: hashedPassword,
    });

    await admin.save();
    console.log("User seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding the database", err);
    process.exit(1);
  }
};
connectDB();
seedDatabase();
