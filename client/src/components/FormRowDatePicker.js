import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const FormRowDatePicker = ({ value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label={labelText}
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default FormRowDatePicker;
