import axios from 'axios';
import { GLOBAL } from '../store/index.js'
import authHeader from './auth-header';

const LOGS_GET_RECENT = '/api/settings/log/recent';
const CTRL_VARS_GET_ALL = '/api/settings/ctrl-var';

class SettingsService {
  getLogs() {
    return axios
      .get(GLOBAL.API_BASE_URL + LOGS_GET_RECENT, { headers: authHeader() });
  }
  getCtrlVars() {
        return axios
      .get(GLOBAL.API_BASE_URL + CTRL_VARS_GET_ALL, { headers: authHeader() });
  }
}

export default new SettingsService();