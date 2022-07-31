import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useEffect } from "react";

const AddCustomer = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    name,
    phone,
    city,
    comment,
    handleChange,
    clearValues,
    createCustomer,
    editCustomer,
  } = useAppContext();

  useEffect(() => {
    return () => {
      clearValues();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !city) {
      const alert = "Please provide the Customer Name, Phone and City";
      displayAlert(alert);
      return;
    }
    if (isEditing) {
      editCustomer();
      return;
    }
    createCustomer();
  };
  const handleCustomerInput = (e) => {
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
        <h3>{isEditing ? "edit customer" : "add customer"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            labelText="Name"
            required={true}
            value={name}
            handleChange={handleCustomerInput}
          />
          <FormRow
            type="number"
            name="phone"
            maxlength="10"
            labelText="Phone"
            required={true}
            value={phone}
            handleChange={handleCustomerInput}
          />
          <FormRow
            type="text"
            labelText="City"
            required={true}
            name="city"
            value={city}
            handleChange={handleCustomerInput}
          />
          <FormRow
            name="comment"
            type="text"
            labelText="Comment"
            value={comment}
            handleChange={handleCustomerInput}
          />
          {/* btn container */}
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
                clearValues();
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

export default AddCustomer;
