import mongoose from "mongoose";

const BillSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Please select a valid Customer"],
    },
    gstCharge: {
      type: Number,
    },
    billDiscount: {
      type: Number,
    },
    grandTotal: {
      type: Number,
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    city: {
      type: String,
      required: [true, "Please provide City"],
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
