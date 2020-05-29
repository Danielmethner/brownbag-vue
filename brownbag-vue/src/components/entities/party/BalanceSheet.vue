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
      this.$refs.balSheetPrevYear.getBalSheetByPartyIdPrev(partyId);
      this.$refs.balSheetCurrYear.getBalSheetByPartyId(partyId);
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