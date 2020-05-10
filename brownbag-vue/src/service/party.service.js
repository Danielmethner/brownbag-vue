import axios from 'axios';
import { GLOBAL } from '../store/index.js'
import authHeader from './auth-header';
// import store from '../store';

const PARTY_GET_ALL = '/api/party/all';

class PartyService {
  getAll() {
    return axios
      .get(GLOBAL.API_BASE_URL + PARTY_GET_ALL, { headers: authHeader() });
  }
}

export default new PartyService();