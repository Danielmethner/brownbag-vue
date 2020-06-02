<template>
  <div v-if="finStmtName">
    <h3>{{ finStmtName }}</h3>
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
</template>

<script>
import PartyService from "@/service/party.service";

export default {
  name: "FinStmt",
  data() {
    return {
      finStmt: {
      },
      finStmtNameData: "Financial Statement"
    };
  },
  computed: {
    finStmtName: function() {
      return this.finStmtNameData;
    }
  },
  methods: {
    getFinStmtByPartyIdAndFinYearAndFinStmtType(
      partyId,
      finYear,
      finStmtType,
      checkExistence
    ) {
      this.finStmt = {};
      this.finStmtNameData = "Loading Financial Statement";
      
      PartyService.getFinStmtByPartyIdAndFinYearAndFinStmtType(
        partyId,
        finYear,
        finStmtType
      ).then(
        response => {
          if (response.data) {
            this.finStmt = response.data;
            this.finStmtNameData = this.finStmt.name;
            if (checkExistence) {
              if (!(response.data.length > 0)) {
                this.$emit("exists", true);
              } else {
                this.$emit("exists", false);
              }
            }
          }
        },
        error => {
          this.finStmtNameData =
            "Financial Statement could not be found: " + error;
        }
      );
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