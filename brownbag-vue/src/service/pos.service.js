import axios from 'axios';
import { GLOBAL } from '../store/index.js';
const POS_GET_BY_USER = '/api/pos/user'
import jsonHeader from './json-header';

class PosService {
 
  getPosByUser() {
    return axios
      .get(GLOBAL.API_BASE_URL + POS_GET_BY_USER, { headers: jsonHeader() });
  }
}

export default new PosService();