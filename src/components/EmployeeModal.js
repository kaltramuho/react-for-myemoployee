import React from 'react';
import { Modal, Box, Typography, TextField, Button, InputLabel, IconButton } from '@mui/material';
import DatePicker from 'react-datepicker';
import CloseIcon from '@mui/icons-material/Close';
import 'react-datepicker/dist/react-datepicker.css';

const EmployeeModal = ({ open, handleClose, newEmployee, handleInputChange, handleDateChange, handleAddOrUpdateEmployee, editingEmployeeId }) => {

  const handleModalClose = () => {
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 600, 
        bgcolor: 'background.paper', 
        borderRadius: '8px',
        boxShadow: 24, 
        p: 4 
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" component="h2" gutterBottom>
            {editingEmployeeId ? "Edit Employee" : "Add New Employee"}
            </Typography>
          <IconButton onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          name="first_name"
          value={newEmployee.first_name}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="last_name"
          value={newEmployee.last_name}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={newEmployee.email}
          onChange={handleInputChange}
        />
        <Box margin="normal" sx={{ display: 'flex', gap: 2 }}>
          <DatePicker
            selected={newEmployee.birthdate}
            onChange={(date) => handleDateChange(date, 'birthdate')}
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
            placeholderText="Select birthdate"
            customInput={<TextField fullWidth />}
          />
          <DatePicker
            selected={newEmployee.start_date}
            onChange={(date) => handleDateChange(date, 'start_date')}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select start date"
            customInput={<TextField fullWidth />}
          />
        </Box>
        <TextField
          fullWidth
          margin="normal"
          label="Job Title"
          name="job_title"
          value={newEmployee.job_title}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address Type"
          name="address_type"
          value={newEmployee.address_type}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          name="address"
          value={newEmployee.address}
          onChange={handleInputChange}
        />
        <Box margin="normal">
          <InputLabel htmlFor="photo">Upload Photo</InputLabel>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            style={{ marginTop: '8px', marginBottom: '16px' }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddOrUpdateEmployee}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EmployeeModal;
