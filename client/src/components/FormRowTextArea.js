import TextareaAutosize from "@mui/material/TextareaAutosize";

const formRowTextArea = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <TextareaAutosize
        id="outlined-basic"
        placeholder={labelText}
        variant="outlined"
        style={{
          borderRadius: "8px",
          padding: "15px",
          width: "100%",
        }}
        minRows={5}
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default formRowTextArea;
