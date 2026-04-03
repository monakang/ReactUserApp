import React, { useEffect, useState, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";

import Button from "@mui/material/Button";

import { Edit, Delete } from "@mui/icons-material";
import { userService } from "./userService";
import FormDialog from "./FormDialog";

export default function UserTableList() {
  const [users, setUsers] = useState([]);
  const [user, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const openButtonRef = useRef(null);

  const handleClickOpen = () => {
    setSelectedUser(null);
    setOpen(true);
  };

  const handleClose = () => {
    // if (document.activeElement instanceof HTMLElement) {
    //   document.activeElement.blur();
    // }
    setOpen(false);

    // setTimeout(() => {
    //   openButtonRef.current?.focus();
    // }, 100);

    loadUsers();
  };

  //Styling
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
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const filteredRows = React.useMemo(() => {
    return users.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, users]);

  const displayedRows = React.useMemo(() => {
    return rowsPerPage > 0
      ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : filteredRows;
  }, [page, rowsPerPage, filteredRows]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await userService.getAll();

    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await userService.delete(id);
      loadUsers(); // Refresh list
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleEdit = (user) => {
    setSelectedUser(user);

    setOpen(true);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset page when search term changes
  };

  ////////////////////////////////////////////////////

  const handleSave = async (formData) => {
    const isEdit = !!user;

    if (isEdit) {
      await userService.update(user.id, formData);
    } else {
      await userService.create(formData);
    }

    loadUsers();
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  return (
    <>
      <div>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              // onSave={handleSave}
              ref={openButtonRef}
            >
              NEW USER
            </Button>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ ml: 2, minWidth: 200 }}
            />
          </div>
        </Toolbar>
        <TableContainer
          component={Paper}
          sx={{ width: "100%", overflow: "hidden" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedRows.length > 0 ? (
                displayedRows.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell>{user.name}</StyledTableCell>
                    <StyledTableCell>{user.email}</StyledTableCell>
                    <StyledTableCell>{user.gender}</StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Delete />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={5} align="center">
                    No matching results found.
                  </StyledTableCell>
                </StyledTableRow>
              )}
              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 53 * emptyRows }}>
                  <StyledTableCell colSpan={5} />
                </StyledTableRow>
              )}
            </TableBody>
            <TableFooter>
              <StyledTableRow>
                <TablePagination
                  pagesizeoptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={filteredRows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </StyledTableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      <FormDialog
        open={open}
        onClose={handleClose}
        user={user}
        onSave={handleSave}
        key={user?.id || "new-user"}
        // disableRestoreFocus
        //   aria-hidden={false}
        //  aria-modal="true"
      />
    </>
  );
}
