<template>
  <div>
    <header class="jumbotron">
      <h1>Application Log</h1>
      <h3>Monitor Database Output</h3>
    </header>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead class="table-dark">
            <tr class="bg-success"></tr>
            <tr>
              <th class="col-md-1">ID</th>
              <th class="col-md-2">Timestamp</th>
              <th class="col-md-10">Message</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in logs" v-bind:key="entry.id">
              <td class="col-md-1">{{entry.id}}</td>
              <td class="col-md-1">{{entry.timestamp | formatDate}}</td>
              <td class="col-md-10">{{entry.message}}</td>
            </tr>
          </tbody>
        </table>
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
      logs: []
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
}
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
