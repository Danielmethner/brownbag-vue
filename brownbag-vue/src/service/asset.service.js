import axios from 'axios';
import { GLOBAL } from '../store/index.js'
import authHeader from './auth-header';
import store from '../store';

const ASSET_GET_ALL_SEC = '/api/asset/stock/all';
const BAL_SHEET_BY_ID = '/api/balsheet/party/';

class AssetService {
  getAllSec() {
    return axios
      .get(GLOBAL.API_BASE_URL + ASSET_GET_ALL_SEC, { headers: authHeader() });
  }

  getByIdCache(assetId) {
    return store.state.assets.find(asset => asset.id == assetId);
  }

  getBalSheetByPartyId(partyId) {
    return axios
      .get(GLOBAL.API_BASE_URL + BAL_SHEET_BY_ID +  partyId, { headers: authHeader() });
  }
}

export default new AssetService();