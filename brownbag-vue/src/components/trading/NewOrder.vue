<template>
  <div id="content" class="row justify-content-md-center">
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-12 text-center">
          <h4>Place new order</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card p-4 bg-light">
            <div class="form-group col-12">
              <b-form-group label="Trading direction">
                <div class="btn-group btn-group-toggle trade-dir">
                  <label class="btn btn-lg button-dir" v-bind:class="btnFormat('BUY')">
                    <input
                      type="radio"
                      name="options"
                      value="BUY"
                      id="buy"
                      v-model="newOrder.direction"
                      autocomplete="off"
                    />Buy
                  </label>
                  <label class="btn btn-lg button-dir" v-bind:class="btnFormat('SELL')">
                    <input
                      type="radio"
                      name="options"
                      value="SELL"
                      id="sell"
                      v-model="newOrder.direction"
                      autocomplete="off"
                    />Sell
                  </label>
                </div>
              </b-form-group>
            </div>
            <!-- :options="options" -->
            <!-- button-variant="outline-success" -->
            <div class="form-group col-12">
              <label for="inputAddress">Order ID</label>
              <label
                readonly
                type="text"
                class="form-control"
                id="inputAddress"
                value="1234 Main St"
              >523</label>
            </div>

            <div class="form-group col-12">
              <label for="inputAsset">Asset</label>
              <b-form-select v-model="newOrder.asset" :options="assets"></b-form-select>
            </div>

            <div class="form-group col-12">
              <label for="inputPrice">Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                class="form-control"
                id="inputEmail4"
                placeholder="20.00"
                v-model="newOrder.price"
              />
            </div>

            <div class="form-group col-12">
              <label for="inputPassword4">Qty</label>
              <input
                type="number"
                min="0"
                class="form-control"
                id="inputPassword4"
                placeholder="30,000"
                v-model="newOrder.qty"
              />
            </div>

            <div class="form-group col-12">
              <label for="inputAddress">Order Amount</label>
              <label
                readonly
                type="text"
                class="form-control"
                id="inputAddress"
              >{{newOrderAmt | toCurrency}}</label>
            </div>

            <div class="form-group col-12">
              <label type="text" class="submit-feedback">{{status}}</label>
            </div>
            <div class="form-group col-12">
              <button @click="placeOrder()" class="btn btn-primary btn-block">Place Order</button>
              <button class="btn btn-dark btn-block">Clear Form</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssetService from "../../service/asset.service";
import OrderService from "../../service/order.service";
export default {
  name: "radio1",
  data() {
    return {
      assets: [],
      btnFormat: function(direction) {
        if (direction == "BUY") {
          return this.newOrder.direction == "BUY"
            ? "btn-success"
            : "btn-outline-success";
        } else {
          return this.newOrder.direction == "SELL"
            ? "btn-danger"
            : "btn-outline-danger";
        }
      },
      newOrder: {
        asset: 2,
        direction: "BUY",
        price: 22,
        qty: 12
      },
      status: ""
    };
  },
  computed: {
    newOrderAmt: function() {
      let amt = this.newOrder.price * this.newOrder.qty;
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
    placeOrder() {
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
