<template>
   <div class="row justify-content-md-center">
    <div class="col" v-for="finStmt in finStmtList" :key="finStmt.id">
      <h3>{{ finStmt.name }}</h3>
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
              <td class="col-md-8">{{item.itemTypeName}}</td>
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
  </div>
</template>

<script>
import SettingsService from "@/service/settings.service";
import PartyService from "@/service/party.service";

export default {
  name: "FinStmt",
  data() {
    return {
      finStmt: {},
      finStmtNameData: "Financial Statement",
      finStmtList: []
    };
  },
  methods: {
    showFinStmtList(finStmtList) {
      this.finStmtList = finStmtList;
    },
    getFinStmt(partyId, finStmtType) {
      let currentYear;
      SettingsService.getFinYear().then(response => {
        currentYear = response.data;
        PartyService.getFinStmtByPartyIdAndFinYearAndFinStmtTypeHist(
          partyId,
          currentYear,
          finStmtType,
          2
        ).then(
          
          response => {
            this.finStmtList = response.data;
            this.showFinStmtList(this.finStmtList);
          },
          error => {
            this.finStmtList.push({
              name: "Financial Statement could not be found: " + error
            });
          }
        );
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