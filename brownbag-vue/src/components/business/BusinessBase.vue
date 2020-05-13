<template>
  <div>
    <header class="jumbotron">
      <h1>Business Management</h1>
    </header>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <b-form-select v-model="businessId" :options="businessListDD" @change="changeParty()">
            <option disabled value="0">Please Select Business</option>
          </b-form-select>
        </div>
      </div>
    </div>
    <div class="row" v-show="businessId">
      <div class="col-md-12">
        <b-tabs content-class="mt-3">
          <b-tab title="Portfolio" @click="getPortfolio()">
            <Portfolio ref="portfolio"></Portfolio>
          </b-tab>
          <b-tab title="Orders" @click="getMyOrders()">
            <MyOrders ref="myOrders"></MyOrders>
          </b-tab>
          <b-tab title="Balance Sheet" @click="getBalSheet()">
            <BalSheet ref="balSheet"></BalSheet>
          </b-tab>
          <b-tab title="New Order" @click="genNewOrder()">
            <NewOrder ref="newOrder"></NewOrder>
          </b-tab>
        </b-tabs>
      </div>
    </div>
    <div class="row"  v-show="!businessId">
      <div class="col-md-12">
        <h2>Select a business to view its content!</h2>
      </div>
    </div>
  </div>
</template>

<script>
import MyOrders from "@/components/entities/order/MyOrders";
import NewOrder from "@/components/entities/order/NewOrder";
import Portfolio from "@/components/entities/pos/Portfolio";
import BalSheet from "@/components/entities/party/BalanceSheet";
// import AssetBase from "@/components/asset/AssetBase";
import PartyService from "../../service/party.service";

export default {
  name: "BusinessBase",
  data() {
    return {
      businessId: 0,
      businessListDD: []
    };
  },
  mounted() {
    this.getParties();
  },

  computed: {},
  methods: {
    changeParty() {
      this.getPortfolio();
      this.getMyOrders();
      this.genNewOrder();
      this.getBalSheet();
    },
    getParties() {
      if (this.businessListDD.length <= 1) {
        PartyService.getAll().then(response => {
          this.$store.commit("party/businessList", response.data);
          this.businessListDD = [];
          response.data.forEach(business => {
            let dropdownItem = { value: business.id, text: business.name };
            this.businessListDD.push(dropdownItem);
          });
          this.$store.commit("party/businessListDD", this.businessListDD);
        });
      } else {
        return this.$store.state.party.businessListDD;
      }
    },
    genNewOrder() {
      this.getParties();
      if (this.businessId != null) {
        let party = this.$store.getters["party/business"](this.businessId);
        this.$refs.newOrder.genNewOrder(party);
      }
    },
    getMyOrders() {
      this.getParties();
      if (this.businessId) {
        this.$refs.myOrders.getMyOrders(this.businessId);
      }
    },
    getPortfolio() {
      if (this.businessId) {
        this.$refs.portfolio.getPortfolio(this.businessId);
      }
    },
    getBalSheet() {
      this.$refs.balSheet.getBalSheet(this.businessId);
    }
  },
  components: {
    MyOrders,
    NewOrder,
    Portfolio,
    BalSheet
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
