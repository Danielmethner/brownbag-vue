<template>
  <div class="row">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-12  text-center">
          <h4>Order placed by yourself</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <table class="table table-striped">
            <thead class="table-dark">
              <tr class="bg-success"></tr>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Asset</th>
                <th scope="col">Buy/ Sell</th>
                <th scope="col">Qty</th>
                <th scope="col">Qty Executed</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in myorders" v-bind:key="order.id">
                <td>{{order.id}}</td>
                <td>{{order.assetName}}</td>
                <td :class="formatDir(order.orderDir)">
                  <b>{{order.orderDir}}</b>
                </td>
                <td>{{order.qty}}</td>
                <td>{{order.qtyExec}}</td>
                <td>$ {{order.priceLimit}}</td>
                <td>{{order.orderStatus}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderService from "../../service/order.service";

export default {
  name: "MyOrders",
  data() {
    return {
      myorders: []
    };
  },
  mounted() {
    this.getMyOrders();
  },
  methods: {
    getMyOrders() {
      OrderService.getOrdersByUser().then(response => {
        this.myorders = [];
        response.data.forEach(order => {
          this.myorders.push(order);
        });
      });
    },
    formatDir(direction) {
      return direction == "BUY" ? "text-success" : "text-danger";
    }
  }
};
</script>

<style scoped>
.buy {
  color: green !important;
}
</style>