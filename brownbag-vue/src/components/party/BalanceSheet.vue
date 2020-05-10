<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h2>{{balanceSheet.name}}</h2>
        <div v-for="section in balanceSheet.sections" v-bind:key="section.name">
          <table class="table table-striped">
            <thead class="table-dark">
              <tr v-bind:class="section.style">
                <th class="col-md-8">{{section.section}}</th>
                <th class="col-md-2 text-right">{{balanceSheet.finYear}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in section.items" v-bind:key="item.name">
                <td class="col-md-8">{{item.itemType}}</td>
                <td class="col-md-4 text-right">{{item.qty | toCurrency}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssetService from "../../service/asset.service";

export default {
  name: "BalanceSheet",
  data() {
    return {
      asset: {},
      balanceSheet: {
        name: "Balance Sheet"
      }
    };
  },
  methods: {
    showAsset(assetId) {
      console.log("show my asset");
      this.asset = AssetService.getByIdCache(assetId);
      AssetService.getBalSheetByPartyId(this.asset.issuerId).then(response => {
        this.balanceSheet = {};
        this.balanceSheet = response.data;
      });
    }
  }
};
</script>

<style scoped>
.buy {
  color: green !important;
}
</style>