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
    getCustomers,
    showAlert,
    billedCustomer,
    billingOptions,
    fromDate,
    toDate,
  } = useAppContext();

  useEffect(() => {
    getCustomers();
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
    if (isLoading) return;
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
          <h4>search Bill</h4>
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
              labelText="Phone"
              handleChange={handleSearch}
            />
            <FormRow
              type="text"
              name="city"
              labelText="City"
              handleChange={handleSearch}
            />
            <FormRowSelect
              labelText="Billing Type"
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
              labelText="From Date"
              value={fromDate}
              handleChange={handleFromDate}
            />
            <FormRowDatePicker
              name="toDate"
              labelText="To Date"
              value={toDate}
              handleChange={handleToDate}
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
