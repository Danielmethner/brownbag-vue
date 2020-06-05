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
        <template v-slot:cell(intrRate)="data">{{ data.item.intrRate/ 100 | toPercent }}</template>
        <template v-slot:cell(balance)="data">{{ data.item.balance | toCurrency }}</template>
        <template v-slot:cell(principal)="data">{{ data.item.principal | toCurrency }}</template>
        <template v-slot:cell(matDate)="data">{{ data.item.matDate | toLocalDate }}</template>
      </b-table>
    </div>
  </div>
</template>
<script>
import PosService from "@/service/pos.service";

export default {
  name: "FinancingPos",
  data() {
    return {
      content: "",
      positions: [],
      party: null,
      headers: [
        { label: "Pos ID", key: "id", sortable: true },
        { label: "Lender", key: "lenderName", sortable: true },
        { label: "Intr. Rate", key: "intrRate", sortable: true },
        { label: "Balance", key: "balance", sortable: true },
        { label: "Principal", key: "principal", sortable: true },
        { label: "Maturity", key: "matDate", sortable: true }
      ]
    };
  },
  methods: {
    getFinancing(partyId) {
      this.positions = [];
      PosService.getPosLoanByPartyId(partyId).then(response => {
        response.data.forEach(pos => {
          this.positions.push(pos);
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
