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
            <!-- <div class="form-group row">
              <label for="inputAddress">Order ID</label>
              <label
                readonly
                type="text"
                class="form-control"
                id="inputAddress"
              >523</label>
            </div> -->
            <div class="form-group row">
              <label for="inputAddress">Ordering Party</label>
              <label
                readonly
                type="text"
                class="form-control"
                id="party"
              >{{newOrder.partyName}}</label>
            </div>
            <div class="form-group row">
              <label for="inputAsset">Asset</label>
              <b-form-select v-model="newOrder.assetId" :options="assets"></b-form-select>
            </div>

            <div class="form-group row">
              <label for="inputPassword4">Qty</label>
              <input
                type="number"
                min="0"
                class="form-control"
                id="inputPassword4"
                placeholder="0,0"
                v-model="newOrder.qty"
              />
            </div>

            <div class="form-group row">
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
              <div class="form-group col">
                <label for="avblFunds">Available Funds</label>
                <label
                  readonly
                  type="text"
                  class="form-control"
                  id="avblFunds"
                >{{newOrder.qtyAvbl | toCurrency}}</label>
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
                <button class="btn btn-dark btn-block">Clear Form</button>
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
      newOrder: {
        assetId: null,
        orderDir: "BUY",
        priceLimit: null,
        qty: null,
        qtyAvbl: 0,
        orderType: "STEX",
        partyId: 0,
        partyName: ''
      },
      status: ""
    };
  },
  computed: {
    newOrderAmt: function() {
      let amt = this.newOrder.priceLimit * this.newOrder.qty;
      return amt;
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
      this.newOrder.partyId = party.id;
      this.newOrder.partyName = party.name;
      PartyService.getAvblQty( this.newOrder.partyId).then(response => {
        this.newOrder.qtyAvbl = response.data;
      });
    },
    genNewOrder(party, isPrivate) {
      // SET PARTY ID
      if (party.id == null) {
        if(isPrivate) {
          PartyService.getPrivatePerson().then(response => {
            this.setParty(response.data);
          });
        }
      } else {
        this.setParty(party);
      } 
      

    },
    placeOrder() {
      if(this.newOrder.assetId == null) {
        this.status = "Error: No asset selected";
        return;
      }
      if(this.newOrder.qty <= 0) {
        this.status = "Error: Order Quantity must be greater 0";
        return;
      }
      if(this.newOrder.priceLimit <= 0) {
        this.status = "Error: Price Limit must be greater 0";
        return;
      }
      if(this.newOrderAmt > this.newOrder.qtyAvbl) {
        this.status = "Error: Order Quantity must be greater 0";
        return;
      }
      OrderService.placeOrder(this.newOrder).then(
        response => {
          this.status = response.data;
        },
        error => {
          this.status = "Error: " && error;
        }
      );
    }
  }
};
</script>

<style scoped>
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
