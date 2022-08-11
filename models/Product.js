import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Please provide product Name "],
      maxlength: 50,
      unique: true,
    },
    unitsOfMeasure: {
      type: String,
      required: [true, "Please provide Units of Measure"],
      unique: true,
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

export default mongoose.model("Product", ProductSchema);
