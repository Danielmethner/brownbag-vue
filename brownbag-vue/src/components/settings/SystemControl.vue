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
      </b-tabs>
    </div>
  </div>
</template>

<script>
import Log from "@/components/settings/Log";
import CtrlVars from "@/components/settings/CtrlVars";

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
    }
  },
  components: {
    Log,
    CtrlVars
  }
};
</script>
<style>
.jumbotron {
  padding: 2em;
}
</style>
