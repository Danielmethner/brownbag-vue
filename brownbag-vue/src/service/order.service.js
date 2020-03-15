// import axios from 'axios';
// import {GLOBAL} from '../store/index.js'
// const ORDER_PLACE = '/api/order/place';

class OrderService {
  placeOrder(order) {
    return order;
    // return axios
    //   .post(GLOBAL.BASE_URL + ORDER_PLACE, order)
    //   .then(response => {
		
    //     return response;
    //   });
  }
}

export default new OrderService();