import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const FormRowSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  disabled = false,
}) => {
  return (
    <div className="form-row">
      <FormControl fullWidth>
        <InputLabel id={labelText}>{labelText}</InputLabel>
        <Select
          labelId={labelText}
          name={name}
          value={value}
          label={labelText}
          onChange={handleChange}
          fullWidth
          disabled={disabled}
        >
          {list.map((itemValue, index) => {
            return (
              <MenuItem key={index} value={itemValue}>
                {itemValue}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default FormRowSelect;
