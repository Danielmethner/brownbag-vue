<template>
  <div>
    <div class="row justify-content-md-center">
      <h1>{{party.name}}</h1>
    </div>
    <div class="row justify-content-md-center">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-6">
            <b-table-simple hover responsive>
              <b-thead head-variant="dark">
                <b-tr>
                  <b-th colspan="2">Master Data</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="property in partyProps" :key="property.name">
                  <b-th>{{ property.name | camelCasePrettyPrint }}</b-th>
                  <b-th class="font-weight-normal">{{ property.value }}</b-th>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>
          <div class="col-md-6"></div>
        </div>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
import FinStmt from "@/components/entities/party/FinStmt";

import Party from "@/model/Party";
export default {
  name: "Overview",
  data() {
    return {
      party: new Party()
    };
  },
  mounted() {},
  computed: {
    partyProps() {
      var properties = [];
      for (let property in this.party) {
        console.log(property);
        console.log(this.party[property]);
        if (this.party[property] != null) {
          properties.push({ name: property, value: this.party[property] });
        }
      }
      return properties;
    }
  },

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
h1 {
  padding: 0.5em;
}
h3 {
  font-size: 1.4em;
}
.buy {
  color: green !important;
}
</style>