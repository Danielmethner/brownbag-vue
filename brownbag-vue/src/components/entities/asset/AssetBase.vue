<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <header class="jumbotron">
          <h1>Assets</h1>
          <h3>Check Master Data of Assets</h3>
        </header>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="inputAsset">Asset</label>
              <b-form-select v-model="assetId" @change="showAsset()" :options="storeAssetsDD"></b-form-select>
            </div>
          </div>
        </div>
        <div class="row" v-if="assetId">
          <div class="col-md-12">
            <b-tabs content-class="mt-3">
              <b-tab title="Overview" active @click="showAsset()">
                <Overview ref="overview"></Overview>
              </b-tab>
              <b-tab title="Balance Sheet" @click="showBalSheet()">
                <BalanceSheet ref="balsheet"></BalanceSheet>
              </b-tab>

              <b-tab title="Income Statement">
                <IncomeStatement></IncomeStatement>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssetService from "../../service/asset.service";
import Overview from "./Overview";
import BalanceSheet from "./BalanceSheet";
import IncomeStatement from "./IncomeStatement";

export default {
  name: "AssetBase",
  data() {
    return {
      assetId: null,
      storeAssetsDD: this.$store.state.assetsDD
    };
  },
  methods: {
    showAsset() {
      this.refreshAssets();
      if (this.assetId) {
        this.$refs.overview.showAsset(this.assetId);
      }
    },
    showBalSheet() {
      if (this.assetId) {
        this.$refs.balsheet.showAsset(this.assetId);
      }
    },
    refreshAssets() {
      if (this.$store.state.assetsDD.length <= 1) {
        AssetService.getAllSec().then(response => {
          this.$store.state.assets = response.data;

          response.data.forEach(asset => {
            let dropdownItem = { value: asset.id, text: asset.name };

            this.$store.state.assetsDD.push(dropdownItem);
            this.storeAssetsDD = this.$store.state.assetsDD;
          });
        });
      }
    }
  },
  mounted() {
    if (!this.$store.state.assets) {
      this.$store.state.assets = [];
    }

    if (!this.$store.state.assetsDD) {
      this.$store.state.assetsDD = [
        { value: null, text: "Please Select Asset" }
      ];
    }

    if (this.$store.state.assetsDD.length <= 1) {
      this.refreshAssets();
    }
  },
  components: {
    Overview,
    BalanceSheet,
    IncomeStatement
  }
};
</script>

<style scoped>
.buy {
  color: green !important;
}
</style>