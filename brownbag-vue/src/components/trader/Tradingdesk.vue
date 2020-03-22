<template>
  <div>
    <header class="jumbotron">
      <h1>Trading Desk</h1>
      <h3>Place and modify orders</h3>
    </header>
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="My Orders" active @click="getMyOrders()">
          <MyOrders ref="myOrders"></MyOrders>
        </b-tab>
        <b-tab title="New Order">
          <NewOrder></NewOrder>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import MyOrders from "@/components/trader/MyOrders";
import NewOrder from "@/components/trader/NewOrder";
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
    }
  },
  components: {
    MyOrders,
    NewOrder
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
