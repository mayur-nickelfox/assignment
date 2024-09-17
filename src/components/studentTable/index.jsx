import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, ListItemIcon, Skeleton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteIcon from "@mui/icons-material/Delete";

function Row(props) {
  const { row, onEdit, onFlag, onDelete, onRowClick, index, skeleton } = props;
  const [open, setOpen] = React.useState(false);

  // Menu handling state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "1px solid transparent" },
          "&:hover": { backgroundColor: "#f9f9f9" },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon
                sx={{
                  color: "#ffffff",
                  backgroundColor: "#06BE85",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <KeyboardArrowDownIcon sx={{ color: "#000000" }} />
            )}
          </IconButton>
        </TableCell>
        <TableCell size="small">
          {/* Conditionally render star icon if row is flagged */}
          <StarIcon
            onClick={() => onFlag(row)}
            sx={{ color: row?.flag ? "#06BE85" : "#e0e0e0", cursor: "pointer" }}
          />
        </TableCell>

        <TableCell component="th" scope="row">
          {skeleton ? (
            <Skeleton />
          ) : (
            <Box
              onClick={() => onRowClick(row)}
              component="span"
              sx={{
                fontWeight: "bold",
                cursor: "pointer",
                "&:hover": {
                  color: "#06BE85",
                },
              }}
            >
              {row?.name}
            </Box>
          )}
        </TableCell>
        <TableCell align="right">
          {skeleton ? <Skeleton /> : row?.age}
        </TableCell>
        <TableCell align="right">
          {" "}
          {skeleton ? <Skeleton /> : row?.gender}
        </TableCell>
        <TableCell align="right">
          {" "}
          {skeleton ? <Skeleton /> : row?.gpa}
        </TableCell>
        <TableCell align="right">
          {/* Three-dot menu button */}
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            {skeleton ? <Skeleton /> : <MoreVertIcon />}
          </IconButton>
          {!skeleton && (
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: "16ch", // Adjust width as needed
                  boxShadow: "none",
                  border: "1px solid #e0e0e0",
                  transform: "translateX(-60px)",
                },
              }}
            >
              <MenuItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  // Default color
                  backgroundColor: "transparent",
                  // Hover effect
                  "&:hover": {
                    backgroundColor: "rgba(6, 190, 133, 0.1)", // Change background color to red on hover
                  },
                  // Optional: Ensure smooth transition
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => {
                  onEdit(row);
                  handleMenuClose();
                }}
              >
                <Typography variant="body2">Edit</Typography>
                <ListItemIcon
                  sx={{
                    width: "10px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <EditIcon />
                </ListItemIcon>
              </MenuItem>
              <MenuItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  // Default color
                  backgroundColor: "transparent",
                  // Hover effect
                  "&:hover": {
                    backgroundColor: "rgba(6, 190, 133, 0.1)", // Change background color to red on hover
                  },
                  // Optional: Ensure smooth transition
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => {
                  onFlag(row);
                  handleMenuClose();
                }}
              >
                <Typography variant="body2">
                  {!row?.flag ? "Flag" : "Remove flag"}
                </Typography>
                <ListItemIcon
                  sx={{
                    width: "10px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <FlagIcon />
                </ListItemIcon>
              </MenuItem>
              <MenuItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  // Default color
                  backgroundColor: "transparent",
                  // Hover effect
                  "&:hover": {
                    backgroundColor: "rgba(6, 190, 133, 0.1)", // Change background color to red on hover
                  },
                  // Optional: Ensure smooth transition
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => {
                  onDelete(row);
                  handleMenuClose();
                }}
              >
                <Typography variant="body2">Delete</Typography>
                <ListItemIcon
                  sx={{
                    width: "10px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <DeleteIcon />
                </ListItemIcon>
              </MenuItem>
            </Menu>
          )}
        </TableCell>
      </TableRow>
      {!skeleton && (
        <TableRow>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              border: "none",
              borderBottom: open ? "1px solid #e0e0e0" : "none",
            }}
            colSpan={12}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  margin: "20px 20px",
                  backgroundColor: row?.flag
                    ? "rgba(6, 190, 133, 0.1)"
                    : "#f1f1f1",
                  borderRadius: 2,
                  padding: 2,
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Details
                </Typography>
                <Table size="small" aria-label="details">
                  <TableBody>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Address
                      </TableCell>
                      <TableCell>{`${row.address.street}, ${row.address.city}, ${row.address.zip}, ${row.address.country}`}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Email
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Phone
                      </TableCell>
                      <TableCell>{row.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Courses
                      </TableCell>
                      <TableCell>{row.courses.join(", ")}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    gpa: PropTypes.number.isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    courses: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onFlag: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired, // Added prop for handling row click
};

export default function StudentTable() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://freetestapi.com/api/v1/students?limit=10")
      .then((response) => {
        setTimeout(() => {
          // Add "flag": true to the first two objects in the response data
          const updatedRows = response.data.map((item, index) => {
            if (index < 3) {
              return { ...item, flag: true };
            }
            return item;
          });

          setRows(updatedRows);
          setLoading(false);
        }, 1000);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Menu action handlers
  const handleEdit = (row) => {
    alert(`Editing ${row.name}`);
    // Add your editing logic here
  };

  const handleFlag = (row) => {
    // Toggle flag status
    setRows((prevRows) =>
      prevRows.map((r) =>
        r.id === row.id
          ? { ...r, flag: !r.flag } // Toggle the flag value
          : r
      )
    );
  };

  const handleDelete = (row) => {
    // Add your delete logic here
    setRows((prevRows) => prevRows.filter((r) => r.id !== row.id));
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", mt: "50px", mb: 3 }}
      >
        Student Information
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "90%", height: "70vh", margin: "auto", mt: 4 }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow
              style={{ width: "50px", backgroundColor: "#06BE85 !important" }}
            >
              <TableCell
                sx={{
                  width: "50px",
                  backgroundColor: "#06BE85",
                  fontWeight: "bold",
                }}
              />
              <TableCell
                sx={{ backgroundColor: "#06BE85", fontWeight: "bold" }}
              />
              <TableCell
                sx={{
                  color: "white",
                  backgroundColor: "#06BE85",
                  fontWeight: "bold",
                }}
              >
                Name
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: "white",
                  backgroundColor: "#06BE85",
                  fontWeight: "bold",
                }}
              >
                Age
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: "white",
                  backgroundColor: "#06BE85",
                  fontWeight: "bold",
                }}
              >
                Gender
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: "white",
                  backgroundColor: "#06BE85",
                  fontWeight: "bold",
                }}
              >
                GPA
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: "white",
                  backgroundColor: "#06BE85",
                  fontWeight: "bold",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row, index) => (
                  <Row
                    skeleton
                    key={row?.id}
                    row={row}
                    index={index}
                    onEdit={handleEdit}
                    onFlag={handleFlag}
                    onDelete={handleDelete}
                    onRowClick={handleRowClick}
                  />
                ))
              : rows.map((row, index) => (
                  <Row
                    key={row.id}
                    row={row}
                    index={index}
                    onEdit={handleEdit}
                    onFlag={handleFlag}
                    onDelete={handleDelete}
                    onRowClick={handleRowClick}
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        colSpan={1}
        sx={{ textAlign: "center", padding: "16px", fontStyle: "italic" }}
      >
        Assignment by Mayur Bahuguna
      </Grid>

      <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>Student Details</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <Box
              sx={{
                padding: 2,
                backgroundColor: selectedRow?.flag
                  ? "rgba(6, 190, 133, 0.1)"
                  : "#f1f1f1",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom component="div">
                {selectedRow.name}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Age:</strong> {selectedRow.age}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Gender:</strong> {selectedRow.gender}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>GPA:</strong> {selectedRow.gpa}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Address:</strong>{" "}
                {`${selectedRow.address.street}, ${selectedRow.address.city}, ${selectedRow.address.zip}, ${selectedRow.address.country}`}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Email:</strong> {selectedRow.email}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Phone:</strong> {selectedRow.phone}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Courses:</strong> {selectedRow.courses.join(", ")}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            color="primary"
            sx={{ fontSize: "1rem" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
