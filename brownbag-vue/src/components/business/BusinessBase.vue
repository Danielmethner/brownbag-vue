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
          <b-tabs content-class="mt-3">
            <div>
              <b-tab title="Create Business" @click="newLegalPerson()">
                <NewLegalPerson ref="newlegalperson"></NewLegalPerson>
              </b-tab>
            </div>
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
          </b-tabs>
        </div>
      </div>
      <!-- <div class="row" v-show="!businessId">
        <div class="col-md-12">
          <h5>To find more information about a business here, please select it from the dropdown.</h5>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import MyOrders from "@/components/entities/order/MyOrders";
import NewOrder from "@/components/entities/order/NewOrder";
import Portfolio from "@/components/entities/pos/Portfolio";
import BalSheet from "@/components/entities/party/BalanceSheet";
import NewLegalPerson from "@/components/entities/party/NewLegalPerson";
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
    newLegalPerson() {
    },
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
          // response.data.forEach(business => {
          //   let dropdownItem = { value: business.id, text: business.name };
          //   this.businessListDD.push(dropdownItem);
          // });
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
