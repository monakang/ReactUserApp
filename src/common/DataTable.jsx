import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  TextField,
  InputAdornment,
  Toolbar,
  Button,
  IconButton,
  tableCellClasses,
  styled,
} from "@mui/material";
import { Search as SearchIcon, Edit, Delete } from "@mui/icons-material";

// Generic Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

export default function DataTable({
  title,
  columns,
  data,
  onEdit,
  onDelete,
  onAddNew,
  addButtonLabel = "Add New",
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRows = useMemo(() => {
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, data]);

  const displayedRows = useMemo(() => {
    return rowsPerPage > 0
      ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : filteredRows;
  }, [page, rowsPerPage, filteredRows]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
        <div>
          <Button variant="contained" onClick={onAddNew}>
            {addButtonLabel}
          </Button>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ ml: 2, minWidth: 200 }}
          />
        </div>
      </Toolbar>

      <TableContainer>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <StyledTableCell key={col.field} align={col.align || "left"}>
                  {col.headerName}
                </StyledTableCell>
              ))}
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.length > 0 ? (
              displayedRows.map((row) => (
                <StyledTableRow key={row.id}>
                  {columns.map((col) => (
                    <StyledTableCell
                      key={col.field}
                      align={col.align || "left"}
                    >
                      {row[col.field]}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align="right">
                    <IconButton color="primary" onClick={() => onEdit(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => onDelete(row.id)}>
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}
