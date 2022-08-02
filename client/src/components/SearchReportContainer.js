import {
  FormRow,
  FormRowSelect,
  FormRowSelectAutoComplete,
  FormRowDatePicker,
  Alert,
  Loading,
} from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchReportContiner";
import React, { useEffect } from "react";
import moment from "moment";
import Typography from "@mui/material/Typography";

const SearchReportContainer = () => {
  const {
    isLoading,
    sort,
    sortOptions,
    handleChange,
    clearCustomerFilters,
    handleSubmitSearch,
    customers,
    getAllCustomers,
    showAlert,
    billedCustomer,
    billingOptions,
    fromDate,
    toDate,
    sysFromDate,
    sysToDate,
    bills,
    phone,
  } = useAppContext();

  useEffect(() => {
    clearCustomerFilters();
    getAllCustomers();
  }, []);

  const customerList =
    (customers &&
      customers.map((customer) => {
        return { id: customer._id, label: customer.name };
      })) ||
    [];

  const handleCustomerSearch = (newValue) => {
    handleChange({ name: "billedCustomer", value: newValue });
  };

  const handleSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (isLoading) return;
    if (name === "phone") {
      if (value.length > 10) {
        console.log("Greater than 10");
        return;
      }
    }

    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleFromDate = (newValue) => {
    const newDate = moment(newValue).format("MM/DD/yyyy");
    handleChange({ name: "fromDate", value: newDate });
  };

  const handleToDate = (newValue) => {
    const newDate = moment(newValue).format("MM/DD/yyyy");
    handleChange({ name: "toDate", value: newDate });
  };

  const handleSysFromDate = (newValue) => {
    const newDate = moment(newValue).format("MM/DD/yyyy");
    handleChange({ name: "sysFromDate", value: newDate });
  };

  const handleSysToDate = (newValue) => {
    const newDate = moment(newValue).format("MM/DD/yyyy");
    handleChange({ name: "sysToDate", value: newDate });
  };

  const handleSubmitBillSearch = (e) => {
    e.preventDefault();
    handleSubmitSearch();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCustomerFilters();
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

  let totalSales = bills && calcTotal("Sales", bills);
  let totoalPurchase = bills && calcTotal("Purchase", bills);
  let totalReciept = bills && calcTotal("Reciept", bills);
  let totalPayments = bills && calcTotal("Payments", bills);

  return (
    <Wrapper>
      {showAlert && <Alert />}

      {isLoading ? (
        <Loading center />
      ) : (
        <form className="form">
          <div className="doNotPrint">
            <h4 className="doNotPrint">search Entry</h4>
            <h4 className="printOnly">Report</h4>

            <div className="form-center">
              <FormRowSelectAutoComplete
                labelText="Customer"
                name="billedCustomer"
                handleChange={handleCustomerSearch}
                list={customerList}
                billedCustomer={billedCustomer}
              />
              <FormRow
                type="number"
                name="phone"
                maxlength="10"
                labelText="Phone"
                value={phone}
                handleChange={handleSearch}
              />
              <FormRow
                type="text"
                name="city"
                labelText="City"
                handleChange={handleSearch}
              />
              <FormRowSelect
                labelText="Entry Type"
                name="billingType"
                handleChange={handleSearch}
                list={billingOptions}
              />
              <FormRowSelect
                labelText="Sort"
                name="sort"
                value={sort}
                handleChange={handleSearch}
                list={sortOptions}
              />
              <FormRowDatePicker
                name="fromDate"
                labelText="Entry From Date"
                value={fromDate}
                handleChange={handleFromDate}
              />
              <FormRowDatePicker
                name="toDate"
                labelText="Entry To Date"
                value={toDate}
                handleChange={handleToDate}
              />
              <FormRowDatePicker
                name="sysFromDate"
                labelText="System From Date"
                value={sysFromDate}
                handleChange={handleSysFromDate}
              />
              <FormRowDatePicker
                name="sysToDate"
                labelText="System To Date"
                value={sysToDate}
                handleChange={handleSysToDate}
              />
              <div className="btn-container doNotPrint">
                <button
                  className="btn submit-btn"
                  disabled={isLoading}
                  onClick={handleSubmitBillSearch}
                >
                  Submit
                </button>
                <button
                  className="btn btn-danger"
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  clear filters
                </button>
              </div>
            </div>
          </div>
          <div className="printOnly">
            <Typography variant="h5" gutterBottom component="div">
              Summary
            </Typography>
            <Typography
              style={{ float: "right" }}
              variant="h7"
              gutterBottom
              component="div"
            >
              Date: {fromDate} - {toDate}
            </Typography>
            <Typography variant="h7" gutterBottom component="div">
              Name: {billedCustomer && billedCustomer.label}
            </Typography>
            {/* <Typography variant="h7" gutterBottom component="div">
              Phone:{phone}
            </Typography>
            <Typography variant="h7" gutterBottom component="div">
              City: {city}
            </Typography> */}

            <Typography variant="h7" gutterBottom component="div">
              Total Sales: {totalSales ? totalSales : 0}
            </Typography>
            <Typography variant="h7" gutterBottom component="div">
              Total Purchase: {totoalPurchase ? totoalPurchase : 0}
            </Typography>
            <Typography variant="h7" gutterBottom component="div">
              Total Reciept: {totalReciept ? totalReciept : 0}
            </Typography>
            <Typography variant="h7" gutterBottom component="div">
              Total Payments: {totalPayments ? totalPayments : 0}
            </Typography>
          </div>
        </form>
      )}
    </Wrapper>
  );
};

export default SearchReportContainer;
