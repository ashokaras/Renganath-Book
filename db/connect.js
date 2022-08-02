import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url, { autoIndex: true });
};

export default connectDB;
