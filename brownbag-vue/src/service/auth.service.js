import axios from 'axios';
import {GLOBAL} from '../store/index.js'
const API_AUTH= '/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(GLOBAL.API_BASE_URL + API_AUTH + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      },
      error => {
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        this.successful = false;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(GLOBAL.API_BASE_URL + API_AUTH + 'signup', {
      username: user.username,
      password: user.password
    });
  }
}

export default new AuthService();
