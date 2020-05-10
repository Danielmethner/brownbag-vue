<template>
  <div>
    <header class="jumbotron">
      <h1>Personal Information</h1>
    </header>
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="My Portfolio" active @click="getPortfolio()">
          <Portfolio ref="portfolio"></Portfolio>
        </b-tab>
        <b-tab title="My Orders" active @click="getMyOrders()">
          <MyOrders ref="myOrders"></MyOrders>
        </b-tab>
        <!-- <b-tab title="Balance Sheet">
          <BalSheet></BalSheet>
        </b-tab>
        <b-tab title="Income Statement">
          <IncomeStatement></IncomeStatement> -->
        <!-- </b-tab> -->
      </b-tabs>
    </div>
  </div>
</template>

<script>
import Portfolio from "@/components/pos/Portfolio";
import MyOrders from "@/components/private/MyOrders";
import NewOrder from "@/components/private/NewOrder";
import Orderbook from "@/components/private/Orderbook";
// import AssetBase from "@/components/asset/AssetBase";
export default {
  name: "PrivateBase",
  data() {
    return {
      content: ""
    };
  },
  methods: {
    getPortfolio() {
      this.$refs.portfolio.getPortfolio();
    },
    getMyOrders() {
      this.$refs.myOrders.getMyOrders();
    },
    refreshOrderbook() {
      this.$refs.orderbook.refreshOrderbook();
    }
  },
  components: {
    Portfolio,
    MyOrders,
    NewOrder,
    Orderbook
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
