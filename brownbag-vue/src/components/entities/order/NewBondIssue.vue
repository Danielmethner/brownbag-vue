<template>
  <div id="content" class="row justify-content-md-center">
    <div class="col-md-7">
      <div class="row">
        <div class="col-md-12 text-center"></div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card p-4 bg-light">
            <div class="form-group row">
              <div class="form-group col">
                <label for="inputAddress">Issuing Party</label>
                <label readonly type="text" class="form-control" id="party">{{newOrder.partyName}}</label>
              </div>
            </div>

            <div class="form-group row">
              <div class="form-group col">
                <label for="qty">Quantity</label>
                <input
                  type="number"
                  min="0"
                  class="form-control"
                  id="qty"
                  placeholder="0,00"
                  v-model="newOrder.qty"
                />
              </div>
            </div>

            <div class="form-group row">
              <div class="form-group col">
                <label
                  for="inputPrice"
                  v-b-tooltip.hover
                  title="Price at which the bond will have to be repayed upon maturity"
                >
                  Nominal Value
                  <b>*</b>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  class="form-control"
                  id="price"
                  placeholder="0.00"
                  v-model="newOrder.nomVal"
                />
              </div>
            </div>
            <div class="form-group row">
              <div class="form-group col">
                <label for="inputPrice" v-b-tooltip.hover title="Minimum Issue Price">
                  Price Limit
                  <b>*</b>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  class="form-control"
                  id="price"
                  placeholder="0.00"
                  v-model="newOrder.priceLimit"
                />
              </div>
            </div>
            <div class="form-group row">
              <div class="form-group col">
                <label for="orderAmount">Total Nominal Amount</label>
                <label
                  readonly
                  type="text"
                  class="form-control"
                  id="orderAmount"
                >{{newOrderAmt | toCurrency}}</label>
              </div>
            </div>
            <div class="form-group row">
              <div class="form-group col">
                <label for="inputPrice">Interest Rate [%]</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  class="form-control"
                  id="price"
                  placeholder="0.00"
                  v-model="newOrder.intrRate"
                />
              </div>
              <div class="form-group col">
                <label
                  for="inputPrice"
                  v-b-tooltip.hover
                  title="Coupon = Total Nominal Value * Interest Rate"
                >
                  Annual Coupon
                  <b>*</b>
                </label>
                <label
                  readonly
                  type="text"
                  class="form-control"
                  id="orderAmount"
                >{{coupon | toCurrency}}</label>
              </div>
            </div>
            <div class="form-group row">
              <div class="form-group col">
                <label for="orderAmount">Maturity</label>
                <b-form-datepicker
                  v-model="newOrder.matDate"
                  class="mb-2"
                  :min="minMatDate"
                  :value-as-date="true"
                ></b-form-datepicker>
              </div>
            </div>

            <div class="form-group row">
              <label type="text" class="submit-feedback">{{status}}</label>
            </div>
            <div class="form-group row">
              <div class="form-group col-6">
                <button @click="placeOrder()" class="btn btn-primary btn-block">Place Order</button>
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
import AssetService from "@/service/asset.service";
import OrderService from "@/service/order.service";
import PartyService from "@/service/party.service";
import SettingsService from "@/service/settings.service";
import OrderStex from "@/model/OrderStex";
export default {
  name: "NewBondIssue",
  data() {
    return {
      assets: [],
      minMatDate: new Date(new Date().getFullYear(), 11, 31),
      newOrder: new OrderStex(
        null,
        null,
        null,
        "SELL",
        null,
        "STEX_IPO",
        null,
        "No business selected!",
        12,
        100000,
        null,
        1.5,
        10,
        new Date(new Date().getFullYear(), 11, 31)
      ),
      status: ""
    };
  },
  computed: {
    newOrderAmt: function() {
      let amt = this.newOrder.nomVal * this.newOrder.qty;
      return amt;
    },
    coupon: function() {
      let coupon =
        this.newOrder.nomVal *
        this.newOrder.qty *
        (this.newOrder.intrRate / 100);
      return coupon > 0 ? coupon : 0;
    }
  },
  mounted() {
    this.assets = [{ value: null, text: "Please Select Asset" }];
    AssetService.getAllSec().then(response => {
      response.data.forEach(asset => {
        let dropdownItem = { value: asset.id, text: asset.name };
        this.assets.push(dropdownItem);
      });
    });
  },
  methods: {
    setParty(party) {
      this.status = "";
      this.newOrder.partyId = party.id;
      this.newOrder.partyName = party.name;

      SettingsService.getFinYear().then(response => {
        let finYear = response.data;
        this.newOrder.matDate = new Date(finYear + 1, 11, 31);
        this.minMatDate = new Date(finYear + 1, 11, 31);
      });
    },
    newBondIssuance(party) {
      this.setParty(party);
    },
    placeOrder() {
      if (this.newOrder.partyId == null || this.newOrder.partyId == 0) {
        this.status =
          "Error: Issuer could not be found: " + this.newOrder.partyId;
        return;
      }
      if (this.newOrder.qty <= 0) {
        this.status =
          "Error: Order Quantity must be greater 0. Qty: " + this.newOrder.qty;
        return;
      }
      if (this.newOrder.nomVal <= 0) {
        this.status =
          "Error: Nominal Value must be greater 0. Nominal Value: " +
          this.newOrder.priceLimit;
        return;
      }

      if (this.newOrder.intrRate <= 0) {
        this.status =
          "Error: Interest Rate must be greater 0. Interest Rate: " +
          this.newOrder.intrRate;
        return;
      }

      OrderService.placeOrder(this.newOrder).then(
        response => {
          this.status = response.data;
          this.clearForm(false);
        },
        error => {
          this.status = "Error: " && error;
        }
      );
    },
    clearForm(clearStatus) {
      if (clearStatus) {
        this.status = "";
      }
      this.newOrder.matDate = new Date(new Date().getFullYear(), 11, 31);
      // this.newOrder.qty = null;
      // this.newOrder.priceLimit = null;
      // this.newOrder.intrRate = null;
      PartyService.getAvblQty(this.newOrder.partyId, 1).then(response => {
        this.fundsAvbl = response.data;
      });
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
