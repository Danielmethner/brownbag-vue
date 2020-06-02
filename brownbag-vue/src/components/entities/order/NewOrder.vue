<template>
  <div id="content" class="row justify-content-md-center">
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-12 text-center"></div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card p-4 bg-light">
            <div class="form-group">
              <b-form-group>
                <div class="btn-group btn-group-toggle trade-dir">
                  <label class="btn btn-lg button-dir" v-bind:class="btnFormat('BUY')">
                    <input
                      type="radio"
                      name="options"
                      value="BUY"
                      id="buy"
                      v-model="newOrder.orderDir"
                      autocomplete="off"
                    />Buy
                  </label>
                  <label class="btn btn-lg button-dir" v-bind:class="btnFormat('SELL')">
                    <input
                      type="radio"
                      name="options"
                      value="SELL"
                      id="sell"
                      v-model="newOrder.orderDir"
                      autocomplete="off"
                    />Sell
                  </label>
                </div>
              </b-form-group>
            </div>
            <div class="form-group row">
              <div class="form-group col">
                <label for="inputAddress">Ordering Party</label>
                <label readonly type="text" class="form-control" id="party">{{newOrder.partyName}}</label>
              </div>
            </div>
            <div class="form-group row">
              <div class="form-group col">
                <label for="inputAsset">Asset</label>
                <b-form-select v-model="newOrder.assetId" :options="assets" @change="changeAsset()"></b-form-select>
              </div>
            </div>

            <div class="form-group row">
              <div class="form-group col">
                <label for="qty">Qty</label>
                <input
                  type="number"
                  min="0"
                  class="form-control"
                  id="qty"
                  placeholder="0,0"
                  v-model="newOrder.qty"
                />
              </div>
              <div class="form-group col" v-show="isSellOrder">
                <label for="avblQty">Available Quantity</label>
                <label readonly type="text" class="form-control" id="avblQty">{{qtyAvbl}}</label>
              </div>
            </div>

            <div class="form-group row">
              <div class="form-group col">
                <label for="inputPrice">Price</label>
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
                <label for="orderAmount">Order Amount</label>
                <label
                  readonly
                  type="text"
                  class="form-control"
                  id="orderAmount"
                >{{newOrderAmt | toCurrency}}</label>
              </div>
              <div class="form-group col" v-show="!isSellOrder">
                <label for="avblFunds">Available Funds</label>
                <label
                  readonly
                  type="text"
                  class="form-control"
                  id="avblFunds"
                >{{fundsAvbl | toCurrency}}</label>
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
import OrderStex from "@/model/OrderStex";
export default {
  name: "radio1",
  data() {
    return {
      assets: [],
      btnFormat: function(direction) {
        if (direction == "BUY") {
          return this.newOrder.orderDir == "BUY"
            ? "btn-success"
            : "btn-outline-success";
        } else {
          return this.newOrder.orderDir == "SELL"
            ? "btn-danger"
            : "btn-outline-danger";
        }
      },
      fundsAvbl: 0,
      qtyAvbl: 0,
      newOrder: new OrderStex(
        null,
        null,
        null,
        "BUY",
        null,
        "STEX",
        null,
        "No business selected!",
        null,
        null,
        null
      ),
      status: ""
    };
  },
  computed: {
    newOrderAmt: function() {
      let amt = this.newOrder.priceLimit * this.newOrder.qty;
      return amt;
    },
    isSellOrder: function() {
      return this.newOrder.orderDir == "SELL";
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
    changeAsset() {
      this.status = "";
      this.qtyAvbl = 0;
      PartyService.getAvblQty(
        this.newOrder.partyId,
        this.newOrder.assetId
      ).then(response => {
        this.qtyAvbl = response.data;
      });
    },
    setParty(party) {
      this.status = "";
      this.newOrder.partyId = party.id;
      this.newOrder.partyName = party.name;
    },
    genNewOrder(party) {
      this.setParty(party);

      PartyService.getAvblQty(this.newOrder.partyId, 1).then(response => {
        this.fundsAvbl = response.data;
      });
    },
    placeOrder() {
      if (this.newOrder.partyId == null || this.newOrder.partyId == 0) {
        this.status = "Error: No business selected!";
        return;
      }
      if (this.newOrder.assetId == null) {
        this.status = "Error: No asset selected!";
        return;
      }
      if (this.newOrder.qty <= 0) {
        this.status = "Error: Order Quantity must be greater 0!";
        return;
      }
      if (this.newOrder.priceLimit <= 0) {
        this.status = "Error: Price Limit must be greater 0!";
        return;
      }
      if (
        !this.isSellOrder &&
        this.newOrder.qty * this.newOrder.priceLimit > this.newOrder.fundsAvbl
      ) {
        this.status = "Error: Insufficient Funds!";
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
      this.newOrder.assetId = null;
      this.newOrder.qty = null;
      this.newOrder.priceLimit = null;
      this.qtyAvbl = 0;
      PartyService.getAvblQty(this.newOrder.partyId, 1).then(response => {
        this.fundsAvbl = response.data;
      });
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
