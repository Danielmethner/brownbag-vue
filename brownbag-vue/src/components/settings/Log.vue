<template>
  <div>
    <div class="row" v-if="hasLogs == 0">
      <div class="col-md-12">Loading logs</div>
    </div>
    <div class="row" v-if="hasLogs == 1">
      <div class="col-md-12">There are no logs in the database</div>
    </div>
    <div class="row" v-if="hasLogs == 2">
      <div class="col-md-12">
        <b-table striped hover :items="logs" :fields="headers" head-variant="dark" sort-icon-left>
          <template v-slot:cell(timestamp)="data">{{ data.item.timestamp | toTimestamp}}</template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import SettingsService from "@/service/settings.service";
export default {
  name: "Log",
  data() {
    return {
      logs: [],
      hasLogs: null,
      logsMsg: "Loading Logs",
      headers: [
        { label: "ID", key: "id", sortable: true },
        { label: "Timestamp", key: "timestamp", sortable: true },
        { label: "Message", key: "message" }
      ]
    };
  },
  mounted() {
    this.getLogs();
  },
  methods: {
    getLogs() {
      this.hasLogs = 0;
      setTimeout(() => {
        SettingsService.getLogs().then(response => {
          this.logs = [];
          this.hasLogs = 2;
          response.data.forEach(log => {
            this.logs.push({
              id: log.id,
              timestamp: log.timestampCreate,
              message: log.message
            });
          });
          if (this.logs.length == 0) {
            this.hasLogs = 1;
          }
        });
      }, 1);
    }
  }
};
</script>
<style>
.jumbotron {
  padding: 2em;
}

.amtPositive {
  color: green;
}

.amtNegative {
  color: red;
}
</style>
