import moment from "moment";
import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Customer";
import ProductInfo from "./ProductInfo";

const Product = ({ _id, productName, unitsOfMeasure, createdAt }) => {
  const { setEditProduct, deleteProduct, user } = useAppContext();
  const role = user && user.role;

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{productName.charAt(0)}</div>
        <div className="info">
          <h5>{productName}</h5>
          <p>{unitsOfMeasure}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <ProductInfo icon={<FaLocationArrow />} text={productName} />
          <ProductInfo icon={<FaCalendarAlt />} text={date} />
        </div>
        <footer>
          {role === "admin" ? (
            <div className="actions">
              <Link
                style={{ pointerEvents: role !== "admin" ? "none" : "" }}
                to="/add-product"
                className="btn edit-btn"
                onClick={() => setEditProduct(_id)}
              >
                Edit
              </Link>
              <button
                style={{ pointerEvents: role !== "admin" ? "none" : "" }}
                type="button"
                className="btn delete-btn"
                onClick={() => deleteProduct(_id, productName)}
              >
                Delete
              </button>
            </div>
          ) : null}
        </footer>
      </div>
    </Wrapper>
  );
};

export default Product;
