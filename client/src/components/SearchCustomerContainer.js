import { FormRow, FormRowSelect, Alert } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useEffect } from "react";

const SearchCustomerContainer = () => {
  const {
    isLoading,
    name,
    phone,
    showAlert,
    city,
    sort,
    sortOptions,
    handleChange,
    clearValues,
    handleSubmitSearch,
    setHandleSubmitSearchtrue,
    isEditing,
    finishEditing,
  } = useAppContext();

  const fieldValues = {
    name: "",
    phone: "",
    city: "",
    sort: "Latest",
  };

  useEffect(() => {
    if (!isEditing) {
      clearValues(fieldValues);
    }
  }, [isEditing]);

  useEffect(() => {
    return () => {
      if (isEditing) {
        finishEditing();
      }
    };
  }, []);

  const handleSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "phone") {
      if (value.length > 10) {
        return;
      }
    }
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmitCustomerSearch = (e) => {
    e.preventDefault();
    handleSubmitSearch();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearValues(fieldValues);
    setHandleSubmitSearchtrue();
  };
  return (
    <Wrapper>
      {showAlert && <Alert />}

      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="text"
            name="name"
            labelText="Name"
            value={name || ""}
            handleChange={handleSearch}
          />
          <FormRow
            type="number"
            name="phone"
            labelText="Phone"
            value={phone || ""}
            handleChange={handleSearch}
          />
          <FormRow
            type="text"
            name="city"
            labelText="City"
            value={city || ""}
            handleChange={handleSearch}
          />
          {/* search by status */}

          {/* search by type */}

          {/* sort */}
          <FormRowSelect
            labelText="Sort"
            name="sort"
            value={sort || "Latest"}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <div className="btn-container">
            <button
              className="btn submit-btn"
              disabled={isLoading}
              onClick={handleSubmitCustomerSearch}
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
    </Wrapper>
  );
};

export default SearchCustomerContainer;
