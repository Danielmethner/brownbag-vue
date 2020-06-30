<template>
  <div>
    <div class="row justify-content-md-center">
        <FinStmt ref="finStmtList"></FinStmt>
    </div>
  </div>
</template>

<script>
import SettingsService from "@/service/settings.service";
import PartyService from "@/service/party.service";
import FinStmt from "@/components/entities/party/NewFinStmt";
import { GLOBAL } from "@/store/index.js";

export default {
  name: "NewBalanceSheet",
  data() {
    return {
      finStmt: {
        name: "New Balance Sheet"
      },
      finStmtLoaded: false,
      finStmtList: []
    };
  },
  methods: {
    getFinStmt(partyId) {
      let currentYear;
      SettingsService.getFinYear().then(response => {
        currentYear = response.data;
        PartyService.getFinStmtByPartyIdAndFinYearAndFinStmtTypeHist(
          partyId,
          currentYear,
          "BAL_SHEET",
          2
        ).then(
          response => {
            console.log();
            this.finStmtList = response.data;
            this.$refs.finStmtList.showFinStmtList(this.finStmtList);
          },
          error => {
            this.finStmtList.push({
              name: "Financial Statement could not be found: " + error
            });
          }
        );
      });
    }
  },
  components: {
    FinStmt
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