<template>
  <div>
    <div class="row justify-content-md-center">
      <div class="col-md-2"></div>
      <div class="col" v-if="balanceSheetPrev.name">
        <h3>{{balanceSheetPrev.name}}</h3>
        <div v-for="section in balanceSheetPrev.sections" v-bind:key="section.name">
          <table class="table table-striped">
            <thead class="table-dark">
              <tr v-bind:class="section.style">
                <th class="col-md-8">{{section.section}}</th>
                <th class="col-md-2 text-right">{{balanceSheetPrev.finYear}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in section.items" v-bind:key="item.name">
                <td class="col-md-8">{{item.itemType}}</td>
                <td class="col-md-4 text-right">{{item.qty | toCurrency}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col">
        <h3>{{balanceSheet.name}}</h3>
        <div v-for="section in balanceSheet.sections" v-bind:key="section.name">
          <table class="table table-striped">
            <thead class="table-dark">
              <tr v-bind:class="section.style">
                <th class="col-md-8">{{section.section}}</th>
                <th class="col-md-2 text-right">{{balanceSheet.finYear}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in section.items" v-bind:key="item.name">
                <td class="col-md-8">{{item.itemType}}</td>
                <td class="col-md-4 text-right">{{item.qty | toCurrency}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
import PartyService from "@/service/party.service";

export default {
  name: "BalanceSheet",
  data() {
    return {
      balanceSheet: {
        name: "Balance Sheet"
      },
      balanceSheetPrev: {}
    };
  },
  methods: {
    getBalSheet(partyId) {
      this.balanceSheet = {};
      this.balanceSheet.name = "Loading Balance Sheet";
      PartyService.getBalSheetByPartyId(partyId).then(response => {
        this.balanceSheet = response.data;
      });

      this.balanceSheetPrev = {};
      PartyService.getBalSheetByPartyIdPrev(partyId).then(response => {
        this.balanceSheetPrev = response.data;
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