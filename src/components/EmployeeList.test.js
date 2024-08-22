import React from 'react';
import { render, screen } from '@testing-library/react';
import EmployeeList from './EmployeeList';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios'); // Mock axios

test('renders EmployeeList with Add Employee button', () => {
  render(
    <BrowserRouter>
      <EmployeeList />
    </BrowserRouter>
  );

  const addButton = screen.getByText(/Add Employee/i);
  expect(addButton).toBeInTheDocument();
});

test('renders EmployeeList table headers', () => {
  render(
    <BrowserRouter>
      <EmployeeList />
    </BrowserRouter>
  );

  const nameHeader = screen.getByText(/Name/i);
  const positionHeader = screen.getByText(/Position/i);
  const birthdateHeader = screen.getByText(/Birthdate/i);

  expect(nameHeader).toBeInTheDocument();
  expect(positionHeader).toBeInTheDocument();
  expect(birthdateHeader).toBeInTheDocument();
});
