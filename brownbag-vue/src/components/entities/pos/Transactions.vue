<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <b-form-select
            v-model="posId"
            :options="positions"
            @change="changePos()"
            value-field="id"
            text-field="name"
          >
            <option disabled value="0">Please Select a Position</option>
          </b-form-select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <b-table
          striped
          hover
          sort-desc
          sort-by="id"
          :items="bookings"
          :fields="headers"
          thead-tr-class="table-info"
          sort-icon-left
        >
          <template v-slot:cell(timestamp)="data">{{ data.item.timestamp | toTimestamp}}</template>
          <template v-slot:cell(posBalOld)="data">{{ data.item.posBalOld | toQty}}</template>
          <template v-slot:cell(posBalNew)="data">{{ data.item.posBalNew | toQty}}</template>
        </b-table>
      </div>
    </div>
  </div>
</template>
<script>
import PosService from "@/service/pos.service";

export default {
  name: "Portfolio",
  data() {
    return {
      content: "",
      bookings: [],
      party: {},
      pos: {},
      positions: [],
      posId: 0,
      headers: [
        { label: "ID", key: "id", sortable: true },
        { label: "Order ID", key: "orderId", sortable: true },
        { label: "Timestamp", key: "timestamp", sortable: true },
        { label: "Book Text", key: "bookText", sortable: true },
        { label: "Qty", key: "qty", sortable: true },
        { label: "Balance Old", key: "posBalOld", sortable: true },
        { label: "Balance New", key: "posBalNew", sortable: true }
      ]
    };
  },
  methods: {
    changePos() {
      this.getTrx();
    },
    getPositions(party) {
      this.party = party;
      this.positions = [];
      PosService.getPosByPartyId(this.party.id).then(response => {
        response.data.forEach(pos => {
          this.positions.push(pos);
        });
      });
    },
    getTrx() {
      this.bookings = [];
      if (this.posId != null) {
        PosService.getBookingByPartyIdAndPosId(this.party.id, this.posId).then(
          response => {
            response.data.forEach(pos => {
              this.bookings.push(pos);
            });
          }
        );
      }
    }
  },
  mounted() {},
  calculated() {}
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
