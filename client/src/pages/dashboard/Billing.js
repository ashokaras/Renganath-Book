import {
  FormRow,
  FormRowSelectAutoComplete,
  Alert,
  FormRowSelect,
  FormRowTextArea,
  FormRowDatePicker,
  BillingTable,
} from "../../components";
import { useAppContext } from "../../context/appContext";
import { Loading } from "../../components/";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useEffect } from "react";
import moment from "moment";

const Billing = () => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    handleChange,
    customers,
    getCustomers,
    billedCustomer,
    clearValues,
    billingOptions,
    billingType,
    billDate,
    billingTableData,
    addBillingDataRow,
    handleDeleteRowBillingData,
    handleSaveRowBillingData,
    createBill,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handle Submit", billDate);
    console.log("Handle Submit", billedCustomer);

    console.log("Handle Submit", billingType);

    if (!billDate || !billedCustomer || !billingType) {
      displayAlert();
      return;
    }
    createBill();
  };

  const handleSearch = (newValue) => {
    handleChange({ name: "billedCustomer", value: newValue });
  };

  const handleBillDate = (newValue) => {
    const newDate = moment(newValue).format("MM/DD/yyyy");
    handleChange({ name: "billDate", value: newDate });
  };

  const handleBillingForm = (e) => {
    console.log("Billing type", e.target);
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const phoneArray =
    customers &&
    billedCustomer &&
    customers.filter((customer) => {
      return customer.name === billedCustomer.label;
    });

  const phone = phoneArray && phoneArray[0] && phoneArray[0]["phone"];

  const cityArray =
    customers &&
    billedCustomer &&
    customers.filter((customer) => {
      return customer.name === billedCustomer.label;
    });

  const city = cityArray && cityArray[0] && cityArray[0]["city"];

  console.log("Bill date is ", billDate);

  return (
    <Wrapper>
      <>
        {isLoading ? (
          <Loading center />
        ) : (
          <form className="form">
            <h3>Billings</h3>
            {showAlert && <Alert />}
            <div className="form-center">
              <FormRowSelectAutoComplete
                labelText="Customer"
                name="billedCustomer"
                handleChange={handleSearch}
                list={customerList}
                billedCustomer={billedCustomer}
              />
              <FormRow
                type="text"
                name="phone"
                labelText="Phone"
                value={phone || ""}
                disabled
              />
              <FormRow
                type="text"
                name="city"
                labelText="City"
                value={city || ""}
                disabled
              />
              <FormRowSelect
                labelText="Billing Type"
                name="billingType"
                value={billingType}
                handleChange={handleBillingForm}
                list={billingOptions}
              />
              <FormRowDatePicker
                name="billDate"
                labelText="Bill Date"
                value={billDate}
                handleChange={handleBillDate}
              />

              <div className="text-area">
                <FormRowTextArea
                  type="text"
                  name="billingComment"
                  labelText="Please provide your Comment here ... "
                  handleChange={handleBillingForm}
                />
              </div>
              <div className="table">
                <BillingTable
                  billingTableData={billingTableData}
                  addBillingDataRow={addBillingDataRow}
                  handleDeleteRowBillingData={handleDeleteRowBillingData}
                  handleSaveRowBillingData={handleSaveRowBillingData}
                />
              </div>

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
        )}
      </>
    </Wrapper>
  );
};

export default Billing;
