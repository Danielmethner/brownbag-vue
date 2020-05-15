<template>
  <div>
    <div class="row" v-show="myorders.length > 0">
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
            <span
              class="font-weight-bold"
              :class="formatDir(data.item.orderDir)"
            >{{ data.item.orderDir }}</span>
          </template>
          <!-- <template v-slot:cell(qty)="data">{{ data.item.qty | toNumber }}</template> -->
          <template v-slot:cell(qtyExec)="data">{{ data.item.qtyExec }}</template>
          <template v-slot:cell(priceLimit)="data">{{ data.item.priceLimit | toCurrency }}</template>
          <template v-slot:cell(discard)="row">
            <b-button size="sm" variant="outline-danger" @click="discardOrder(row.item)" v-if="discardeable(row.item)" >Discard</b-button>
          </template>
        </b-table>
      </div>
    </div>
    <div class="row" v-show="myorders.length==0">
      <div class="col-md-12">
        <h2>Please wait. If no orders appear here, the user may not have placed any orders yet.</h2>
      </div>
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
        },
        {key: "discard" },
      ]
    };
  },
  mounted() {},
  methods: {
    discardeable(orderStex) {
      return ['PLACED'].includes(orderStex.orderStatus);
    },
    discardOrder(orderStex) {
      OrderService.discardOrder(orderStex.id).then(() => {
        this.getMyOrders(orderStex.partyId);
      });
    },
    getMyOrders(partyId) {
      this.myorders = [];
      OrderService.getByParty(partyId).then(response => {
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