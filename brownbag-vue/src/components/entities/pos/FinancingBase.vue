<template>
  <div>
    <div>
      <b-tabs content-class="mt-4">
        <b-tab title="Present Financing" @click="getFinancing()">
          <FinancingPos ref="financingPos"></FinancingPos>
        </b-tab>
        <b-tab title="Loan Application" @click="newLoanAppl()">
          <LoanAppl ref="loanAppl"></LoanAppl>
        </b-tab>

        <b-tab v-if="isBusiness" title="Bond Issuance" @click="newBondIssuance()">
          <BondIssue ref="bondIssuance"></BondIssue>
        </b-tab>

        <b-tab v-if="isCorp" title="Share Issuance" @click="newShareIssuance()">
          <ShareIssue ref="shareIssuance"></ShareIssue>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import FinancingPos from "@/components/entities/pos/FinancingPos";
import BondIssue from "@/components/entities/order/NewBondIssue";
import ShareIssue from "@/components/entities/order/NewShareIssue";
import LoanAppl from "@/components/entities/order/NewLoanAppl";
export default {
  name: "FinancingBase",
  data() {
    return {
      party: null
    };
  },
  computed: {
    isBusiness: function() {
      if (this.party != null) {
        return this.party.partyType == "PERSON_LEGAL";
      }
    },
    isCorp: function() {
      if (this.party != null) {
        return this.party.legalForm == "CORP";
      }
    }
  },
  methods: {
    getFinancingBase(party) {
      this.party = party;
      this.getFinancing(party);
      if(this.$refs.bondIssuance != null) {
        this.newBondIssuance();
      }
      if(this.$refs.shareIssuance  != null) {
        this.newShareIssuance();
      }
    },
    getFinancing(party) {
      if (party != null) {
        this.$refs.financingPos.getFinancing(party.id);
      }
    },
    newLoanAppl() {
      if (this.party != null && this.$refs.loanAppl  != null) {
        this.$refs.loanAppl.newLoanAppl(this.party);
      }
    },
    newShareIssuance() {
      if (this.party != null && this.$refs.shareIssuance  != null) {
        this.$refs.shareIssuance.newShareIssuance(this.party);
      } 
    },
    newBondIssuance() {
      if (this.party != null) {
        this.$refs.bondIssuance.newBondIssuance(this.party);
      } 
    }
  },
  components: {
    FinancingPos,
    BondIssue,
    ShareIssue,
    LoanAppl
  }
};
</script>
<style>
.jumbotron {
  padding: 2em;
}

.amtPositive {
  color: green;
}

.amtNegative {
  color: red;
}
</style>
