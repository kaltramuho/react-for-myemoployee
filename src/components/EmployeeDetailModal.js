import React from 'react';
import { Modal, Box, Typography, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EmployeeDetailModal = ({ open, handleDetailClose, employee }) => {
  if (!employee) {
    return null;
  }

  return (
    <Modal open={open} onClose={handleDetailClose}>
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
          <Typography variant="h5" component="h2">
            Employee Details
          </Typography>
          <IconButton onClick={handleDetailClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          name="first_name"
          value={employee.first_name}
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="last_name"
          value={employee.last_name}
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={employee.email}
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Birthdate"
          name="birthdate"
          value={new Date(employee.birthdate).toLocaleDateString()}
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Job Title"
          name="job_title"
          value={employee.job_title}
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Start Date"
          name="start_date"
          value={new Date(employee.start_date).toLocaleDateString()}
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address Type"
          name="address_type"
          value={employee.address_type}
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          name="address"
          value={employee.address}
          InputProps={{ readOnly: true }}
        />
        {employee.photo && (
          <Box margin="normal" sx={{ textAlign: 'center' }}>
            <img 
              src={employee.photo} 
              alt={`${employee.first_name} ${employee.last_name}`} 
              style={{ width: '100px', height: '100px', borderRadius: '8px', marginTop: '10px' }} 
            />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default EmployeeDetailModal;
