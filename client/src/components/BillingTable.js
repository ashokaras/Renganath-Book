import React, { Fragment, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import Input from "@mui/material/Input";
import CancelIcon from "@mui/icons-material/Cancel";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const ReadOnlyRow = ({
  row,
  handleEdit,
  handleDeleteRow,
  showButton,
}) => {
  return (
    <StyledTableRow key={row.productName}>
      <StyledTableCell scope="row">{row.productName}</StyledTableCell>
      <StyledTableCell align="right">{row.unitsOfMeasurement}</StyledTableCell>
      <StyledTableCell align="right">{row.quantity}</StyledTableCell>
      <StyledTableCell align="right">{row.price}</StyledTableCell>
      <StyledTableCell align="right">{row.total}</StyledTableCell>
      <StyledTableCell
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          columnGap: "10px",
        }}
      >
        <ReadActionCell
          handleDeleteRow={() => handleDeleteRow(row.id)}
          handleEdit={(event) => handleEdit(event, row)}
          showButton={showButton}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export const EditableRow = ({
  row,
  editFormData,
  handleBillingDataChange,
  handleCancel,
  handleSave,
  setEditBillingId,
  showButton,
}) => {
  return (
    <StyledTableRow>
      <StyledTableCell scope="row">
        <Input
          type="text"
          name="productName"
          value={editFormData.productName}
          onChange={(event) => handleBillingDataChange(event, row.id)}
        ></Input>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Input
          type="text"
          name="unitsOfMeasurement"
          value={editFormData.unitsOfMeasurement}
          onChange={(event) => handleBillingDataChange(event, row.id)}
        ></Input>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Input
          type="number"
          name="quantity"
          onWheel={(e) => e.target.blur()}
          value={editFormData.quantity}
          onChange={(event) => handleBillingDataChange(event, row.id)}
        ></Input>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Input
          type="number"
          name="price"
          onWheel={(e) => e.target.blur()}
          value={editFormData.price}
          onChange={(event) => handleBillingDataChange(event, row.id)}
        ></Input>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Input
          type="number"
          name="total"
          onWheel={(e) => e.target.blur()}
          disabled
          value={editFormData.total}
          onChange={(event) => handleBillingDataChange(event, row.id)}
        ></Input>
      </StyledTableCell>
      <StyledTableCell
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          columnGap: "10px",
        }}
      >
        <EditActionCell
          handleCancel={handleCancel}
          showButton={showButton}
          handleSave={() => handleSave(row.id, editFormData, setEditBillingId)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export const ReadActionCell = ({ handleEdit, handleDeleteRow, showButton }) => {
  console.log("Action cell", showButton);
  return (
    <>
      <div
        className="edit-icon"
        onClick={handleEdit}
        disabled={!showButton}
        tabIndex={0}
        style={{ pointerEvents: showButton ? "" : "none" }}
      >
        <EditIcon />
      </div>

      <div
        className="delete-icon"
        disabled={!showButton}
        onClick={handleDeleteRow}
        tabIndex={0}
        style={{ pointerEvents: showButton ? "" : "none" }}
      >
        <DeleteIcon />
      </div>
    </>
  );
};

export const EditActionCell = ({ handleSave, handleCancel, showButton }) => {
  return (
    <>
      <div
        className="edit-icon"
        disabled={!showButton}
        onClick={handleSave}
        tabIndex={0}
        style={{ pointerEvents: showButton ? "" : "none" }}
      >
        <SaveIcon />
      </div>

      <div
        className="delete-icon"
        disabled={!showButton}
        onClick={handleCancel}
        tabIndex={0}
        style={{ pointerEvents: showButton ? "" : "none" }}
      >
        <CancelIcon />
      </div>
    </>
  );
};

const BillingTable = ({
  billingTableData,
  addBillingDataRow,
  handleDeleteRowBillingData,
  handleSaveRowBillingData,
  showButton,
}) => {
  const [editBillingId, setEditBillingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    productName: "",
    unitsOfMeasurement: "",
    quantity: 0,
    price: 0,
    total: 0,
  });

  const handleBillingDataChange = (event, id) => {
    const newEditFormData = { id: id, ...editFormData };
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    newEditFormData[fieldName] = fieldValue;
    if (fieldName === "quantity" || fieldName === "price") {
      newEditFormData["total"] = parseInt(
        newEditFormData["quantity"] * newEditFormData["price"]
      );
    }
    setEditFormData(newEditFormData);
  };

  const handleEdit = (event, billingRow) => {
    event.preventDefault();
    setEditBillingId(billingRow.id);

    const formValues = {
      id: billingRow.id,
      productName: billingRow.productName,
      unitsOfMeasurement: billingRow.unitsOfMeasurement,
      quantity: billingRow.quantity,
      price: billingRow.price,
      total: billingRow.total,
    };

    setEditFormData(formValues);
  };

  const handleCancel = () => {
    setEditBillingId(null);
    setEditFormData({
      productName: "",
      unitsOfMeasurement: "",
      quantity: 0,
      price: 0,
      total: 0,
    });
  };

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ overflow: "hidden", width: "fit-content" }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell align="right">Units of Measure</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Total</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billingTableData.map((row) => {
              return (
                <Fragment key={row.id}>
                  {editBillingId === row.id ? (
                    <EditableRow
                      row={row}
                      handleCancel={handleCancel}
                      handleSave={handleSaveRowBillingData}
                      setEditBillingId={setEditBillingId}
                      handleBillingDataChange={handleBillingDataChange}
                      editFormData={editFormData}
                      showButton={showButton}
                    />
                  ) : (
                    <ReadOnlyRow
                      row={row}
                      handleEdit={handleEdit}
                      handleDeleteRow={handleDeleteRowBillingData}
                      showButton={showButton}
                    />
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        className="noPrint"
        variant="contained"
        style={{ marginTop: "15px" }}
        onClick={() => addBillingDataRow(billingTableData)}
      >
        Add Row
      </Button>
    </>
  );
};

export default BillingTable;
