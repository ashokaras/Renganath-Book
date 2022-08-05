import { BillsViewContainer, SearchBillContainer } from "../../components";

const Report = () => {
  return (
    <div>
      <SearchBillContainer report="Customer Report" />
      <BillsViewContainer report="Customer Report" />
    </div>
  );
};

export default Report;
