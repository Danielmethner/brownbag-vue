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
import MyOrders from "@/components/entities/order/MyOrders";
import NewOrder from "@/components/entities/order/NewOrder";
import Orderbook from "@/components/entities/order/Orderbook";
import Portfolio from "@/components/entities/pos/Portfolio";
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
