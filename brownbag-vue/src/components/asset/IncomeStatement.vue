<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h2>Income Statement</h2>
        <table class="table table-striped">
          <thead class="table-dark">
            <tr class="bg-success"></tr>
            <tr>
              <th scope="col">Asset ID</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr >
              <td>{{order.id}}</td>
              <td>{{order.asset.name}}</td>
              <td :class="formatDir(order.direction)">
                <b>{{order.direction}}</b>
              </td>
              <td>{{order.qty}}</td>
              <td>{{order.qty_exec}}</td>
              <td>$ {{order.price}}</td>
              <td>{{order.orderStatus.name}}</td>
            </tr>-->
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
      assetName: null
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