<template>
  <div>
    <header class="jumbotron">
      <h1>Business Management</h1>
    </header>
    <div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <b-form-select v-model="businessId" :options="businessListDD" @change="changeParty()">
              <option disabled value="0">{{selectBusinessDflt}}</option>
            </b-form-select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <b-tabs content-class="mt-3" v-model="selectedTab">
            <div v-if="businessId">
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
            </div>
            <div>
              <b-tab title="Create Business" @click="newLegalPerson()">
                <NewLegalPerson ref="newlegalperson"></NewLegalPerson>
              </b-tab>
            </div>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyOrders from "@/components/entities/order/MyOrders";
import NewOrder from "@/components/entities/order/NewOrder";
import Portfolio from "@/components/entities/pos/Portfolio";
import BalSheet from "@/components/entities/party/BalanceSheet";
import NewLegalPerson from "@/components/entities/party/NewLegalPerson";
import PartyService from "../../service/party.service";

export default {
  name: "BusinessBase",
  data() {
    return {
      businessId: 0,
      businessListDD: [],
      selectedTab: null,
      prevBus: null,
      changeTab: false,
      business: null
    };
  },
  mounted() {
    this.getParties();
    console.log(this.$store.state.party.business);
    this.business = this.$store.state.party.business;
    if(this.business.id != null) {
      this.businessId =this.business.id;
      this.prevBus = 0; 
    }
  },
  updated() {
    // SET DEFAULT TAB TO 0 WHEN SELECTING A BUSINESS FOR FIRST TIME
    if (this.selectedTab > 0 && this.prevBus == null) {
      this.selectedTab = 0;
      this.prevBus = this.businessId;
    }
  },
  computed: {
    selectBusinessDflt() {
      if (this.businessListDD.length > 1) {
        return "Please Select Business";
      } else {
        return "Please Create Business";
      }
    }
  },
  methods: {
    newLegalPerson() {},
    changeParty() {
      this.business = this.$store.getters["party/businessById"](
        this.businessId
      );
      this.$store.commit("party/business", this.business);
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
      if (this.business != null) {
        this.$refs.newOrder.genNewOrder(this.business);
      }
    },
    getMyOrders() {
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
    NewLegalPerson,
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
