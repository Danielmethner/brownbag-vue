import axios from 'axios';
import { GLOBAL } from '../store/index.js'
import authHeader from './auth-header';

const PARTY_LEGALPERSON_CREATE = '/api/party/legalperson/create';
const PARTY_LEGALPERSON_GET_BY_USER = '/api/party/user/legalpersonlist';
const PARTY_GET_ALL = '/api/party/all';
const PARTY_GET_PRIV_PERSON_BY_USER = '/api/party/priv';
const PARTY_GET_BY_ID = '/api/party/';
const OWNERSHIP = '/ownership';
const AVBL_QTY = "/qty/avbl";
const ASSET = "/asset/";
const BAL_SHEET_BY_PARTY_ID = '/api/fin-stmt/balsheet/party/';
const BAL_SHEET_PREV_BY_PARTY_ID = '/api/fin-stmt/balsheet/prev/party/';
const FIN_STMT_BY_TYPE = '/api/fin-stmt/type/';
const FIN_YEAR = '/finyear/';
const HIST_CNT = '/hist-cnt/';
const PARTY_ID = '/party/';
const CRED_FACILITY_GET_BY_PARTY_ID = '/api/party/cred-facility/party/';

class PartyService {
  
  getOwnerShipList(partyId) {
    return axios
      .get(GLOBAL.API_BASE_URL + PARTY_GET_BY_ID + partyId + OWNERSHIP, { headers: authHeader() });
  }

  getCredFacility(partyId) {
    return axios
      .get(GLOBAL.API_BASE_URL + CRED_FACILITY_GET_BY_PARTY_ID + partyId, { headers: authHeader() });
  }

  createParty(party) {
    return axios
      .post(GLOBAL.API_BASE_URL + PARTY_LEGALPERSON_CREATE, party, { headers: authHeader() });
  }

  getLegalPersonByOwnerUser() {
    return axios
      .get(GLOBAL.API_BASE_URL + PARTY_LEGALPERSON_GET_BY_USER, { headers: authHeader() });
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

  getFinStmtByPartyIdAndFinYearAndFinStmtType(partyId, finYear, finStmtType) {
    return axios
      .get(GLOBAL.API_BASE_URL + FIN_STMT_BY_TYPE + finStmtType + FIN_YEAR + finYear + PARTY_ID + partyId, { headers: authHeader() });
  }

  getFinStmtByPartyIdAndFinYearAndFinStmtTypeHist(partyId, finYear, finStmtType, histCnt) {
    return axios
      .get(GLOBAL.API_BASE_URL + FIN_STMT_BY_TYPE + finStmtType + FIN_YEAR + finYear + PARTY_ID + partyId + HIST_CNT + histCnt, { headers: authHeader() });
  }
}

export default new PartyService();