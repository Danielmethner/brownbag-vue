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
      ></b-table>    
    </div>
  </div>
</template>

            <!-- head-variant="dark" -->
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
        { label: "Curr. Price", key: "priceAvg", sortable: true },
        { label: "P/L [%]", key: "priceLimit", sortable: true },
      ]
    };
  },
  methods: {
    getPortfolio() {
      PosService.getPosPrivateByUser().then(response => {
        this.positions = [];
        response.data.forEach(pos => {
          this.positions.push(pos);
        });
      });
    }
  },
  mounted() {

    // PosService.getPosByParty(party).then(response => {
    //   this.positions = [];
    //   response.data.forEach(pos => {
    //     this.positions.push(pos);
    //   });
    // });
  },
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
