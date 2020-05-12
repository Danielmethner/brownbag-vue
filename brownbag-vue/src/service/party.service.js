import axios from 'axios';
import { GLOBAL } from '../store/index.js'
import authHeader from './auth-header';

const PARTY_GET_ALL = '/api/party/all';
const PARTY_GET_PRIV_PERSON_BY_USER = '/api/party/priv';
const PARTY_GET_BY_ID = '/api/party/';
const AVBL_QTY = "/qty/avbl"

class PartyService {
  getAll() {
    return axios
      .get(GLOBAL.API_BASE_URL + PARTY_GET_ALL, { headers: authHeader() });
  }

  getPrivatePerson() {
    return axios.get(GLOBAL.API_BASE_URL + PARTY_GET_PRIV_PERSON_BY_USER, { headers: authHeader() });
  }
  
  getById(partyId) {
    return axios.get(GLOBAL.API_BASE_URL + PARTY_GET_BY_ID + partyId, { headers: authHeader() });
  }
  
  getAvblQty(partyId) {
    return axios.get(GLOBAL.API_BASE_URL + PARTY_GET_BY_ID + partyId + AVBL_QTY, { headers: authHeader() });
  }
}

export default new PartyService();