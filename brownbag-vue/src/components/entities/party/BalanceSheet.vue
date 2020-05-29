<template>
  <div>
    <div class="row justify-content-md-center">
      <div class="col-md-2"></div>
      <div class="col">
        <FinStmt ref="balSheetPrevYear"></FinStmt>
      </div>
      <div class="col">
        <FinStmt ref="balSheetCurrYear"></FinStmt>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
import PartyService from "@/service/party.service";
import SettingsService from "@/service/settings.service";
import FinStmt from "@/components/entities/party/FinStmt";
import { GLOBAL } from '@/store/index.js'

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
      let currentYear;
      SettingsService.getFinYear().then(response => {
        currentYear = response.data;
        console.log("load balance sheet");
        this.$refs.balSheetPrevYear.getFinStmtByPartyIdAndFinYearAndFinStmtType(
          partyId,
          currentYear - 1,
          GLOBAL.FIN_STMT_TYPE.BAL_SHEET
        );
        this.$refs.balSheetCurrYear.getFinStmtByPartyIdAndFinYearAndFinStmtType(
          partyId,
          currentYear,
          GLOBAL.FIN_STMT_TYPE.BAL_SHEET
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