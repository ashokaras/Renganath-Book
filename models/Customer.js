import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide Customer Name"],
      maxlength: 50,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Please provide Phone Number"],
      unique: true,
    },
    city: {
      type: String,
      maxlength: 25,
      default: "Sivakasi",
    },
    comment: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    createdByClient: {
      type: mongoose.Types.ObjectId,
      ref: "Client",
      required: [true, "Please provide Client ID"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);
