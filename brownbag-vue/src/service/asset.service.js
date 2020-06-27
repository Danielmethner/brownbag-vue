import axios from 'axios';
import { GLOBAL } from '../store/index.js'
import authHeader from './auth-header';
import store from '../store';

const ASSET_GET_ALL_SEC = '/api/asset/sec/all';


class AssetService {
  getAllSec() {
    return axios
      .get(GLOBAL.API_BASE_URL + ASSET_GET_ALL_SEC, { headers: authHeader() });
  }

  getByIdCache(assetId) {
    return store.state.assets.find(asset => asset.id == assetId);
  }


}

export default new AssetService();