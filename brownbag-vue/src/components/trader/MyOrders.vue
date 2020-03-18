<template>
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
            <td>{{order.asset.name}}</td>
            <td><label>{{order.direction}}</label></td>
            <td>{{order.qty}}</td>
            <td>{{order.qty_exec}}</td>
            <td>$ {{order.price}}</td>
            <td>{{order.orderStatus.name}}</td>
          </tr>
        </tbody>
      </table>
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
    OrderService.getOrdersByUser().then(response => {
      response.data.forEach(order => {
        this.myorders.push(order);
      });
    });
  }
};
</script>

<style>
</style>