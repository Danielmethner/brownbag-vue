import axios from 'axios';
import { GLOBAL } from '../store/index.js'
import authHeader from './auth-header';

const LOGS_GET_RECENT = '/api/settings/log/recent';

class SettingsService {
  getLogs() {
    return axios
      .get(GLOBAL.API_BASE_URL + LOGS_GET_RECENT, { headers: authHeader() });
  }
}

export default new SettingsService();