<template>
  <div>
    <div class="row justify-content-md-center">
      <div class="col-md-6">
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
      }
    };
  },
  methods: {
    getBalSheet(partyId) {
      PartyService.getBalSheetByPartyId(partyId).then(response => {
        this.balanceSheet = {};
        this.balanceSheet = response.data;
      });
    }
  }
};
</script>

<style scoped>
.buy {
  color: green !important;
}
</style>