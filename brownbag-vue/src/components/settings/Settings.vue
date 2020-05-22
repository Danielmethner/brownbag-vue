<template>
  <div>
    <div class="row">
      <div class="col">
        <div class="row">
          <div class="col-md-6 text-center title">
            <h4>Year End Processing</h4>
          </div>
        </div>
        <div class="row text">
          <div class="col">
            <span>Current Year:</span>
          </div>
          <div class="col text-right">
            <span>{{finYear}}</span>
          </div>
        </div>
        <div class="row text">
          <div class="col"></div>
          <div class="form-group col-md-4">
            <button @click="switchYear()" class="btn btn-primary btn-block">Switch Year</button>
          </div>
        </div>
      </div>
      <div class="col-md-6 text-center title">
        <h4>Everything else</h4>
      </div>
    </div>
  </div>
</template>

<script>
import SettingsService from "@/service/settings.service";
export default {
  name: "CtrlVars",
  data() {
    return {
      vars: [],
      settings: "",
      finYear: 0
    };
  },
  mounted() {},
  methods: {
    getSettings() {
      this.settings = "Get Settings";
      this.refreshFinYear();
    },
    refreshFinYear() {
      this.finYear = "Loading Fin Year";
      SettingsService.getFinYear().then(response => {
        this.finYear = response.data;
      });
    },
    switchYear() {
      this.finYear = "Loading Fin Year";
      SettingsService.switchFinYear().then(response => {
        this.finYear = response.data;
      });
    }
  }
};
</script>
<style scoped>
.jumbotron {
  padding: 2em;
}

.title {
  padding-top: 1em;
}
.text {
  padding-top: 1em;
}
</style>
