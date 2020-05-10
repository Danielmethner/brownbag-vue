<template>
  <div>
    <header class="jumbotron">
      <h1>Market Research</h1>
      <h3>Analyse Market Depth and Corporate Data</h3>
    </header>
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="Public Orderbook" @click="refreshOrderbook()">
          <Orderbook ref="orderbook"></Orderbook>
        </b-tab>
        <b-tab title="Business Analysis">
          <Asset></Asset>
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
// import AssetBase from "@/components/asset/AssetBase";
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
