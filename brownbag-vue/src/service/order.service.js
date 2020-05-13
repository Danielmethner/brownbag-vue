import axios from 'axios';
import { GLOBAL } from '../store/index.js';
const ORDER_STEX_PLACE = '/api/order/stex/place';
const ORDER_GET_BY_USER = '/api/order/stex/user'
const ORDER_GET_BY_PARTY = '/api/order/stex/party/'
const ORDER_GET_PLACED_AND_ASSET = '/api/order/stex/placed/asset/'
import jsonHeader from './json-header';

class OrderService {
  placeOrder(order) {
    return axios
      .post(GLOBAL.API_BASE_URL + ORDER_STEX_PLACE, order, { headers: jsonHeader() });
  }

  getOrdersByUser() {
    return axios
      .get(GLOBAL.API_BASE_URL + ORDER_GET_BY_USER, { headers: jsonHeader() });
  }

  getByParty(partyId) {
    if(partyId != null) {
      return axios
        .get(GLOBAL.API_BASE_URL + ORDER_GET_BY_PARTY + partyId, { headers: jsonHeader() });
    } else {
      return null;
    }
  }

  getOrdersByPlacedAndAsset(assetId) {
    return axios
      .get(GLOBAL.API_BASE_URL + ORDER_GET_PLACED_AND_ASSET + assetId, { headers: jsonHeader() });
  }
}

export default new OrderService();