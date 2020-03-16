import axios from 'axios';
import { GLOBAL } from '../store/index.js'
const ASSET_GET_ALL_SEC = '/api/asset/sec/all';
import authHeader from './auth-header';

class AssetService {
  getAllSec() {
    return axios
      .get(GLOBAL.API_BASE_URL + ASSET_GET_ALL_SEC, { headers: authHeader() });
  }
}

export default new AssetService();