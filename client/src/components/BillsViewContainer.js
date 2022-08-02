import { useAppContext } from "../context/appContext";
import { useEffect, forwardRef, useRef } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import { ReadOnyTable } from "../components";
import moment from "moment";
import { useReactToPrint } from "react-to-print";

const BillsViewContainer = forwardRef((props, ref) => {
  const {
    isLoading,
    bills,
    getBills,
    searchSubmit,
    deleteBill,
    setEditBill,
    user,
    clearCustomerFilters,
    isEditing,
  } = useAppContext();

  const role = user && user.role;

  useEffect(() => {
    getBills();
    // eslint-disable-next-line
  }, [searchSubmit]);

  const componentRef = useRef();

  const handlePrintMain = (e) => {
    e.preventDefault();
    handlePrint();
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
      console.log("bill.billType", bill.billType);
      if (bill.billType === "Sales" || bill.billType === "Payments") {
        newBill["debit"] = bill.grandTotal;
      } else {
        newBill["credit"] = bill.grandTotal;
      }
      return newBill;
    });

  console.log("Bill Table Data is ", billTableData);

  const billTableColumns = [
    {
      id: "billDate",
      numeric: false,
      disablePadding: false,
      label: "Entry Date",
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
      label: "Entry Type",
    },
    {
      id: "voucher",
      numeric: true,
      disablePadding: false,
      label: "Voucher",
    },
    {
      id: "phone",
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
      id: "debit",
      numeric: true,
      disablePadding: false,
      label: "Debit",
    },
    {
      id: "credit",
      numeric: true,
      disablePadding: false,
      label: "Credit",
    },

    {
      id: "sysDate",
      numeric: false,
      disablePadding: false,
      label: "System Date",
    },
    {
      id: "action",
      disablePadding: false,
      label: "Actions",
      numeric: true,
    },
  ];

  const billTableColumnsPrint = [
    {
      id: "billDate",
      numeric: false,
      disablePadding: false,
      label: "Entry Date",
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
      label: "Entry Type",
    },
    {
      id: "voucher",
      numeric: true,
      disablePadding: false,
      label: "Voucher",
    },
    {
      id: "customerCity",
      numeric: false,
      disablePadding: false,
      label: "City",
    },
    {
      id: "debit",
      numeric: true,
      disablePadding: false,
      label: "Debit",
    },
    {
      id: "credit",
      numeric: true,
      disablePadding: false,
      label: "Credit",
    },
    {
      id: "sysDate",
      numeric: false,
      disablePadding: false,
      label: "System Date",
    },
  ];

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <div ref={componentRef}>
      <Wrapper>
        <ReadOnyTable
          billTableColumnsPrint={billTableColumnsPrint}
          headCells={billTableColumns}
          rows={billTableData}
          deleteBill={deleteBill}
          setEditBill={setEditBill}
          handlePrintMain={handlePrintMain}
          role={role}
        />
      </Wrapper>
    </div>
  );
});

export default BillsViewContainer;
