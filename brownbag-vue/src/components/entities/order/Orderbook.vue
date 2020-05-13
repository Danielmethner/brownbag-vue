<template>
  <div>
    <div class="row">
      <div class="col-md-6 text-center"></div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <b-table
          striped
          hover
          :items="orderbook.buyOrders"
          :fields="headers"
          head-variant="dark"
          sort-icon-left
        >
          <template v-slot:thead-top="data">
            <b-tr>
              <b-th class="bg-success" colspan="4">BUY</b-th>
            </b-tr>
          </template>
          <template v-slot:cell(priceLimit)="data">{{ data.item.priceLimit | toCurrency }}</template>
        </b-table>
      </div>
      <div class="col-md-6">
        <b-table
          striped
          hover
          :items="orderbook.sellOrders"
          :fields="headers"
          head-variant="dark"
          sort-icon-left
        >
          <template v-slot:thead-top="data">
            <b-tr>
              <b-th class="bg-danger" colspan="4">SELL</b-th>
            </b-tr>
          </template>
          <template v-slot:cell(priceLimit)="data">{{ data.item.priceLimit | toCurrency }}</template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import OrderService from "@/service/order.service";
export default {
  name: "UserProfile",
  data() {
    return {
      content: "",
      orderbook: {
        buyOrders: [],
        sellOrders: []
      },
      headers: [
        { label: "Order ID", key: "id", sortable: true },
        { label: "Asset", key: "assetName", sortable: true },
        { label: "Quantity", key: "qty", sortable: true },
        { label: "Price", key: "priceLimit", sortable: true }
      ]
    };
  },
  methods: {
    getOrderbook(assetId) {
      this.orderbook.buyOrders = [];
      this.orderbook.sellOrders = [];
      if (assetId) {
        OrderService.getOrdersByPlacedAndAsset(assetId).then(response => {
          response.data.forEach(order => {
            if (order.orderDir == "BUY") {
              this.orderbook.buyOrders.push(order);
            } else {
              this.orderbook.sellOrders.push(order);
            }
          });
        });
      }
    }
  },
  mounted() {
    this.getOrderbook();
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
