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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import rupeeicon from "../../assets/images/rupeeicon.svg";

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
    billDiscount,
    gstCharge,
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

  const handleSubmit = (e, phone, city) => {
    e.preventDefault();
    if (!billDate || !billedCustomer || !billingType) {
      displayAlert();
      return;
    }
    createBill(phone, city);
  };

  const handleBillingFormSubmit = (e, phone, city) => {
    handleSubmit(e, phone, city);
  };

  const handleSearch = (newValue) => {
    handleChange({ name: "billedCustomer", value: newValue });
  };

  const handleBillDate = (newValue) => {
    const newDate = moment(newValue).format("MM/DD/yyyy");
    handleChange({ name: "billDate", value: newDate });
  };

  const handleBillingForm = (e) => {
    console.log("Billing form", e.target);
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

  const calculateTotal = () => {
    console.log("calculateTotal", billingTableData);
    let tableTotal =
      billingTableData &&
      billingTableData
        .map((element) => {
          return parseFloat(element.total);
        })
        .reduce((partialSum, element) => partialSum + element, 0);
    return tableTotal + parseFloat(gstCharge) - parseFloat(billDiscount);
  };

  let grandTotal = calculateTotal();
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
                handleChange={handleBillingForm}
                value={phone || ""}
                disabled
              />
              <FormRow
                type="text"
                name="city"
                labelText="City"
                handleChange={handleBillingForm}
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

              <div>
                <Card sx={{ minHeight: 150 }} className="total-sum">
                  <CardContent className="card-content">
                    <div className="charges">
                      <div className="charge-label">Discount:</div>
                      <div className="charge-amount">
                        <img src={rupeeicon} />
                        <input
                          type="number"
                          name="billDiscount"
                          onChange={handleBillingForm}
                        />
                      </div>
                    </div>
                    <div className="charges">
                      <div className="charge-label">GST:</div>
                      <div className="charge-amount">
                        <img src={rupeeicon} />
                        <input
                          type="number"
                          name="gstCharge"
                          onChange={handleBillingForm}
                        />
                      </div>
                    </div>
                    <div className="charges">
                      <div className="charge-label">Grand Total:</div>
                      <div className="charge-amount">
                        <img src={rupeeicon} />
                        <input
                          type="number"
                          name="billTotal"
                          value={grandTotal || 0}
                          disabled
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* btn container */}
              <div className="btn-container">
                <button
                  type="submit"
                  className="btn btn-block submit-btn"
                  onClick={(e) => handleBillingFormSubmit(e, phone, city)}
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
