import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Button, Container, Toolbar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employee';
import EmployeeModal from './EmployeeModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import EmployeeDetailModal from './EmployeeDetailModal';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birthdate: null,
    job_title: "",
    start_date: null,
    photo: null,
    address_type: "",
    address: "" ,
  });

  useEffect(() => {
    if (localStorage.getItem('user')) {
      loadEmployees();
    } else {
      toast.error("Please try logging in again");
    }
  }, [page, rowsPerPage]);

  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(emp => 
    emp.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.job_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = () => {
    clearForm();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetailOpen = (employee) => {
    setSelectedEmployee(employee);
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
  };

  const clearForm = () => {
    setNewEmployee({
      first_name: "",
      last_name: "",
      email: "",
      birthdate: null,
      job_title: "",
      start_date: null,
      photo: "",
      address_type: "", 
      address: "" ,
    });
    setEditingEmployeeId(null);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'photo' && files.length > 0) {
      setNewEmployee(prevState => ({
        ...prevState,
        [name]: files[0] 
      }));
    } else {
      setNewEmployee(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleDateChange = (date, field) => {
    setNewEmployee(prevState => ({ ...prevState, [field]: date }));
  };

  const handleAddOrUpdateEmployee = async () => {
    const missingFields = [];

    if (!newEmployee.first_name) missingFields.push('First Name');
    if (!newEmployee.last_name) missingFields.push('Last Name');
    if (!newEmployee.email) missingFields.push('Email');
    if (!newEmployee.birthdate) missingFields.push('Birthdate');
    if (!newEmployee.job_title) missingFields.push('Job Title');
    if (!newEmployee.start_date) missingFields.push('Start Date');
    if (!newEmployee.photo && !editingEmployeeId) missingFields.push('Photo');
    if (!newEmployee.address_type) missingFields.push('Address Type');
    if (!newEmployee.address) missingFields.push('Address');

    if (missingFields.length > 0 && !editingEmployeeId) {
      toast.error(`Please fill in the following fields: ${missingFields.join(', ')}`);
      return;
    }
    
    try {
      const formData = new FormData();
      
      // Append only fields that have values
      if (newEmployee.first_name) formData.append('first_name', newEmployee.first_name);
      if (newEmployee.last_name) formData.append('last_name', newEmployee.last_name);
      if (newEmployee.email) formData.append('email', newEmployee.email);
      if (newEmployee.birthdate) formData.append('birthdate', newEmployee.birthdate.toISOString().split('T')[0]);
      if (newEmployee.job_title) formData.append('job_title', newEmployee.job_title);
      if (newEmployee.start_date) formData.append('start_date', newEmployee.start_date.toISOString().split('T')[0]);
      
      // Only append the photo if a new one has been uploaded, otherwise, retain the existing photo
      if (newEmployee.photo) {
        formData.append('photo', newEmployee.photo);
      } else if (editingEmployeeId && newEmployee.photo === "") {
        formData.append('photo', employees.find(emp => emp.id === editingEmployeeId).photo);
      }
      
      if (newEmployee.address_type) formData.append('address_type', newEmployee.address_type);
      if (newEmployee.address) formData.append('address', newEmployee.address);

      if (editingEmployeeId) {
        await updateEmployee(editingEmployeeId, formData);
      } else {
        await createEmployee(formData);
      }

      loadEmployees();
      handleClose();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };


  const handleEditEmployee = (employee) => {
    setEditingEmployeeId(employee.id);
    setNewEmployee({
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      birthdate: new Date(employee.birthdate),
      job_title: employee.job_title,
      start_date: new Date(employee.start_date),
      photo: employee.photo,
      address_type: employee.address_type,
      address: employee.address,
    });
    setOpen(true);
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      loadEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  return (
    <Container>
      <Header
        handleMenu={handleMenu}
        handleCloseMenu={handleCloseMenu}
        handleLogout={handleLogout}
        anchorEl={anchorEl}
      />

      <Toolbar style={{ justifyContent: 'space-between', marginTop: '10%' }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          onChange={handleSearch}
          style={{ maxWidth: '300px' }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Employee
        </Button>
      </Toolbar>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Birthdate</TableCell>
            <TableCell>Photo</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEmployees.map(emp => (
            <TableRow key={emp.id}>
              <TableCell>{`${emp.first_name} ${emp.last_name}`}</TableCell>
              <TableCell>{emp.job_title}</TableCell>
              <TableCell>{emp.birthdate}</TableCell>
              <TableCell>
                {emp.photo ? (
                  <img src={emp.photo} alt={`${emp.first_name} ${emp.last_name}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                ) : (
                  "No Photo"
                )}
              </TableCell>
              <TableCell>{emp.start_date}</TableCell>
              <TableCell>
                <IconButton color="default" onClick={() => handleDetailOpen(emp)}>
                  <VisibilityIcon />
                </IconButton>
                <IconButton color="primary" onClick={() => handleEditEmployee(emp)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDeleteEmployee(emp.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredEmployees.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Entries per page"
      />

      <EmployeeModal
        open={open}
        handleClose={handleClose}
        newEmployee={newEmployee}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
        handleAddOrUpdateEmployee={handleAddOrUpdateEmployee}
        editingEmployeeId={editingEmployeeId}
      />

      <EmployeeDetailModal
        open={detailOpen}
        handleDetailClose={handleDetailClose}
        employee={selectedEmployee}
      />

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Container>
  );
};

export default EmployeeList;
