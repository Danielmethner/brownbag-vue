<template>
  <div>
    <header class="jumbotron">
      <h1>System Control & Monitoring</h1>
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
    return {};
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
</style>
