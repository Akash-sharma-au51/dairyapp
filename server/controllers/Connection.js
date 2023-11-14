
const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/dairyapp"

const connect = async () => {
  try {
    await mongoose.connect(url)
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

module.exports = connect;
