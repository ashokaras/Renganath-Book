import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useEffect } from "react";

const Product = () => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    productName,
    unitsOfMeasure,
    handleChange,
    clearValues,
    createProduct,
    editProduct,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !unitsOfMeasure) {
      const alert = "Please provide the Product Name and Unit of Measure";
      displayAlert(alert);
      return;
    }
    if (isEditing) {
      editProduct();
      return;
    }
    createProduct(fieldValues);
  };
  const handleProductInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "phone") {
      if (value.length > 10) {
        return;
      }
    }
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit product" : "add product"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="productName"
            labelText="Product Name"
            required={true}
            value={productName || ""}
            handleChange={handleProductInput}
          />
          <FormRow
            type="text"
            name="unitsOfMeasure"
            maxlength="10"
            labelText="Units Of Measure"
            required={true}
            value={unitsOfMeasure || ""}
            handleChange={handleProductInput}
          />

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues(fieldValues);
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Product;
