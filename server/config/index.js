const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/chatbot", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to Mongoose");
  } catch (error) {
    console.log(error);
  }
}
module.exports = { connect };
