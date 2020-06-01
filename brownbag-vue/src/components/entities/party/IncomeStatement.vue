<template>
  <div>
    <div class="row justify-content-md-center">
      <div class="col-md-2"></div>
      <div class="col" v-show="showChild">
        <FinStmt ref="finStmtPrevYear" @exists="childExists" ></FinStmt>
      </div>
      <div class="col">
        <FinStmt ref="finStmtCurrYear"></FinStmt>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
import SettingsService from "@/service/settings.service";
import FinStmt from "@/components/entities/party/FinStmt";
import { GLOBAL } from '@/store/index.js'

export default {
  name: "IncomeStmt",
  data() {
    return {
      finStmt: {
        name: "Income Statement"
      },
      finStmtPrev: {},
      showChild: false
    };
  },
  methods: {
    childExists(exists){
       this.showChild = exists;
    },
    getFinStmt(partyId) {
      let currentYear;
      SettingsService.getFinYear().then(response => {
        currentYear = response.data;
        this.$refs.finStmtPrevYear.getFinStmtByPartyIdAndFinYearAndFinStmtType(
          partyId,
          currentYear - 1,
          GLOBAL.FIN_STMT_TYPE.INCOME_STMT,
          true
        );
        this.$refs.finStmtCurrYear.getFinStmtByPartyIdAndFinYearAndFinStmtType(
          partyId,
          currentYear,
          GLOBAL.FIN_STMT_TYPE.INCOME_STMT,
          false
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