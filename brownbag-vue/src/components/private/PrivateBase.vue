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
        <IncomeStatement></IncomeStatement>-->
        <!-- </b-tab> -->

        <b-tab title="New Order" @click="genNewOrder()">
          <NewOrder ref="newOrder"></NewOrder>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import Portfolio from "@/components/entities/pos/Portfolio";
import MyOrders from "@/components/entities/order/MyOrders";
import NewOrder from "@/components/entities/order/NewOrder";
import Orderbook from "@/components/entities/order/Orderbook";
// import AssetBase from "@/components/asset/AssetBase";
export default {
  name: "PrivateBase",
  data() {
    return {
      content: ""
    };
  },
  methods: {
    genNewOrder() {
      this.$refs.newOrder.genNewOrder(this.$store.state.party.privatePerson, true);
    },
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
