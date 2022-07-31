import React, { useReducer, useContext } from "react";
import moment from "moment";
import { nanoid } from "nanoid";
import reducer from "./reducer";
import axios from "axios";
import {
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
  HANDLE_CUSTOMER_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  CREATE_CUSTOMER_BEGIN,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_ERROR,
  CREATE_BILL_BEGIN,
  CREATE_BILL_SUCCESS,
  CREATE_BILL_ERROR,
  GET_JOBS_BEGIN,
  ADD_BILLING_TABLE_DATA,
  GET_JOBS_SUCCESS,
  GET_CUSTOMERS_BEGIN,
  GET_CUSTOMERS_SUCCESS,
  SET_EDIT_JOB,
  SET_EDIT_CUSTOMER,
  DELETE_JOB_BEGIN,
  DELETE_CUSTOMER_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  EDIT_CUSTOMER_BEGIN,
  EDIT_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_CUSTOMER_FILTERS,
  UPDATE_BILLING_TABLE_DATA,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  HANDLE_SUBMIT_SEARCH,
  GET_BILLS_BEGIN,
  GET_BILLS_SUCCESS,
  DELETE_BILL_BEGIN,
  DELETE_BILL_ERROR,
  SET_EDIT_BILL,
  EDIT_BILL_BEGIN,
  EDIT_BILL_SUCCESS,
  EDIT_BILL_ERROR,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: userLocation || "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobs: [],
  customers: [],
  totalJobs: 0,
  totalCustomers: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "Latest",
  sortOptions: ["Latest", "Oldest", "Ascending", "Descending"],
  billingOptions: ["Sales", "Purchase", "Recipt", "Payments"],
  billingType: "",
  billingComment: "",
  billingTableData: [],
  billDate: moment().format("MM/DD/yyyy"),
  name: "",
  phone: "",
  comment: "",
  city: "",
  searchSubmit: false,
  fromDate: moment().subtract(1, "month").format("MM/DD/yyyy"),
  toDate: moment().format("MM/DD/yyyy"),
  gstCharge: 0,
  billDiscount: 0,
  bills: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = (alert = "Please provide all the required input !") => {
    console.log("Alert is", alert);
    dispatch({ type: DISPLAY_ALERT, payload: { alert } });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 7000);
  };

  const handleSubmitSearch = () => {
    dispatch({ type: HANDLE_SUBMIT_SEARCH });
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const createBillingDataObj = (
    productName,
    unitsOfMeasurement,
    quantity,
    price,
    total
  ) => {
    return {
      id: nanoid(),
      productName,
      unitsOfMeasurement,
      quantity,
      price,
      total,
    };
  };

  const addBillingDataRow = (billingTableData) => {
    const newRow = createBillingDataObj("", "", "0", "0", "0");
    billingTableData.push(newRow);
    dispatch({ type: ADD_BILLING_TABLE_DATA, payload: { billingTableData } });
  };

  const handleCustomerChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CUSTOMER_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const createCustomer = async () => {
    dispatch({ type: CREATE_CUSTOMER_BEGIN });
    try {
      const { name, phone, city, comment } = state;
      await authFetch.post("/customers", {
        name,
        phone,
        city,
        comment,
      });
      dispatch({ type: CREATE_CUSTOMER_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_CUSTOMER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const calculateTotal = (billingTableData, gstCharge, billDiscount) => {
    const tableTotal =
      billingTableData &&
      billingTableData
        .map((element) => {
          return parseFloat(element.total);
        })
        .reduce((partialSum, element) => partialSum + element, 0);
    return tableTotal + parseFloat(gstCharge) - parseFloat(billDiscount);
  };

  const editBill = async () => {
    dispatch({ type: EDIT_BILL_BEGIN });

    try {
      const {
        billDate,
        editBillId,
        billedCustomer,
        billingComment,
        billingTableData,
        billingType,
        gstCharge,
        billDiscount,
      } = state;
      await authFetch.patch(`/billings/${state.editBillId}`, {
        billDate,
        editBillId,
        billedCustomer,
        billingComment,
        billingTableData,
        billingType,
        gstCharge,
        billDiscount,
      });
      dispatch({ type: EDIT_BILL_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_BILL_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const createBill = async (phone, city) => {
    dispatch({ type: CREATE_BILL_BEGIN });
    try {
      const {
        billDate,
        billedCustomer,
        billingComment,
        billingTableData,
        billingType,
        gstCharge,
        billDiscount,
      } = state;

      const grandTotal = calculateTotal(
        billingTableData,
        gstCharge,
        billDiscount
      );

      await authFetch.post("/billings", {
        billDate,
        billedCustomer,
        billingComment,
        billingTableData,
        billingType,
        phone,
        city,
        gstCharge,
        billDiscount,
        grandTotal,
      });
      dispatch({ type: CREATE_BILL_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_BILL_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state;

    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getCustomers = async () => {
    const { name, phone, city, sort, page } = state;

    let url = `/customers?sort=${sort}&page=${page}`;
    if (phone || name || city) {
      url = url + `&name=${name}&phone=${phone}&city=${city}`;
    }
    dispatch({ type: GET_CUSTOMERS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { customers, totalCustomers, numOfPages } = data;
      dispatch({
        type: GET_CUSTOMERS_SUCCESS,
        payload: {
          customers,
          totalCustomers,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getBills = async () => {
    const { billedCustomer, phone, city, sort, billingType, fromDate, toDate } =
      state;
    const customerName = billedCustomer && billedCustomer.label;

    let url = `/billings?sort=${sort}&fromDate=${fromDate}&toDate=${toDate}`;
    if (phone || customerName || city || billingType) {
      url =
        url +
        `&billedCustomer=${customerName}&phone=${phone}&city=${city}&billingType=${billingType}`;
    }
    dispatch({ type: GET_BILLS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { bills, totalBills } = data;
      dispatch({
        type: GET_BILLS_SUCCESS,
        payload: {
          bills,
          totalBills,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };
  const setEditCustomer = (id) => {
    dispatch({ type: SET_EDIT_CUSTOMER, payload: { id } });
  };
  const setEditBill = (id) => {
    dispatch({ type: SET_EDIT_BILL, payload: { id } });
  };
  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });

    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const editCustomer = async () => {
    dispatch({ type: EDIT_CUSTOMER_BEGIN });

    try {
      const { name, phone, city, comment } = state;
      await authFetch.patch(`/customers/${state.editJobId}`, {
        name,
        phone,
        city,
        comment,
      });
      dispatch({ type: EDIT_CUSTOMER_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_CUSTOMER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
  };
  const deleteCustomer = async (customerId) => {
    dispatch({ type: DELETE_CUSTOMER_BEGIN });
    try {
      await authFetch.delete(`/customers/${customerId}`);
      getCustomers();
    } catch (error) {
      logoutUser();
    }
  };

  const deleteBill = async (billId) => {
    dispatch({ type: DELETE_BILL_BEGIN });
    try {
      await authFetch.delete(`/billings/${billId}`);
      getBills();
    } catch (error) {
      dispatch({ type: DELETE_BILL_ERROR });
      // logoutUser();
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const clearCustomerFilters = () => {
    dispatch({ type: CLEAR_CUSTOMER_FILTERS });
  };
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  const handleDeleteRowBillingData = (id) => {
    const newBillingTableData = state.billingTableData.filter(
      (billingTableData) => {
        return id !== billingTableData.id;
      }
    );
    dispatch({
      type: UPDATE_BILLING_TABLE_DATA,
      payload: { newBillingTableData },
    });
  };

  const handleSaveRowBillingData = (id, formData, setEditBillingId) => {
    const newBillingTableData = state.billingTableData.map(
      (billingTableData) => {
        let newFormData = { ...billingTableData };
        if (id === newFormData.id) {
          newFormData = { ...formData };
        }
        return newFormData;
      }
    );
    dispatch({
      type: UPDATE_BILLING_TABLE_DATA,
      payload: { newBillingTableData },
    });
    setEditBillingId(null);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        createCustomer,
        handleCustomerChange,
        getJobs,
        getCustomers,
        setEditJob,
        setEditCustomer,
        setEditBill,
        deleteJob,
        deleteCustomer,
        editJob,
        editCustomer,
        clearCustomerFilters,
        showStats,
        clearFilters,
        changePage,
        addBillingDataRow,
        handleDeleteRowBillingData,
        handleSaveRowBillingData,
        createBill,
        handleSubmitSearch,
        getBills,
        deleteBill,
        editBill,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
