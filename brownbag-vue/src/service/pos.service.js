import axios from 'axios';
import { GLOBAL } from '../store/index.js';
const POS_GET_BY_USER = '/api/pos/user';
const POS_PRIV_GET_BY_USER = '/api/pos/private/user';
const POS_GET_BY_PARTY_ID = '/api/pos/party/';
const POS_BOOKINGS_GET_BY_PARTY = '/api/pos/bookings/party/';
const POS = "/pos/";
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

  getPosByPartyId(partyId) {
    return axios
      .get(GLOBAL.API_BASE_URL + POS_GET_BY_PARTY_ID + partyId, { headers: jsonHeader() });
  }
  
  getBookingByPartyIdAndPosId(partyId, posId) {
    return axios
      .get(GLOBAL.API_BASE_URL + POS_BOOKINGS_GET_BY_PARTY + partyId + POS + posId, { headers: jsonHeader() });
  }
}

export default new PosService();