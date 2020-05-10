<template>
  <div class="row">
    <div class="col-md-12">
      <h2>Income Statement</h2>
      <label>For year ending: {{incomeStatement.date}}</label>
      <div v-for="section in incomeStatement.sections" v-bind:key="section.name">
        <table class="table table-striped">
          <thead class="table-dark">
            <tr v-bind:class="section.style">
              <th class="col-md-8" colspan="2">{{section.name}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-bind:class="item.style" v-for="item in section.items" v-bind:key="item.name">
              <td class="col-md-8">{{item.name}}</td>
              <td class="col-md-4 text-right">{{item.value | toCurrency}}</td>
            </tr>
            <tr v-if="section.hasTotal">
              <td class="col-md-8">Total</td>
              <td class="col-md-4 text-right">{{total(section.items) | toCurrency}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AssetService from "../../service/asset.service";

export default {
  name: "IncomeStatement",
  data() {
    return {
      assetName: null,
      incomeStatement: {
        date: "31.12.2019",
        sections: [
          {
            name: "Revenues",
            style: "bg-success",
            hasTotal: true,
            items: [
              {
                name: "Sales Revenue",
                value: 1000000
              }
            ]
          },
          {
            name: "Expenses",
            style: "bg-danger",
            hasTotal: true,
            items: [
              {
                name: "Raw Materials",
                value: 100000
              },
              {
                name: "Salaries",
                value: 100000
              }
            ]
          },
          {
            name: "Net Income",
            style: "bg-primary",
            hasTotal: false,
            items: [
              {
                name: "Cash",
                value: 800000,
                style: "table-secondary"
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
    },
    total(items) {
      let sectionTotal = 0;
      items.forEach(item => {
        sectionTotal = sectionTotal + item.value;
      });
      return sectionTotal;
    }
  }
};
</script>

<style scoped>
.buy {
  color: green !important;
}
</style>