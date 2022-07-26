import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !city) {
      displayAlert();
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
            value={name}
            handleChange={handleCustomerInput}
          />
          <FormRow
            type="number"
            name="phone"
            value={phone}
            handleChange={handleCustomerInput}
          />
          <FormRow
            type="text"
            labelText="City"
            name="city"
            value={city}
            handleChange={handleCustomerInput}
          />
          <FormRow
            name="comment"
            type="text"
            labelText="comment"
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
