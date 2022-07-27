import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: [true, "Please provide Customer Name"],
    },
    billDate: {
      type: Date,
      required: [true, "Please provide Bill Date"],
    },
    billType: {
      type: String,
      enum: ["Sales", "Purchase", "Recipt", "Payments"],
      required: [true, "Please provide Bill Type"],
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
  },
  { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);
