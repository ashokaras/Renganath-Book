import { BillsViewContainer, SearchBillContainer } from "../../components";
import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import moment from "moment";

const Report = () => {
  const fieldValues = {
    billedCustomer: "",
    phone: "",
    city: "",
    billingType: "",
    sort: "Latest",
    voucher: "",
    fromDate: moment().subtract(1, "month").format("MM/DD/yyyy"),
    toDate: moment().format("MM/DD/yyyy"),
    sysFromDate: moment().subtract(1, "month").format("MM/DD/yyyy"),
    sysToDate: moment().format("MM/DD/yyyy"),
    billStatusOptions: ["All", "Active", "Deleted"],
    billStatus: "Active",
    bills: [],
  };

  const { clearValues } = useAppContext();
  useEffect(() => {
    return () => {
      clearValues(fieldValues);
    };
  }, []);
  return (
    <div>
      <SearchBillContainer report="Customer Report" />
      <BillsViewContainer report="Customer Report" />
    </div>
  );
};

export default Report;
