<template>
  <div>
    <div class="row justify-content-md-center">
      <div class="col-md-2"></div>
      <div>
        <h1>{{party.name}}</h1>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
import SettingsService from "@/service/settings.service";
import FinStmt from "@/components/entities/party/FinStmt";
import { GLOBAL } from "@/store/index.js";
import Party from "@/model/Party";
export default {
  name: "Overview",
  data() {
    return {
      party: new Party()
    };
  },
  mounted() {},

  methods: {
    getOverview(party) {
      this.party = party;
    }
  },
  components: {
    FinStmt
  }
};
</script>

<style scoped>
h3 {
  font-size: 1.4em;
}
.buy {
  color: green !important;
}
</style>