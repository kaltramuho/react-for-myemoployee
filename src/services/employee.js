import axios from "axios";
import { toast } from "react-toastify";

const getToken = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user).access;
  } else {
    return null;
  }
};

const createAxiosInstance = () => {
  const token = getToken();
  if (!token) {
    toast.error("User is not logged in or session has expired.");
    return null;
  }
  return axios.create({
    baseURL: 'http://localhost:8000/api/employees/',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const fetchEmployees = async () => {
  const instance = createAxiosInstance();
  if (!instance) return;

  try {
    const response = await instance.get('/');
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    toast.error('Error fetching employees. Please try again.');
    throw error;
  }
};

export const createEmployee = async (formData) => {
  const instance = createAxiosInstance();
  if (!instance) return;

  try {
    const response = await instance.post('/', formData);
    toast.success('Employee added successfully.');
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessages = Object.values(error.response.data).flat().join(' ');
      toast.error(`Error: ${errorMessages}`);
    } else {
      toast.error('Error saving employee. Please check the data and try again.');
    }
    throw error;
  }
};

export const updateEmployee = async (id, formData) => {
  const instance = createAxiosInstance();
  if (!instance) return;

  try {
    const response = await instance.put(`/${id}/`, formData);
    toast.success('Employee updated successfully.');
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessages = Object.values(error.response.data).flat().join(' ');
      toast.error(`Error: ${errorMessages}`);
    } else {
      toast.error('Error saving employee. Please check the data and try again.');
    }
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  const instance = createAxiosInstance();
  if (!instance) return;

  try {
    const response = await instance.delete(`/${id}/`);
    toast.success('Employee deleted successfully.');
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessages = Object.values(error.response.data).flat().join(' ');
      toast.error(`Error: ${errorMessages}`);
    } else {
      toast.error('Error saving employee. Please check the data and try again.');
    }
    throw error;
  }
};
