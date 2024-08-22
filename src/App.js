import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/employees" element={<EmployeeList />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
