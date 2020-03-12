import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

// const API_URL = 'http://brownbag-api.herokuapp.com/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getTraderBoard() {
    return axios.get(API_URL + 'trader', { headers: authHeader() });
  }

  getBrokerBoard() {
    return axios.get(API_URL + 'broker', { headers: authHeader() });
  }
}

export default new UserService();
