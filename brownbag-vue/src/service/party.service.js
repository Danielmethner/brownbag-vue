import axios from 'axios';
import { GLOBAL } from '../store/index.js'
import authHeader from './auth-header';

const PARTY_CREATE = '/api/party/create';
const PARTY_GET_ALL = '/api/party/all';
const PARTY_GET_PRIV_PERSON_BY_USER = '/api/party/priv';
const PARTY_GET_BY_ID = '/api/party/';
const AVBL_QTY = "/qty/avbl";
const ASSET = "/asset/";
const BAL_SHEET_BY_PARTY_ID = '/api/balsheet/party/';
const BAL_SHEET_PREV_BY_PARTY_ID = '/api/balsheet/prev/party/';

class PartyService {

  createParty(party) {
    return axios
      .post(GLOBAL.API_BASE_URL + PARTY_CREATE, party, { headers: authHeader() });
  }

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

  getAvblQty(partyId, assetId) {
    return axios.get(GLOBAL.API_BASE_URL + PARTY_GET_BY_ID + partyId + ASSET + assetId + AVBL_QTY, { headers: authHeader() });
  }

  getBalSheetByPartyId(partyId) {
    return axios
      .get(GLOBAL.API_BASE_URL + BAL_SHEET_BY_PARTY_ID + partyId, { headers: authHeader() });
  }

  getBalSheetByPartyIdPrev(partyId) {
    return axios
      .get(GLOBAL.API_BASE_URL + BAL_SHEET_PREV_BY_PARTY_ID + partyId, { headers: authHeader() });
  }
}

export default new PartyService();