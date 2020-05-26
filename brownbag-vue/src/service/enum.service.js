import axios from 'axios';
import { GLOBAL } from '../store/index.js'
import authHeader from './auth-header';

const ENUM_GET_LEGAL_FORM = '/api/enum/legalform/all';


class AssetService {
  getLegalFormList() {
    return axios
      .get(GLOBAL.API_BASE_URL + ENUM_GET_LEGAL_FORM, { headers: authHeader() });
  }

}

export default new AssetService();