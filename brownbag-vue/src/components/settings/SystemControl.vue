<template>
  <div>
    <header class="jumbotron">
      <div class="row">
        <div class="col"></div>
        <div class="mt-3 col-5">
          <h1>System Control & Monitoring</h1>
          <h4>Current Environment: <b>{{currentEnvironment}}</b></h4>
        </div>
        <div class="col"></div>
      </div>
    </header>
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="Log" @click="getLogs()">
          <Log ref="log"></Log>
        </b-tab>
        <b-tab title="Control Variables" @click="getCtrlVars()">
          <CtrlVars ref="ctrlVars"></CtrlVars>
        </b-tab>
        <b-tab title="Settings" @click="getSettings()">
          <Settings ref="settings"></Settings>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import Log from "@/components/settings/Log";
import CtrlVars from "@/components/settings/CtrlVars";
import Settings from "@/components/settings/Settings";
export default {
  name: "SystemControl",
  data() {
    return {
      currentEnvironment: process.env.NODE_ENV
    };
  },
  mounted() {
    this.getLogs();
  },
  methods: {
    getLogs() {
      this.$refs.log.getLogs();
    },
    getCtrlVars() {
      this.$refs.ctrlVars.getCtrlVars();
    },
    getSettings() {
      this.$refs.settings.getSettings();
    }
  },
  components: {
    Log,
    CtrlVars,
    Settings
  }
};
</script>
<style>
.jumbotron {
  padding: 2em;
}
.title {
  display: block;
}
</style>
