import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

const Wrapper = styled.div`
  .auto-select {
    .MuiAutocomplete-endAdornment {
      display: none;
    }
    .MuiOutlinedInput-root {
      padding-right: 0px !important;
    }
  }
`;

const FormRowSelectAutoComplete = ({
  labelText,
  name,
  handleChange,
  list,
  billedCustomer,
}) => {
  return (
    <Wrapper>
      <div className="form-row">
        <Autocomplete
          disablePortal
          className="auto-select"
          onChange={(event, newValue) => handleChange(newValue)}
          name={name}
          value={billedCustomer || null}
          options={list}
          defaultValue={null}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField {...params} label={labelText} />}
        />
      </div>
    </Wrapper>
  );
};

export default FormRowSelectAutoComplete;
