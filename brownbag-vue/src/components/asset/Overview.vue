<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h2>Asset: {{asset.name}}</h2>
        <table class="table table-striped">
          <thead class="table-dark">
            <tr class="bg-success">
              <th class="bg-info">Attribute</th>
              <th class="bg-info">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>ID</b>
              </td>
              <td>
                <b>{{asset.id}}</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Name</b>
              </td>
              <td>
                <b>{{asset.name}}</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Is ETP</b>
              </td>
              <td>
                <b>{{asset.share}}</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Issuer</b>
              </td>
              <td>
                <b  v-if="asset.issuer">{{asset.issuer.name}}</b>
              </td>
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
  name: "AssetBase",
  data() {
    return {
      asset: {}
    };
  },
  methods: {
    showAsset(assetId) {
      if (assetId) {
        this.asset = AssetService.getByIdCache(assetId);
      }
    }
  }
};
</script>

<style scoped>
.buy {
  color: green !important;
}
</style>