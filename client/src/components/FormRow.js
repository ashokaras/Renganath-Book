import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const ValidationTextField = styled(TextField)({
  "& input:valid + fieldset": {
    borderColor: "#86efac",
    borderWidth: 2,
  },
  "& input:invalid + fieldset": {
    borderColor: "#fda4af",
    borderWidth: 2,
  },
  "& input:hover + fieldset": {
    borderColor: "#9ca3af !important",
    borderWidth: 2,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important", // override inline-style
  },
});

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  required = false,
  maxlength = 100,
  disabled = false,
}) => {
  return (
    <div className="form-row">
      {required ? (
        <ValidationTextField
          id="outlined-basic"
          label={labelText}
          variant="outlined"
          type={type}
          disabled={disabled}
          maxLength={maxlength}
          required={required}
          value={value}
          name={name}
          onChange={handleChange}
          onWheel={(e) => e.target.blur()}
          fullWidth
        />
      ) : (
        <TextField
          id="outlined-basic"
          label={labelText}
          variant="outlined"
          type={type}
          maxLength={maxlength}
          disabled={disabled}
          required={required}
          value={value}
          name={name}
          onChange={handleChange}
          onWheel={(e) => e.target.blur()}
          fullWidth
        />
      )}
    </div>
  );
};

export default FormRow;
