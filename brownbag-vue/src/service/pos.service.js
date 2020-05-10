import axios from 'axios';
import { GLOBAL } from '../store/index.js';
const POS_GET_BY_USER = '/api/pos/user'
const POS_PRIV_GET_BY_USER = '/api/pos/private/user'
const POS_GET_BY_PARTY_ID = '/api/pos/party/'
import jsonHeader from './json-header';

class PosService {

  getPosByUser() {
    return axios
      .get(GLOBAL.API_BASE_URL + POS_GET_BY_USER, { headers: jsonHeader() });
  }

  getPosPrivateByUser() {
    return axios
      .get(GLOBAL.API_BASE_URL + POS_PRIV_GET_BY_USER, { headers: jsonHeader() });
  }

  getPosByParty(party) {
    return axios
      .get(GLOBAL.API_BASE_URL + POS_GET_BY_PARTY_ID + party, { headers: jsonHeader() });
  }
}

export default new PosService();