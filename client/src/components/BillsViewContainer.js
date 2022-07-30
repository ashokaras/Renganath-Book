import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";

const BillsViewContainer = () => {
  const {
    isLoading,
    name,
    totalCustomers,
    phone,
    city,
    sort,
    numOfPages,
    search,
    bills,
    getBills,
    searchSubmit,
  } = useAppContext();

  useEffect(() => {
    getBills();
    // eslint-disable-next-line
  }, [searchSubmit]);
  if (isLoading) {
    return <Loading center />;
  }

  if (bills.length === 0) {
    return (
      <Wrapper>
        <h2>No Bills to display...</h2>
      </Wrapper>
    );
  }

  return <Wrapper>Bills</Wrapper>;
};

export default BillsViewContainer;
