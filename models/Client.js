import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Please provide Company Name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Please provide Phone Number"],
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Client", ClientSchema);
