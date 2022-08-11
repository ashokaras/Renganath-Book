import { FormRow, Alert } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useEffect } from "react";

const SearchProductsContainer = () => {
  const {
    isLoading,
    productName,
    unitsOfMeasure,
    showAlert,
    handleChange,
    clearValues,
    handleSubmitSearch,
    setHandleSubmitSearchtrue,
    isEditing,
    finishEditing,
  } = useAppContext();

  const fieldValues = {
    productName: "",
    unitsOfMeasure: "",
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
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmitProductSearch = (e) => {
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
        <h4>search Product</h4>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="text"
            name="productName"
            labelText="Product Name"
            required={true}
            value={productName || ""}
            handleChange={handleSearch}
          />
          <FormRow
            type="text"
            name="unitsOfMeasure"
            maxlength="10"
            labelText="Units Of Measure"
            required={true}
            value={unitsOfMeasure || ""}
            handleChange={handleSearch}
          />

          {/* search by status */}

          {/* search by type */}

          {/* sort */}

          <div className="btn-container">
            <button
              className="btn submit-btn"
              disabled={isLoading}
              onClick={handleSubmitProductSearch}
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

export default SearchProductsContainer;
