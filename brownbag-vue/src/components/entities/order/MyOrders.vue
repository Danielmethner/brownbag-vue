<template>
  <div class="row">
    <div class="col-md-12">
      <b-table
        striped
        hover
        :items="myorders"
        :fields="headers"
       thead-tr-class="table-info"
        sort-icon-left
      >
        <template v-slot:cell(orderDir)="data">
          <span class="font-weight-bold" :class="formatDir(data.item.orderDir)">{{ data.item.orderDir }}</span>
        </template>
        <template v-slot:cell(qty)="data">{{ data.item.qty }}</template>
        <template v-slot:cell(qtyExec)="data">{{ data.item.qtyExec }}</template>
        <template v-slot:cell(priceLimit)="data">{{ data.item.priceLimit | toCurrency }}</template>
      </b-table>
    </div>
  </div>
</template>

<script>
import OrderService from "@/service/order.service";

export default {
  name: "MyOrders",
  data() {
    return {
      myorders: [],
      headers: [
        { label: "Order ID", key: "id", sortable: true },
        { label: "Asset", key: "assetName", sortable: true },
        { label: "Buy/ Sell", key: "orderDir", sortable: true },
        { label: "Quantity", key: "qty", sortable: true },
        { label: "Qty Exec", key: "qtyExec", sortable: true },
        { label: "Price", key: "priceLimit", sortable: true },
        {
          label: "Status",
          key: "orderStatus",
          sortable: true,
          filterByFormatted: true
        }
      ]
    };
  },
  mounted() {
    this.getMyOrders();
  },
  methods: {
    getMyOrders() {
      OrderService.getOrdersByUser().then(response => {
        this.myorders = [];
        response.data.forEach(order => {
          this.myorders.push(order);
        });
      });
    },
    formatDir(direction) {
      return direction == "BUY" ? "text-success" : "text-danger";
    }
  }
};
</script>

<style scoped>
.buy {
  color: green !important;
}
.sell {
  color: red !important;
}
</style>