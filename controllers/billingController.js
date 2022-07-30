import Bill from "../models/Bill.js";
import Customer from "../models/Customer.js";

import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createBilling = async (req, res) => {
  const {
    billDate,
    billedCustomer,
    billingComment,
    billingTableData,
    billingType,
    phone,
    city,
    gstCharge,
    billDiscount,
    grandTotal,
  } = req.body;

  const billObj = {
    createdBy: req.user.userId,
    customerName: billedCustomer && billedCustomer.label,
    billDate: billDate,
    billType: billingType,
    comment: billingComment,
    billingTableData: billingTableData,
    phone: phone,
    city: city,
    grandTotal,
    billDiscount,
    gstCharge,
  };
  console.log("Request Body", req.body);
  req.body.createdBy = req.user.userId;
  const bill = await Bill.create(billObj);
  res.status(StatusCodes.CREATED).json({ bill });
};

const getAllBillings = async (req, res) => {
  const { billedCustomer, city, phone, billingType, fromDate, toDate, sort } =
    req.query;

  const billObj = {
    createdBy: req.user.userId,
    customerName: billedCustomer,
    fromDate: fromDate,
    toDate: toDate,
    billType: billingType,
    phone: phone,
    city: city,
  };
  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (billObj.customerName) {
    queryObject.customerName = billObj.customerName;
  }
  if (billObj.city) {
    queryObject.city = { $regex: billObj.city, $options: "i" };
  }
  if (billObj.phone) {
    queryObject.phone = { $regex: billObj.phone, $options: "i" };
  }
  if (billObj.billType) {
    queryObject.billType = billObj.billType;
  }

  queryObject.billDate = {
    $gte: new Date(new Date(billObj.fromDate).setHours(0)),
    $lt: new Date(new Date(billObj.toDate).setHours(23, 59, 59)),
  };

  // NO AWAIT

  let result = Bill.find(queryObject);

  // chain sort conditions

  if (sort === "Latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "Oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "Ascending") {
    result = result.sort("name");
  }
  if (sort === "Descending") {
    result = result.sort("-name");
  }

  //

  const bills = await result;

  const totalBills = await Bill.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ bills, totalBills });
};

const updateBilling = async (req, res) => {
  const { id: customerId } = req.params;
  const { name, phone } = req.body;

  if (!name || !phone) {
    throw new BadRequestError("Please provide all values");
  }
  const customer = await Customer.findOne({ _id: customerId });

  if (!customer) {
    throw new NotFoundError(`No Customer with id :${customerId}`);
  }
  // check permissions

  checkPermissions(req.user, customer.createdBy);

  const updatedCustomer = await Customer.findOneAndUpdate(
    { _id: customerId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedCustomer });
};

const deleteBilling = async (req, res) => {
  const { id: customerId } = req.params;

  const customer = await Customer.findOne({ _id: customerId });

  if (!customer) {
    throw new NotFoundError(`No customer with id :${customerId}`);
  }

  checkPermissions(req.user, customer.createdBy);

  await customer.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Customer removed" });
};

export { createBilling, deleteBilling, getAllBillings, updateBilling };
