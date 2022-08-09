import Bill from "../models/Bill.js";

import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createBilling = async (req, res) => {
  const {
    billDate,
    cash,
    bank,
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
    createdByClient: req.user.client,
    updatedBy: req.user.userId,
    createdBy: req.user.userId,
    customerName: billedCustomer && billedCustomer.label,
    billDate: billDate,
    billType: billingType,
    comment: billingComment,
    billingTableData: billingTableData,
    phone: phone,
    city: city,
    grandTotal: grandTotal || 0,
    billDiscount: billDiscount || 0,
    gstCharge: gstCharge || 0,
    bank: bank || 0,
    cash: cash || 0,
  };

  const bill = await Bill.create(billObj);
  res.status(StatusCodes.CREATED).json({ bill });
};

const calcTotal = (billType, bills) => {
  return (
    bills &&
    bills
      .filter((bill) => bill.billType === billType)
      .map((bill) => bill.grandTotal)
      .reduce((prevValue, currValue) => prevValue + currValue, 0)
  );
};

const getAllBillings = async (req, res) => {
  const {
    billedCustomer,
    city,
    phone,
    billingType,
    fromDate,
    toDate,
    sort,
    sysFromDate,
    sysToDate,
    voucher,
    status,
    createdBy,
  } = req.query;

  const billObj = {
    createdByClient: req.user.client,
    createdBy: req.user.userId,
    customerName: billedCustomer,
    fromDate: fromDate,
    toDate: toDate,
    billType: billingType,
    phone: phone,
    city: city,
    sysFromDate,
    sysToDate,
    voucher,
  };

  let queryObjectForOpeningBal = {};

  let queryObject = {};
  if (status !== "All") {
    queryObject = {
      createdByClient: req.user.client,
      status: status,
    };
    queryObjectForOpeningBal = {
      createdByClient: req.user.client,
      status: status,
    };
  } else {
    queryObject = {
      createdByClient: req.user.client,
    };
    queryObjectForOpeningBal = {
      createdByClient: req.user.client,
    };
  }

  // add stuff based on condition

  if (billObj.customerName && billObj.customerName !== "undefined") {
    queryObject.customerName = billObj.customerName;
    queryObjectForOpeningBal.customerName = billObj.customerName;
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
  if (billObj.voucher) {
    queryObject.voucher = billObj.voucher;
  }

  queryObjectForOpeningBal.billDate = {
    $lt: new Date(new Date(billObj.fromDate).setHours(0)),
  };

  queryObject.billDate = {
    $gte: new Date(new Date(billObj.fromDate).setHours(0)),
    $lt: new Date(new Date(billObj.toDate).setHours(23, 59, 59)),
  };
  queryObject.createdAt = {
    $gte: new Date(new Date(billObj.sysFromDate).setHours(0)),
    $lt: new Date(new Date(billObj.sysToDate).setHours(23, 59, 59)),
  };

  // NO AWAIT

  let result = Bill.find(queryObject).populate("createdBy");

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

  let bills = await result;

  if (createdBy && createdBy !== "") {
    bills = bills.filter((bill) => bill.createdBy.email === createdBy);
  }

  const totalBills = bills.length;
  let openingBalance;
  let openingBalanceType;

  if (billObj.customerName && billObj.customerName !== "undefined") {
    const beforeBalance = await Bill.find(queryObjectForOpeningBal);
    const totalSalesBefore = beforeBalance && calcTotal("Sales", beforeBalance);
    const totoalPurchaseBefore =
      beforeBalance && calcTotal("Purchase", beforeBalance);
    const totalRecieptBefore =
      beforeBalance && calcTotal("Reciept", beforeBalance);
    const totalPaymentsBefore =
      beforeBalance && calcTotal("Payments", beforeBalance);

    openingBalance =
      totalSalesBefore +
      totalPaymentsBefore -
      (totalRecieptBefore + totoalPurchaseBefore);
    openingBalanceType = openingBalance > 0 ? "debit" : "credit";
  }

  res
    .status(StatusCodes.OK)
    .json({ bills, totalBills, openingBalanceType, openingBalance });
};

const updateBilling = async (req, res) => {
  const { id: billId } = req.params;
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
    cash,
    bank,
  } = req.body;

  const billObj = {
    updatedBy: req.user.userId,
    createdByClient: req.user.client,
    customerName: billedCustomer && billedCustomer.label,
    billDate: billDate,
    billType: billingType,
    comment: billingComment,
    billingTableData: billingTableData,
    phone: phone,
    city: city,
    grandTotal: grandTotal || 0,
    billDiscount: billDiscount || 0,
    gstCharge: gstCharge || 0,
    bank: bank || 0,
    cash: cash || 0,
  };

  const bill = await Bill.findOne({ _id: billId });

  if (!bill) {
    throw new NotFoundError(`No Entry found with id :${billId}`);
  }
  // check permissions

  checkPermissions(req.user.client, bill.createdByClient);

  const updatedBill = await Bill.findOneAndUpdate({ _id: billId }, billObj, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedBill });
};

const deleteBilling = async (req, res) => {
  const { id: billId } = req.params;

  const bill = await Bill.findOne({ _id: billId });

  if (!bill) {
    throw new NotFoundError(`No bills with id :${billId}`);
  }

  checkPermissions(req.user.client, bill.createdByClient);

  await Bill.findOneAndUpdate(
    { _id: billId },
    { $set: { status: "Deleted" } },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ msg: "Success! Bill removed" });
};

export { createBilling, deleteBilling, getAllBillings, updateBilling };
