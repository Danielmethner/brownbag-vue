<template>
  <div class="container">
    <header class="jumbotron">
      <h1>Trading Desk</h1>
      <h3>Place and modify orders</h3>
    </header>
    <div>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Asset</th>
            <th scope="col">Qty</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="position in positions" v-bind:key="position.id">
            <td>{{position.asset.name}}</td>
            <td>{{position.qty}}</td>
            <td>$ {{position.buyPrice}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </div>
</template>

<script>
// import UserService from "../service/user.service";
// Create our number formatter.
// var formatter = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'USD',
// });

export default {
  name: "UserProfile",
  data() {
    return {
      content: "",
      positions: [
        {
          asset: { name: "Deutsche Bank", currPrice: 100 },
          id: 1,
          qty: 100,
          buyPrice: 20,
          buyVal: function() {
            return this.qty * this.buyPrice;
          },
          currVal: function() {
            return this.qty * this.asset.currPrice;
          },
          pl: function() {
            return this.currVal() - this.buyVal();
          },
          plPerc: function() {
            return this.pl() / (this.buyVal() / 100);
          }
        },
        {
          asset: { name: "Cash", currPrice: 11 },
          id: 2,
          qty: 100,
          buyPrice: 20,
          buyVal: function() {
            return this.qty * this.buyPrice;
          },
          currVal: function() {
            return this.qty * this.asset.currPrice;
          },
          pl: function() {
            return this.currVal() - this.buyVal();
          },
          plPerc: function() {
            return this.pl() / (this.buyVal() / 100);
          }
        }
      ]
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
.container {
  min-width: 800px;
}

.amtPositive {
  color: green;
}

.amtNegative {
  color: red;
}
</style>
