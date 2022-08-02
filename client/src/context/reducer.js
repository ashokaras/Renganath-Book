import {
  GET_CUSTOMERS_BEGIN,
  GET_CUSTOMERS_SUCCESS,
  GET_BILLS_BEGIN,
  GET_BILLS_SUCCESS,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CREATE_BILL_BEGIN,
  CREATE_BILL_SUCCESS,
  CREATE_BILL_ERROR,
  SET_EDIT_CUSTOMER,
  SET_EDIT_BILL,
  DELETE_CUSTOMER_BEGIN,
  CLEAR_FILTERS,
  ADD_BILLING_TABLE_DATA,
  CLEAR_CUSTOMER_FILTERS,
  CHANGE_PAGE,
  CREATE_CUSTOMER_BEGIN,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_ERROR,
  EDIT_CUSTOMER_BEGIN,
  EDIT_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_ERROR,
  UPDATE_BILLING_TABLE_DATA,
  HANDLE_SUBMIT_SEARCH,
  DELETE_CUSTOMER_ERROR,
  DELETE_BILL_BEGIN,
  DELETE_BILL_ERROR,
  EDIT_BILL_BEGIN,
  EDIT_BILL_SUCCESS,
  EDIT_BILL_ERROR,
} from "./actions";
import moment from "moment";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.alert,
    };
  }
  if (action.type === DELETE_BILL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "Something Went Wrong, Please try again letter!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === DELETE_CUSTOMER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      jobLocation: "",
      userLocation: "",
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === HANDLE_SUBMIT_SEARCH) {
    return {
      ...state,
      searchSubmit: !state.searchSubmit,
    };
  }

  if (action.type === ADD_BILLING_TABLE_DATA) {
    return { ...state, billingTableData: [...action.payload.billingTableData] };
  }
  if (action.type === UPDATE_BILLING_TABLE_DATA) {
    return {
      ...state,
      billingTableData: [...action.payload.newBillingTableData],
    };
  }
  if (action.type === CREATE_CUSTOMER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_BILL_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_CUSTOMER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Customer Created!",
    };
  }

  if (action.type === CREATE_BILL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Bill Created!",
    };
  }

  if (action.type === CREATE_CUSTOMER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === CREATE_BILL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_CUSTOMERS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_BILLS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_CUSTOMERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      customers: action.payload.customers,
      totalCustomers: action.payload.totalCustomers,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === GET_BILLS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      bills: action.payload.bills,
      totalBills: action.payload.totalBills,
    };
  }

  if (action.type === SET_EDIT_CUSTOMER) {
    const customer = state.customers.find(
      (customer) => customer._id === action.payload.id
    );
    const { _id, name, phone, city, comment } = customer;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      name,
      phone,
      city,
      comment,
    };
  }

  if (action.type === SET_EDIT_BILL) {
    const bill = state.bills.find((bill) => bill._id === action.payload.id);

    const {
      _id,
      billDate,
      billDiscount,
      billType,
      billingTableData,
      city,
      comment,
      customerName,
      gstCharge,
      grandTotal,
      phone,
      bank,
      cash,
      voucher,
    } = bill;
    console.log("voucher", voucher);
    const billedCustomer = { id: _id, label: customerName };
    const billingComment = comment;
    const billingType = billType;
    return {
      ...state,
      isEditing: true,
      editBillId: _id,
      billDiscount,
      billingType,
      billingTableData,
      city,
      billingComment,
      billedCustomer,
      gstCharge,
      phone,
      billDate,
      voucher,
      name: customerName,
      billBank: bank,
      billCash: cash,
      grandTotal,
    };
  }

  if (action.type === DELETE_CUSTOMER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === DELETE_BILL_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDIT_CUSTOMER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_BILL_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_CUSTOMER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Customer Updated!",
    };
  }
  if (action.type === EDIT_BILL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Bill Updated!",
    };
  }
  if (action.type === EDIT_CUSTOMER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === EDIT_BILL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }
  if (action.type === CLEAR_CUSTOMER_FILTERS) {
    console.log("Clear values");
    return {
      ...state,
      name: "",
      phone: "",
      city: "",
      sort: "Latest",
      searchSubmit: !state.searchSubmit,
      fromDate: moment().subtract(1, "month").format("MM/DD/yyyy"),
      toDate: moment().format("MM/DD/yyyy"),
      sysFromDate: moment().subtract(1, "month").format("MM/DD/yyyy"),
      sysToDate: moment().format("MM/DD/yyyy"),
      billingType: "",
      billingComment: "",
      billingTableData: [],
      billDate: moment().subtract(1, "month").format("MM/DD/yyyy"),
      billedCustomer: "",
      customer: [],
      comment: "",
      billBank: 0,
      billCash: 0,
      billDiscount: 0,
      gstCharge: 0,
      voucher: "",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
