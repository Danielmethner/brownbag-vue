<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <b-table striped hover :items="logs" :fields="headers" head-variant="dark" sort-icon-left>
          <template v-slot:cell(timestamp)="data">{{ data.item.timestamp | formatDate}}</template>
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
      SettingsService.getLogs().then(response => {
        this.logs = [];
        response.data.forEach(log => {
          this.logs.push({
            id: log.id,
            timestamp: log.timestampCreate,
            message: log.message
          });
        });
      });
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
