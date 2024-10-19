const mongoose = require('mongoose');
const dotenv = require('dotenv');

const MONGO_URI="mongodb+srv://riteshbiswas:riteshbiswas@generaluse.sshpglb.mongodb.net/weatherDB30"

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;