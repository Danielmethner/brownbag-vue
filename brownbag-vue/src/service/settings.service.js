import axios from 'axios';
import { GLOBAL } from '../store/index.js'
import authHeader from './auth-header';

const LOGS_GET_RECENT = '/api/settings/log/recent';
const CTRL_VARS_GET_ALL = '/api/settings/ctrlvar';
const CTRL_VARS_GET_BY_ENUM = '/api/settings/ctrlvar/';
const CTRL_VARS_GET_FIN_YEAR = '/api/settings/ctrlvar/finyear';
const CTRL_VARS_SWITCH_FIN_YEAR = '/api/settings/ctrlvar/finyear/switch';

class SettingsService {
  getLogs() {
    return axios
      .get(GLOBAL.API_BASE_URL + LOGS_GET_RECENT, { headers: authHeader() });
  }
  getCtrlVars() {
    return axios
      .get(GLOBAL.API_BASE_URL + CTRL_VARS_GET_ALL, { headers: authHeader() });
  }

  getCtrlVarByEnum(enumKey) {
    return axios
      .get(GLOBAL.API_BASE_URL + CTRL_VARS_GET_BY_ENUM + enumKey, { headers: authHeader() });
  }

  getFinYear() {
    return axios
      .get(GLOBAL.API_BASE_URL + CTRL_VARS_GET_FIN_YEAR, { headers: authHeader() });
  }
  switchFinYear() {
    return axios
      .get(GLOBAL.API_BASE_URL + CTRL_VARS_SWITCH_FIN_YEAR, { headers: authHeader() });

  }
}

export default new SettingsService();