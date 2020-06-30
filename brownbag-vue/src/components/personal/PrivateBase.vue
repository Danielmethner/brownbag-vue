<template>
  <div>
    <header class="jumbotron">
      <h1>Personal Finance: {{personName}}</h1>
    </header>
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="Portfolio" @click="getPortfolio()">
          <Portfolio ref="portfolio"></Portfolio>
        </b-tab>
        <b-tab title="Financing" @click="getFinancingBase()">
          <FinancingBase ref="financingBase"></FinancingBase>
        </b-tab>
        <b-tab title="Transactions" @click="getPositions()">
          <Transactions ref="trx"></Transactions>
        </b-tab>
        <b-tab title="Orders" @click="getMyOrders()">
          <MyOrders ref="myOrders"></MyOrders>
        </b-tab>
        <b-tab title="Balance Sheet" @click="getBalSheet()">
          <BalSheet ref="balSheet"></BalSheet>
        </b-tab>
        <b-tab title="New Balance Sheet" @click="getNewBalSheet()">
          <NewBalSheet ref="newBalSheet"></NewBalSheet>
        </b-tab>
        <b-tab title="Income Statement" @click="getIncomeStmt()">
          <IncomeStatement ref="incomeStmt"></IncomeStatement>
        </b-tab>
        <b-tab title="New Order" @click="genNewOrder()">
          <NewOrder ref="newOrder"></NewOrder>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import Portfolio from "@/components/entities/pos/Portfolio";
import FinancingBase from "@/components/entities/pos/FinancingBase";
import Transactions from "@/components/entities/pos/Transactions";
import MyOrders from "@/components/entities/order/MyOrders";
import NewOrder from "@/components/entities/order/NewOrder";
import BalSheet from "@/components/entities/party/BalanceSheet";
import NewBalSheet from "@/components/entities/party/NewBalanceSheet";
import IncomeStatement from "@/components/entities/party/IncomeStatement";
import PartyService from "../../service/party.service";
export default {
  name: "PrivateBase",
  data() {
    return {
      content: ""
    };
  },
  mounted() {
    PartyService.getPrivatePerson().then(response => {
      this.$store.commit("party/privatePerson", response.data);
      this.getPortfolio();
    });
  },
  computed: {
    personName: function() {
      return this.getPrivatePerson().name;
    }
  },
  methods: {
    getPrivatePerson() {
      let party = this.$store.state.party.privatePerson;
      if (party == null || party.id == null) {
        PartyService.getPrivatePerson().then(response => {
          this.$store.commit("party/privatePerson", response.data);
        });
      }
      return this.$store.state.party.privatePerson;
    },
    getMyOrders() {
      this.$refs.myOrders.getMyOrders(this.getPrivatePerson().id);
    },
    genNewOrder() {
      // SET PARTY ID
      this.$refs.newOrder.genNewOrder(this.getPrivatePerson());
    },
    getPortfolio() {
      this.$refs.portfolio.getPortfolio(this.getPrivatePerson().id);
    },
    getFinancing() {
      this.$refs.financing.getFinancing(this.getPrivatePerson());
    },
    getPositions() {
      this.$refs.trx.getPositions(this.getPrivatePerson());
    },
    getBalSheet() {
      this.$refs.balSheet.getFinStmt(this.getPrivatePerson().id);
    },

    getNewBalSheet() {
      this.$refs.newBalSheet.getFinStmt(this.getPrivatePerson().id);
    },
    getIncomeStmt() {
      this.$refs.incomeStmt.getFinStmt(this.getPrivatePerson().id);
    },
    getFinancingBase() {
      this.$refs.financingBase.getFinancingBase(this.getPrivatePerson());
    }
  },
  components: {
    Portfolio,
    FinancingBase,
    Transactions,
    MyOrders,
    NewOrder,
    BalSheet,
    NewBalSheet,
    IncomeStatement
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
