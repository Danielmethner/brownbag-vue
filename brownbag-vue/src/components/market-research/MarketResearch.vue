<template>
  <div>
    <header class="jumbotron">
      <h1>Market Research</h1>
      <h3>Analyse Market Orders and Corporate Data</h3>
    </header>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <b-form-select v-model="assetId" :options="assetListDD" @change="changeParty()">
            <option disabled value="0">Please Select Asset</option>
          </b-form-select>
        </div>
      </div>
    </div>
    <div class="row" v-show="assetId">
      <div class="col-md-12">
        <b-tabs content-class="mt-3">
          <b-tab title="Public Orderbook" @click="getOrderbook()">
            <Orderbook ref="orderbook"></Orderbook>
          </b-tab>
          <!-- <b-tab title="Business Analysis">
            <Asset></Asset>
          </b-tab>-->
        </b-tabs>
      </div>
    </div>
    <div class="row" v-show="!assetId">
      <div class="col-md-12">
        <h2>Select an asset to view its data!</h2>
      </div>
    </div>
  </div>
</template>

<script>
import MyOrders from "@/components/entities/order/MyOrders";
import NewOrder from "@/components/entities/order/NewOrder";
import Orderbook from "@/components/entities/order/Orderbook";
import Portfolio from "@/components/entities/pos/Portfolio";
import AssetService from "@/service/asset.service";
export default {
  name: "MarketResearch",
  data() {
    return {
      assetId: 0,
      assetListDD: []
    };
  },
  mounted() {
    this.getAssets();
  },
  methods: {
    changeParty() {
      this.getOrderbook();
    },
    getAssets() {
      if (this.assetListDD.length <= 1) {
        AssetService.getAllSec().then(response => {
          this.$store.commit("asset/assetList", response.data);
          this.assetListDD = [];
          response.data.forEach(asset => {
            let dropdownItem = { value: asset.id, text: asset.name };
            this.assetListDD.push(dropdownItem);
          });
          this.$store.commit("asset/assetListDD", this.assetListDD);
        });
      } else {
        return this.$store.state.asset.assetListDD;
      }
    },
    getMyOrders() {
      this.$refs.myOrders.getMyOrders();
    },
    getOrderbook() {
      this.$refs.orderbook.getOrderbook(this.assetId);
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
