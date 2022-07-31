import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import CustomerInfo from "./CustomerInfo";

const Customer = ({ _id, name, phone, city, comment, createdAt }) => {
  const { setEditCustomer, deleteCustomer, user } = useAppContext();
  const role = user.role;

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{name.charAt(0)}</div>
        <div className="info">
          <h5>{name}</h5>
          <p>{phone}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <CustomerInfo icon={<FaLocationArrow />} text={city} />
          <CustomerInfo icon={<FaCalendarAlt />} text={date} />
          <CustomerInfo icon={<FaBriefcase />} text={comment} />
        </div>
        <footer>
          <div className="actions">
            <Link
              style={{ pointerEvents: role !== "admin" ? "none" : "" }}
              to="/add-customer"
              className="btn edit-btn"
              onClick={() => setEditCustomer(_id)}
            >
              Edit
            </Link>
            <button
              style={{ pointerEvents: role !== "admin" ? "none" : "" }}
              type="button"
              className="btn delete-btn"
              onClick={() => deleteCustomer(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Customer;
