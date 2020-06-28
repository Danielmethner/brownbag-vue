<template>
  <div id="content" class="row justify-content-md-center">
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-12 text-center"></div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card p-4 bg-light">
            <div class="form-group row">
              <div class="form-group col">
                <label for="party">Ordering Party</label>
                <label readonly type="text" class="form-control" id="party">{{orderLoan.partyName}}</label>
              </div>
            </div>

            <div class="form-group row">
              <div class="form-group col-md-6">
                <label for="orderAmount">Loan Amount</label>
                <input
                  type="number"
                  min="0"
                  class="form-control"
                  id="qty"
                  placeholder="0,0"
                  v-model="orderLoan.qty"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="credFacility">Credit Facility</label>
                <label
                  readonly
                  type="text"
                  class="form-control"
                  id="avblFunds"
                >{{credFacility | toCurrency}}</label>
              </div>
            </div>
            <div class="form-group row">
              <div class="form-group col-md-6">
                <label for="intrRate">Interest Rate</label>
                <label
                  readonly
                  type="text"
                  class="form-control"
                  id="intrRate"
                >{{intrRate | toPercent}}</label>
              </div>
              <div class="form-group col-md-6">
                <label for="intrRate">Interest p.a.</label>
                <label
                  readonly
                  type="text"
                  class="form-control"
                  id="intrAmt"
                >{{intrAmt | toCurrency}}</label>
              </div>
            </div>
            <div class="form-group row">
              <div class="form-group col-md-6">
                <label for="duration">Credit Period</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  class="form-control"
                  id="qty"
                  placeholder="0"
                  v-model="credPeriod"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="intrRate">Redemption Date</label>
                <label
                  readonly
                  type="text"
                  class="form-control"
                  id="intrAmt"
                >{{matDate | jsDateToLocalDate}}</label>
              </div>
            </div>

            <div class="form-group row">
              <label type="text" class="submit-feedback">{{status}}</label>
            </div>
            <div class="form-group row">
              <div class="form-group col-6">
                <button @click="placeOrder()" class="btn btn-primary btn-block">
                  <b-spinner small v-if="isLoading"></b-spinner>Place Order
                </button>
              </div>
              <div class="form-group col-6">
                <button @click="clearForm(true  )" class="btn btn-dark btn-block">Clear Form</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AssetService from "@/service/asset.service";
import OrderService from "@/service/order.service";
import PartyService from "@/service/party.service";
import SettingsService from "@/service/settings.service";
import OrderLoan from "@/model/OrderLoan";
export default {
  data() {
    return {
      assets: [],
      credFacility: 0,
      credPeriod: 1,
      intrRate: 0,
      isLoading: false,
      minMatDate: new Date(),
      orderLoan: new OrderLoan(),
      party: {},
      status: ""
    };
  },
  computed: {
    intrAmt: function() {
      let intrAmt = this.orderLoan.getQty() * this.intrRate;
      return intrAmt > 0 ? intrAmt : 0;
    },
    matDate: function() {
      let newMatDate = null;
      let localMinMatDate = this.minMatDate; 
      if (localMinMatDate != null) {
        newMatDate = new Date(localMinMatDate.valueOf());

        if (newMatDate instanceof Date) {
          newMatDate.setFullYear(
            this.minMatDate.getFullYear() + parseInt(this.credPeriod)
          );
          this.orderLoan.setMatDate(newMatDate);
        }
      }
      return newMatDate;
    }
  },
  mounted() {},
  methods: {
    setMatDate() {
      SettingsService.getFinYear().then(response => {
        let finYear = response.data;
        let finDate = new Date(finYear + 1, 11, 31);
        this.orderLoan.matDate = finDate;
        this.minMatDate = finDate;
      });
    },
    setCredFacility(partyId) {
      PartyService.getCredFacility(partyId).then(response => {
        this.credFacility = response.data;
      });
    },
    setParty(party) {
      this.orderLoan.setPartyId(party.id);
      this.orderLoan.partyName = party.name;
      this.party = party;
    },
    newLoanAppl(party) {
      this.status = "";
      this.setParty(party);
      this.setMatDate();
      this.setCredFacility(party.id);
    },
    placeOrder() {
      // PARTY SET
      if (
        this.orderLoan.getPartyId() == null ||
        this.orderLoan.getPartyId() == 0
      ) {
        this.status = "Error: No business selected";
        return;
      }
      // AMOUNT > 0
      if (this.orderLoan.getQty() <= 0) {
        this.status = "Error: Loan amount must be greater 0";
        return;
      }
      // MATURITY SET
      if (this.orderLoan.getMatDate() <= this.minMatDate) {
        this.status = "Error: Price Limit must be greater 0";
        return;
      }
      this.isLoading = true;
      OrderService.placeOrder(this.orderLoan)
        .then(
          response => {
            this.status = response.data;
            this.clearForm(false);
          },
          error => {
            this.status = "Error: " && error;
          }
        )
        .finally(() => {
          this.isLoading = false;
        });
    },
    clearForm(clearStatus) {
      if (clearStatus) {
        this.status = "";
      }
      this.orderLoan.qty = null;
      this.setCredFacility(this.orderLoan.getPartyId());
      // vm.$forceUpdate();
    }
  }
};
</script>

<style scoped>
input {
  margin-bottom: 8px !important;
}
#asset {
  text-align: left;
}
#content {
  /* max-width: 500px; */
  padding-bottom: 50px;
  text-align: center;
}
.button-dir {
  min-width: 100px;
  max-width: 50%;
}
.dd {
  text-align: left;
  vertical-align: top;
}
.form-group {
  margin: 0 auto;
  text-align: left;
  min-width: 50%;
  padding: 5px;
}
.submit-feedback {
  min-height: 19px;
}
.trade-dir {
  margin: 0 auto;
  max-width: 50%;
}
</style>
