<template>
  <div>
    <div class="row justify-content-md-center">
      <div class="col-md-2"></div>
      <div class="col">
        <FinStmt ref="finStmtPrevYear"></FinStmt>
      </div>
      <div class="col">
       <FinStmt ref="finStmtCurrYear"></FinStmt>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
import PartyService from "@/service/party.service";
import FinStmt from "@/components/entities/party/FinStmt";
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
      this.$refs.finStmtPrevYear.getFinStmtByPartyIdAndFinYearAndFinStmtType(partyId);
      this.$refs.finStmtCurrYear.getFinStmtByPartyIdAndFinYearAndFinStmtType(partyId);
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