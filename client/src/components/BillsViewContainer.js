import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import { ReadOnyTable } from "../components";
import moment from "moment";

const BillsViewContainer = () => {
  const { isLoading, bills, getBills, searchSubmit, deleteBill, setEditBill } =
    useAppContext();

  useEffect(() => {
    getBills();
    // eslint-disable-next-line
  }, [searchSubmit]);

  console.log("Bills is ", bills);

  const billTableData =
    bills &&
    bills.map((bill) => {
      const newBill = {
        ...bill,
        id: bill._id,
        billDate: moment(bill.billDate).format("MM/DD/yyyy"),
        sysDate: moment(bill.createdAt).format("MM/DD/yyyy"),
        customerPhone: bill.phone,
        customerCity: bill.city,
        credit: 0,
        debit: 0,
      };

      if (bill.billlType === "Sales" || bill.billlType === "Purchase") {
        newBill["credit"] = bill.grandTotal;
      } else {
        newBill["debit"] = bill.grandTotal;
      }
      return newBill;
    });

  console.log("Bill Table Data is ", billTableData);

  const billTableColumns = [
    {
      id: "billDate",
      numeric: false,
      disablePadding: false,
      label: "Bill Date",
    },
    {
      id: "sysDate",
      numeric: false,
      disablePadding: false,
      label: "System Date",
    },
    {
      id: "customerName",
      numeric: false,
      disablePadding: false,
      label: "Customer Name",
    },
    {
      id: "billType",
      numeric: false,
      disablePadding: false,
      label: "Bill Type",
    },
    {
      id: "Phone",
      numeric: true,
      disablePadding: false,
      label: "Phone",
    },
    {
      id: "customerCity",
      numeric: false,
      disablePadding: false,
      label: "City",
    },
    {
      id: "Credit",
      numeric: true,
      disablePadding: false,
      label: "credit",
    },
    {
      id: "Debit",
      numeric: true,
      disablePadding: false,
      label: "debit",
    },
    {
      id: "action",
      disablePadding: false,
      label: "Actions",
      numeric: true,
    },
  ];

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <Wrapper>
      <ReadOnyTable
        headCells={billTableColumns}
        rows={billTableData}
        deleteBill={deleteBill}
        setEditBill={setEditBill}
      />
    </Wrapper>
  );
};

export default BillsViewContainer;
