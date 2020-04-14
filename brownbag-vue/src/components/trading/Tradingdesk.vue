<template>
  <div>
    <header class="jumbotron">
      <h1>Trading Desk</h1>
      <h3>Place and modify orders</h3>
    </header>
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="Public Orderbook" @click="refreshOrderbook()">
          <Orderbook ref="orderbook"></Orderbook>
        </b-tab>
        <b-tab title="My Orders" active @click="getMyOrders()">
          <MyOrders ref="myOrders"></MyOrders>
        </b-tab>
        <b-tab title="My Portfolio">
          <Portfolio></Portfolio>
        </b-tab>
        <b-tab title="New Order">
          <NewOrder></NewOrder>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import MyOrders from "@/components/trading/MyOrders";
import NewOrder from "@/components/trading/NewOrder";
import Orderbook from "@/components/trading/Orderbook";
import Portfolio from "@/components/trading/Portfolio";
export default {
  name: "TradingDesk",
  data() {
    return {
      content: ""
    };
  },
  methods: {
    getMyOrders() {
      this.$refs.myOrders.getMyOrders();
    },
    refreshOrderbook() {
      this.$refs.orderbook.refreshOrderbook();
    }
  },
  components: {
    MyOrders,
    NewOrder,
    Orderbook,
    Portfolio
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
