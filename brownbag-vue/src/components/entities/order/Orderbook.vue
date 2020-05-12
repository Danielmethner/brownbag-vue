<template>
  <div>
    <div class="row">
      <div class="col-md-6 text-center">
        <h4>Current market orders by Yourself and others</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <table class="table table-striped">
          <thead class="table-dark">
            <tr class="bg-success">
              <th colspan="4" scope="colgroup" class="bg-success">Buy</th>
            </tr>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Asset</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orderbook.buyOrders" v-bind:key="order.id">
              <td>{{order.id}}</td>
              <td>{{order.assetName}}</td>
              <td>{{order.qty}}</td>
              <td>$ {{order.priceLimit}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <table class="table table-striped">
          <thead class="table-dark">
            <tr class="bg-success">
              <th colspan="4" scope="colgroup" class="bg-danger">Sell</th>
            </tr>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Asset</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sellorder in orderbook.sellOrders" v-bind:key="sellorder.id">
              <td>{{sellorder.id}}</td>
              <td>{{sellorder.assetName}}</td>
              <td>{{sellorder.qty}}</td>
              <td>$ {{sellorder.priceLimit}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import OrderService from "@/service/order.service";
export default {
  name: "UserProfile",
  data() {
    return {
      content: "",
      orderbook: {
        buyOrders: [],
        sellOrders: []
      }
    };
  },
  methods: {
    refreshOrderbook() {
      this.orderbook.buyOrders = [];
      this.orderbook.sellOrders = [];
      OrderService.getOrdersByPlaced().then(response => {
        response.data.forEach(order => {
          if (order.orderDir == "BUY") {
            this.orderbook.buyOrders.push(order);
          } else {
            this.orderbook.sellOrders.push(order);
          }
        });
      });
    }
  },
  mounted() {
    this.refreshOrderbook();
  }
};
</script>
<style>
.jumbotron {
  padding: 2em;
}
.amtPositive {
  color: green;
}

.amtNegative {
  color: red;
}
</style>
