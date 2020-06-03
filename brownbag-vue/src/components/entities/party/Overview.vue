<template>
  <div>
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <h1>{{party.name}}</h1>
      </div>
      <div class="col-md-2"></div>
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
          <div class="col-md-6">
            <b-table-simple hover responsive>
              <b-thead head-variant class="bg-primary text-white">
                <b-tr>
                  <b-th colspan="3">Ownership</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="ownerShip in ownerShipList" :key="ownerShip.id">
                  <b-th>{{ ownerShip.partyName | camelCasePrettyPrint }}</b-th>
                  <b-th class="font-weight-normal">{{ ownerShip.qty }}</b-th>
                  <b-th class="font-weight-normal">{{ ownerShip.ownershipPerc | toPercent }}</b-th>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>
        </div>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
import FinStmt from "@/components/entities/party/FinStmt";
import Party from "@/model/Party";
import PartyService from "@/service/party.service";

export default {
  name: "Overview",
  data() {
    return {
      party: new Party(),
      ownerShipList: []
    };
  },
  mounted() {},
  computed: {
    partyProps() {
      var properties = [];
      for (let property in this.party) {
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
      this.getOwnerShipList(party.id);
    },
    getOwnerShipList(partyId) {
      PartyService.getOwnerShipList(partyId).then(response => {
        this.ownerShipList = response.data;
      });
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