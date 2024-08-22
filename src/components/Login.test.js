import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios'); // Mock axios

test('renders login form with email and password fields', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const emailInput = screen.getByPlaceholderText(/Email or Phone/i);
  const passwordInput = screen.getByPlaceholderText(/Password/i);
  const loginButton = screen.getByText(/Log In/i);

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test('allows user to type into input fields', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const emailInput = screen.getByPlaceholderText(/Email or Phone/i);
  const passwordInput = screen.getByPlaceholderText(/Password/i);

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  expect(emailInput.value).toBe('test@example.com');
  expect(passwordInput.value).toBe('password');
});
