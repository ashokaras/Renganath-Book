import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

import { useAppContext } from "../context/appContext";

const useCheckUserRole = () => {
  const { user } = useAppContext();
  const role = user && user.role;

  return [
    // { id: 1, text: "stats", path: "/", icon: <IoBarChartSharp /> },
    { id: 1, text: "Create Entry", path: "/", icon: <ImProfile /> },
    {
      id: 2,
      text: role === "admin" ? "Edit Bills" : "Print Bills",
      path: "edit-bill",
      icon: <FaWpforms />,
    },
    { id: 3, text: "add customer", path: "add-customer", icon: <FaWpforms /> },
    {
      id: 4,
      text: "Edit customer",
      path: "edit-customer",
      icon: <FaWpforms />,
    },
    {
      id: 5,
      text: "Report",
      path: "report                              ",
      icon: <FaWpforms />,
    },
    { id: 6, text: "User profile", path: "profile", icon: <ImProfile /> },
    // { id: 6, text: "all jobs", path: "all-jobs", icon: <MdQueryStats /> },
    // { id: 7, text: "add job", path: "add-job", icon: <FaWpforms /> },
  ];
};

const links = [
  // { id: 1, text: "stats", path: "/", icon: <IoBarChartSharp /> },
  { id: 1, text: "Create Entry", path: "/", icon: <ImProfile /> },
  { id: 2, text: "Edit Entry", path: "edit-bill", icon: <FaWpforms /> },
  { id: 3, text: "add customer", path: "add-customer", icon: <FaWpforms /> },
  { id: 4, text: "Edit customer", path: "edit-customer", icon: <FaWpforms /> },
  {
    id: 5,
    text: "Report",
    path: "report                              ",
    icon: <FaWpforms />,
  },
  { id: 6, text: "User profile", path: "profile", icon: <ImProfile /> },
  // { id: 6, text: "all jobs", path: "all-jobs", icon: <MdQueryStats /> },
  // { id: 7, text: "add job", path: "add-job", icon: <FaWpforms /> },
];

export default useCheckUserRole;
