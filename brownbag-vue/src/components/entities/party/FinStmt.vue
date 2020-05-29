<template>
  <div v-if="finStmt.name">
    <h3>{{finStmt.name}}</h3>
    <div v-for="section in finStmt.sections" v-bind:key="section.name">
      <table class="table table-striped">
        <thead class="table-dark">
          <tr v-bind:class="section.style">
            <th class="col-md-8">{{section.section}}</th>
            <th class="col-md-2 text-right">{{finStmt.finYear}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in section.items" v-bind:key="item.name">
            <td class="col-md-8">{{item.itemType}}</td>
            <td class="col-md-4 text-right">{{item.qty | toCurrency}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="table-active">
            <th class="col-md-8">{{section.totalCaption}}</th>
            <th class="col-md-8 text-right">{{section.totalQty | toCurrency}}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import PartyService from "@/service/party.service";

export default {
  name: "FinStmt",
  data() {
    return {
      finStmt: {
        name: "Financial Statement"
      }
    };
  },
  methods: {
    getBalSheetByPartyIdPrev(partyId) {
      this.finStmt = {};
      this.finStmt.name = "Loading Balance Sheet";
      PartyService.getBalSheetByPartyIdPrev(partyId).then(response => {
        this.finStmt = response.data;
      });
    },
    getBalSheetByPartyId(partyId) {
      this.finStmt = {};
      this.finStmt.name = "Loading Balance Sheet";
      PartyService.getBalSheetByPartyId(partyId).then(response => {
        this.finStmt = response.data;
      });
    }
  }
};
</script>

<style scoped>
h3 {
  font-size: 1.4em;
}
.buy {
  color: green !important;
}
</style>