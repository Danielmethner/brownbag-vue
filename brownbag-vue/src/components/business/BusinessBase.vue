<template>
  <div>
    <header class="jumbotron">
      <h1>Business Information</h1>
    </header>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label for="inputAsset">Select Business</label>
          <b-form-select v-model="businessId" :options="businessListDD" @change="changeParty()">
            <option disabled value="0">Please Select Business</option>
          </b-form-select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <b-tabs content-class="mt-3">
          <b-tab title="Portfolio" @click="getPortfolio()">
            <Portfolio ref="portfolio"></Portfolio>
          </b-tab>
          <b-tab title="Orders" @click="getMyOrders()">
            <MyOrders ref="myOrders"></MyOrders>
          </b-tab>
        <b-tab title="New Order" @click="genNewOrder()">
          <NewOrder ref="newOrder"></NewOrder>
        </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import MyOrders from "@/components/entities/order/MyOrders";
import NewOrder from "@/components/entities/order/NewOrder";
import Orderbook from "@/components/entities/order/Orderbook";
import Portfolio from "@/components/entities/pos/Portfolio";
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
	},
  methods: {
    changeParty() {
      this.getPortfolio();
      this.getMyOrders();
      this.genNewOrder();
    },
    getParties() {
      
      if (this.businessListDD.length <= 1) {
        PartyService.getAll().then(response => {
          this.$store.commit("party/businessList", response.data);
          // let aBusinessListDD = [{ value: 0, text: "Please Select Business" }];
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
      if(this.businessId != null){
        let party = this.$store.getters['party/business'](this.businessId);
        this.$refs.newOrder.genNewOrder(party);
      }
      
    },
    getMyOrders() {
      this.getParties();
      if(this.businessId) {
        this.$refs.myOrders.getMyOrders(this.businessId);
      }      
    },
    getPortfolio() {
      console.log("business id" + this.businessId);
      if(this.businessId) {
        this.$refs.portfolio.getPortfolio(this.businessId);
      }
    }
  },
  components: {
    MyOrders,
    NewOrder,
    Orderbook,
    Portfolio
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
