import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Product from "./Product";
import Wrapper from "../assets/wrappers/CustomerContainer";
import PageBtnContainer from "./PageBtnContainer";

const ProductsContainer = () => {
  const {
    isLoading,
    numOfPages,
    page,
    products,
    getProducts,
    searchSubmit,
    getAllProducts,
  } = useAppContext();

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (searchSubmit === true) {
      getProducts();
    }
  }, [searchSubmit, page]);

  if (isLoading) {
    return <Loading center />;
  }

  if (products.length === 0) {
    return (
      <Wrapper>
        <h2>No Product to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {products.length} customer{products.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {products.map((product) => {
          return <Product key={product._id} {...product} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default ProductsContainer;
