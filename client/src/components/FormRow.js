import TextField from "@mui/material/TextField";

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      {/* <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      /> */}
      <TextField
        id="outlined-basic"
        label={labelText}
        variant="outlined"
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        fullWidth
      />
    </div>
  );
};

export default FormRow;
