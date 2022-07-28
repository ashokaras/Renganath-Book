import { FormRow, FormRowSelect, FormRowSelectAutoComplete } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import Loading from "../components/Loading";
import React, { useEffect } from "react";

const SearchBillContainer = () => {
  const {
    isLoading,
    name,
    phone,
    city,
    sort,
    sortOptions,
    handleChange,
    clearCustomerFilters,
    getCustomers,
    customers,
    billedCustomer,
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

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleCustomerSearch = (newValue) => {
    handleChange({ name: "billedCustomer", value: newValue });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    clearCustomerFilters();
  };
  return (
    <Wrapper>
      {isLoading ? (
        <Loading center />
      ) : (
        <form className="form">
          <h4>search form</h4>
          <div className="form-center">
            {/* search position */}
            <FormRowSelectAutoComplete
              labelText="Customer"
              name="billedCustomer"
              handleChange={handleCustomerSearch}
              list={customerList}
              billedCustomer={billedCustomer}
            />
            <FormRow
              type="text"
              name="name"
              labelText="Name"
              value={name}
              handleChange={handleSearch}
            />
            <FormRow
              type="number"
              name="phone"
              labelText="Phone"
              value={phone}
              handleChange={handleSearch}
            />
            <FormRow
              type="text"
              name="city"
              labelText="City"
              value={city}
              handleChange={handleSearch}
            />
            {/* search by status */}

            {/* search by type */}

            {/* sort */}
            <FormRowSelect
              labelText="Sort"
              name="sort"
              value={sort}
              handleChange={handleSearch}
              list={sortOptions}
            />
            <button
              className="btn btn-block btn-danger"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              clear filters
            </button>
          </div>
        </form>
      )}
    </Wrapper>
  );
};

export default SearchBillContainer;
