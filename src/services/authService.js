import axios from 'axios';

const API_URL = "http://localhost:8000/api/";

class AuthService {
  async login(email, password) { 
    try {
      const response = await axios.post(API_URL + "token/", {
        email,
        password,
      });

      if (response.data.access) {
        this.setUserData(response.data);
        this.startRefreshTokenTimer();
      }
      return response.data;
    } catch (error) {
      console.error("Login failed: ", error.response?.data || error.message);
      throw error;
    }
  }

  logout() {
    this.stopRefreshTokenTimer();
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  async refreshToken() {
    try {
      const user = this.getCurrentUser();
      const response = await axios.post(API_URL + "token/refresh/", {
        refresh: user.refresh,
      });

      if (response.data.access) {
        user.access = response.data.access;
        this.setUserData(user);
        this.startRefreshTokenTimer();
      }
      return response.data;
    } catch (error) {
      console.error("Token refresh failed: ", error.response?.data || error.message);
      throw error;
    }
  }

  setUserData(data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  startRefreshTokenTimer() {
    const user = this.getCurrentUser();
    const jwtBase64 = user.access.split('.')[1];
    const jwtToken = JSON.parse(atob(jwtBase64));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), timeout);
  }

  stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
