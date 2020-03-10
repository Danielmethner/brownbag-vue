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
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in myorders" v-bind:key="order.id">
            <td>{{order.id}}</td>
            <td>{{order.asset.name}}</td>
            <td>{{order.direction}}</td>
            <td>{{order.qty}}</td>
            <td>$ {{order.price}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyOrders",
  data() {
    return {
      myorders: [
        {
          id: 1,
          asset: { name: "Deutsche Bank" },
          direction: "BUY",
          qty: 100,
          price: 20
        }
      ]
    };
  }
};
</script>

<style>
</style>