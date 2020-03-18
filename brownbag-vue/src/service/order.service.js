import axios from 'axios';
import { GLOBAL } from '../store/index.js';
const ORDER_PLACE = '/api/order/place';
const ORDER_GET_BY_USER = '/api/order/user'
const ORDER_GET_PLACED = '/api/order/all'
import jsonHeader from './json-header';

class OrderService {
  placeOrder(order) {
    return axios
      .post(GLOBAL.API_BASE_URL + ORDER_PLACE, order, { headers: jsonHeader() });
  }

  getOrdersByUser() {
    return axios
      .get(GLOBAL.API_BASE_URL + ORDER_GET_BY_USER, { headers: jsonHeader() });
  }

  getOrdersByPlaced() {
    return axios
    .get(GLOBAL.API_BASE_URL + ORDER_GET_PLACED, { headers: jsonHeader() });
  }
}

export default new OrderService();