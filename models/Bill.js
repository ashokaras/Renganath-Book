import mongoose from "mongoose";

const BillSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: [true, "Please select a valid Customer"],
    },
    billDate: {
      type: Date,
      required: [true, "Please provide the Bill Date"],
    },
    billType: {
      type: String,
      enum: ["Sales", "Purchase", "Recipt", "Payments"],
      required: [true, "Please provide the Bill Type"],
    },
    comment: {
      type: String,
      default: "",
    },
    billingTableData: {
      type: [
        {
          id: String,
          price: Number,
          productName: String,
          quantity: Number,
          total: Number,
          unitsOfMeasurement: String,
        },
      ],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bill", BillSchema);
