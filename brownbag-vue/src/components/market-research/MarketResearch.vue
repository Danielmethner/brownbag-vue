<template>
  <div>
    <header class="jumbotron">
      <h1>Market Research</h1>
      <h3>Analyse Market Orders and Corporate Data</h3>
    </header>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <b-form-select
            v-model="assetId"
            :options="assetList"
            @change="changeAsset()"
            value-field="id"
            text-field="name"
          >
            <option disabled value="0">Please select an Asset</option>
          </b-form-select>
        </div>
      </div>
    </div>
    <div class="row" v-show="assetId">
      <div class="col-md-12">
        <b-tabs content-class="mt-3">
          <b-tab title="Overview" @click="getOverview()">
            <Overview ref="overview"></Overview>
          </b-tab>
          <b-tab title="Public Orderbook" @click="getOrderbook()">
            <Orderbook ref="orderbook"></Orderbook>
          </b-tab>
          <b-tab title="Balance Sheet" @click="getBalSheet()">
            <BalSheet ref="balSheet"></BalSheet>
          </b-tab>
          <b-tab title="Income Statement" @click="getIncomeStmt()">
            <IncomeStatement ref="incomeStmt"></IncomeStatement>
          </b-tab>
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
import Overview from "@/components/entities/party/Overview";
import Orderbook from "@/components/entities/order/Orderbook";
import AssetService from "@/service/asset.service";
import IncomeStatement from "@/components/entities/party/IncomeStatement";
import BalSheet from "@/components/entities/party/BalanceSheet";
import PartyService from "@/service/party.service";
export default {
  name: "MarketResearch",
  data() {
    return {
      asset: {},
      assetId: 0,
      assetList: [],
      issuer: {},
      issuerId: null
    };
  },
  mounted() {
    this.getAssets();
    if (this.asset != null && this.asset.id != null) {
      this.assetId = this.asset.id;
      this.prevBus = 0;
    }
  },
  updated() {
    // SET DEFAULT TAB TO 0 WHEN SELECTING A BUSINESS FOR FIRST TIME
    if (this.selectedTab > 0 && this.prevBus == null) {
      this.selectedTab = 0;
      this.prevBus = this.assetId;
    } else {
      this.getOverview();
    }
  },
  methods: {
    changeAsset() {
      this.asset = this.$store.getters["asset/asset"](this.assetId);
      this.issuerId = this.$store.getters["asset/asset"](this.assetId).issuerId;
      this.getOverview(this.issuerId);
      this.getOrderbook();
      this.getBalSheet();
      this.getIncomeStmt();
    },
    getAssets() {
      AssetService.getAllSec().then(response => {
        this.$store.commit("asset/assetList", response.data);
        this.assetList = [];
        response.data.forEach(asset => {
          this.assetList.push(asset);
        });
        this.$store.commit("asset/assetList", this.assetList);
      });
    },
    getMyOrders() {
      this.$refs.myOrders.getMyOrders();
    },
    getOrderbook() {
      this.$refs.orderbook.getOrderbook(this.assetId);
    },
    getBalSheet() {
      if (this.issuerId) {
        this.$refs.balSheet.getFinStmt(this.issuerId);
      }
    },
    getIncomeStmt() {
      if (this.issuerId) {
        this.$refs.incomeStmt.getFinStmt(this.issuerId);
      }
    },
    getOverview(issuerId) {
      if (issuerId != null) {
        PartyService.getById(issuerId).then(response => {
          if (response.data.id != null) {
            this.$refs.overview.getOverview(response.data);
          }
        });
      }
    }
  },
  components: {
    Overview,
    Orderbook,
    BalSheet,
    IncomeStatement,
    PartyService
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
