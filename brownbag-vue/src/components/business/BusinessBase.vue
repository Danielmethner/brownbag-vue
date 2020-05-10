<template>
  <div>
    <header class="jumbotron">
      <h1>Business Information</h1>
    </header>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label for="inputAsset">Select Business</label>
          <b-form-select v-model="businessId" :options="businessListDD">
            <option disabled value="0">Please Select Business</option>
          </b-form-select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <b-tabs content-class="mt-3">
          <b-tab title="Portfolio" active @click="getPortfolio()">
            <Portfolio ref="portfolio"></Portfolio>
          </b-tab>
          <b-tab title="Orders" active @click="getMyOrders()">
            <MyOrders ref="myOrders"></MyOrders>
          </b-tab>
          <b-tab title="New Order">
            <NewOrder></NewOrder>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import MyOrders from "@/components/private/MyOrders";
import NewOrder from "@/components/private/NewOrder";
import Orderbook from "@/components/private/Orderbook";
import Portfolio from "@/components/pos/Portfolio";
// import AssetBase from "@/components/asset/AssetBase";
import PartyService from "../../service/party.service";
export default {
  name: "BusinessBase",
  data() {
    return {
      businessId: 0
    };
  },
  computed: {
    businessListDD() {
      console.log("computed property");
      if (this.$store.state.party.businessListDD.length <= 1) {
        PartyService.getAll().then(response => {
          this.$store.commit("party/businessList", response.data);
          // let aBusinessListDD = [{ value: 0, text: "Please Select Business" }];
          let aBusinessListDD = [];
          response.data.forEach(business => {
            let dropdownItem = { value: business.id, text: business.name };
            aBusinessListDD.push(dropdownItem);
          });
          this.$store.commit("party/businessListDD", aBusinessListDD);
          return aBusinessListDD;
        });
      } else {
        return this.$store.state.party.businessListDD;
      }
    }
  },
  methods: {
    // getMyOrders() {
    //   this.$refs.myOrders.getMyOrders();
    // },
    // refreshOrderbook() {
    //   this.$refs.orderbook.refreshOrderbook();
    // }
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
