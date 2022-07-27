import * as React from "react";
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

export const ActionCell = () => {
  return (
    <>
      <div className="edit-icon">
        <EditIcon />
      </div>

      <div className="delete-icon">
        <DeleteIcon />
      </div>
    </>
  );
};

const BillingTable = ({ billingTableData, addBillingDataRow }) => {
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
            {billingTableData.map((row) => (
              <StyledTableRow key={row.productName}>
                <StyledTableCell component="th" scope="row">
                  {row.productName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.unitsOfMeasurement}
                </StyledTableCell>
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
                  <ActionCell />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
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
