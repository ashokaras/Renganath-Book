import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchCustomerContainer = () => {
  const {
    isLoading,
    name,
    phone,
    city,
    sort,
    sortOptions,
    handleChange,
    clearCustomerFilters,
  } = useAppContext();
  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    clearCustomerFilters();
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="text"
            name="name"
            labelText="Name"
            value={name}
            handleChange={handleSearch}
          />
          <FormRow
            type="number"
            name="phone"
            labelText="Phone"
            value={phone}
            handleChange={handleSearch}
          />
          <FormRow
            type="text"
            name="city"
            labelText="City"
            value={city}
            handleChange={handleSearch}
          />
          {/* search by status */}

          {/* search by type */}

          {/* sort */}
          <FormRowSelect
            labelText="Sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchCustomerContainer;
