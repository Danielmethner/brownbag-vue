<template>
  <div class="row">
    <div class="col-md-12">
      <b-table
        striped
        hover
        :items="positions"
        :fields="headers"
        thead-tr-class="table-info"
        sort-icon-left
      >
        <template v-slot:cell(qty)="data">{{ data.item.qty | toNumber }}</template>
        <template v-slot:cell(priceAvg)="data">{{ data.item.priceAvg | toCurrency }}</template>
        <template v-slot:cell(priceLast)="data">{{ data.item.priceLast | toCurrency }}</template>
        <template
          v-slot:cell(profitLoss)="data"          
        ><div v-bind:class="formatProfitLoss(data.item.profitLoss)">{{ data.item.profitLoss / 100| toPercent }}</div></template>
      </b-table>
    </div>
  </div>
</template>
<script>
import PosService from "@/service/pos.service";

export default {
  name: "Portfolio",
  data() {
    return {
      content: "",
      positions: [],
      party: null,
      headers: [
        { label: "Pos ID", key: "id", sortable: true },
        { label: "Asset", key: "assetName", sortable: true },
        { label: "Qty", key: "qty", sortable: true },
        { label: "Qty Blocked", key: "qtyBlocked", sortable: true },
        { label: "Buy Price", key: "priceAvg", sortable: true },
        { label: "Last Price", key: "priceLast", sortable: true },
        { label: "P/L [%]", key: "profitLoss", sortable: true }
      ]
    };
  },
  methods: {
    formatProfitLoss(value) {
return value == 0 ? null : value >= 0  ? 'amtPositive' : 'amtNegative'
    },
    getPortfolio(partyId) {
      this.positions = [];
      PosService.getPosByPartyId(partyId).then(response => {
        response.data.forEach(pos => {
          if (pos.qty > 0) {
            this.positions.push(pos);
          }
        });
      });
    }
  },
  mounted() {},
  calculated() {}
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
