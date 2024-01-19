require('dotenv').config();
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;


async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB Instance');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
}

connectToMongoDB();

module.exports = mongoose;