import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(email, password).then(
      () => {
        toast.success("Login successful!", {
          onClose: () => navigate("/employees")
        });
      },
      error => {
        toast.error("Login failed. Please check your credentials.");
      }
    );
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login Here</h2>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="text" 
              placeholder="Email or Phone" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="form-control"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="login-button">Log In</button>
          </div>
        </form>
        <ToastContainer 
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default Login;
