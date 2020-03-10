<template>
  <div class="container">
    <header class="jumbotron">
      <h1>Trading Desk</h1>
      <h3>Place and modify orders</h3>
    </header>
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="My Orders" active>
          <MyOrders></MyOrders>
        </b-tab>
        <b-tab title="Place new Order">
          <p>I'm the second tab</p>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import MyOrders from "@/components/trader/MyOrders";
export default {
  name: "TradingDesk",
  data() {
    return {
      content: ""
    };
  },
  components: {
    MyOrders
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
