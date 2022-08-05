import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Landing, Error, ProtectedRoute } from "./pages";
import {
  Profile,
  SharedLayout,
  AddCustomer,
  Billing,
  EditBill,
  EditCustomer,
  CustomerReport,
  Report,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          {/* <Route  element={<Stats />} /> */}
          <Route index element={<Billing />} />
          <Route path="edit-bill" element={<EditBill />} />
          <Route path="add-customer" element={<AddCustomer />} />
          <Route path="edit-customer" element={<EditCustomer />} />
          <Route path="profile" element={<Profile />} />
          <Route path="report" element={<Report />} />
          <Route path="customerReport" element={<CustomerReport />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
