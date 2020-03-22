<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h2>Balance Sheet</h2>
        <div v-for="section in balanceSheet2.sections" v-bind:key="section.name">
          <table class="table table-striped">
            <thead class="table-dark">
              <tr v-bind:class="section.style">
                <th class="col-md-8">{{section.name}}</th>
                <th class="text-center col-md-2">{{balanceSheet2.date}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in section.items" v-bind:key="item.name">
                <td class="col-md-8">{{item.name}}</td>
                <td class="col-md-4 text-right">{{item.value | toCurrency}}</td>
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
      assetName: null,
      balanceSheet2: {
        date: "31.12.2020",
        sections: [
          {
            name: "Assets",
            style: "bg-success",
            items: [
              {
                name: "Cash",
                value: 100000
              },
              {
                name: "Machinery",
                value: 100000
              },
              {
                name: "Inventory",
                value: 100000
              }
            ]
          },
          {
            name: "Liabilities",
            style: "bg-danger",
            items: [
              {
                name: "Loan",
                value: 100000
              }
            ]
          },
          {
            name: "Equity",
            style: "bg-primary",
            items: [
              {
                name: "Paid in Capital",
                value: 100000
              },
              {
                name: "Retained Earnings",
                value: 100000
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    showAsset(assetId) {
      this.assetName = AssetService.getByIdCache(assetId).name;
    }
  }
};
</script>

<style scoped>
.buy {
  color: green !important;
}
</style>