<template>
  <div>
    <header class="jumbotron">
      <h1>Personal Information</h1>
    </header>
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="My Portfolio" @click="getPortfolio()">
          <Portfolio ref="portfolio"></Portfolio>
        </b-tab>
        <b-tab title="My Orders" @click="getMyOrders()">
          <MyOrders ref="myOrders"></MyOrders>
        </b-tab>
        <!-- <b-tab title="Balance Sheet">
          <BalSheet></BalSheet>
        </b-tab>
        <b-tab title="Income Statement">
        <IncomeStatement></IncomeStatement>-->
        <!-- </b-tab> -->

        <b-tab title="New Order" @click="genNewOrder()">
          <NewOrder ref="newOrder"></NewOrder>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import Portfolio from "@/components/entities/pos/Portfolio";
import MyOrders from "@/components/entities/order/MyOrders";
import NewOrder from "@/components/entities/order/NewOrder";
import Orderbook from "@/components/entities/order/Orderbook";
// import AssetBase from "@/components/asset/AssetBase";
import PartyService from "../../service/party.service";
export default {
  name: "PrivateBase",
  data() {
    return {
      content: ""
    };
  },
  mounted() {
    this.getPortfolio();

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
    }
  },
  components: {
    Portfolio,
    MyOrders,
    NewOrder,
    Orderbook
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
