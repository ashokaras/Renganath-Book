import {
  FormRow,
  FormRowSelect,
  FormRowSelectAutoComplete,
  FormRowDatePicker,
  Alert,
} from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import { Loading } from "../components";
import React, { useEffect } from "react";
import moment from "moment";

const SearchBillContainer = () => {
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
    phone,
    user,
    voucher,
  } = useAppContext();

  const role = user && user.role;

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
  return (
    <Wrapper>
      {showAlert && <Alert />}

      {isLoading ? (
        <Loading center />
      ) : (
        <form className="form">
          <h4>search Entry</h4>
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
            <FormRow
              type="number"
              name="voucher"
              value={voucher}
              labelText="Voucher"
              handleChange={handleSearch}
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
            <div className="btn-container">
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
        </form>
      )}
    </Wrapper>
  );
};

export default SearchBillContainer;
