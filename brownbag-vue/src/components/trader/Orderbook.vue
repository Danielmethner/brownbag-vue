<template>
  <div>
    <div class="row">
      <div class="col-md-10">
        <header class="jumbotron">
          <h1>Orderbook</h1>
          <h3>Current market orders by Yourself and others</h3>
        </header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5">
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
            <tr v-for="order in orderbook.buyorders" v-bind:key="order.id">
              <td>{{order.id}}</td>
              <td>{{order.asset.name}}</td>
              <td>{{order.qty}}</td>
              <td>$ {{order.price}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-5">
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
            <tr v-for="sellorder in orderbook.sellorders" v-bind:key="sellorder.id">
              <td>{{sellorder.id}}</td>
              <td>{{sellorder.asset.name}}</td>
              <td>- {{sellorder.qty}}</td>
              <td>$ {{sellorder.price}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      content: "",
      orderbook: {
        buyorders: [
          {
            asset: { name: "Deutsche Bank" },
            id: 1,
            qty: 100,
            price: 20
          },
          {
            asset: { name: "Deutsche Bank" },
            id: 24,
            qty: 200,
            price: 12
          },
          {
            asset: { name: "Deutsche Bank" },
            id: 32,
            qty: 150,
            price: 22
          }
        ],
        sellorders: [
          {
            asset: { name: "Deutsche Bank" },
            id: 12,
            qty: 100,
            price: 20
          },
          {
            asset: { name: "Deutsche Bank" },
            id: 22,
            qty: 200,
            price: 12
          },
          {
            asset: { name: "Deutsche Bank" },
            id: 30,
            qty: 150,
            price: 22
          }
        ]
      }
    };
  },
  mounted() {
    // UserService.getUserBoard().then(
    //   response => {
    //     this.content = response.data;
    //   },
    //   error => {
    //     this.content =
    //       (error.response && error.response.data) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
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
