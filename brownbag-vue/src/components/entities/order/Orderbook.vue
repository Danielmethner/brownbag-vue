<template>
  <div>
    <div class="row" v-if="userIsBroker">
      <div class="col">
        <div class="row form-group">
          <div class="col-md-12 form-group">
            <div class="row">
              <div class="col-md-10">
                <h3>Order Matching</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-6 form-group">
            <div class="row">
              <div class="col-md-10">
                <label for="orderBuy" class="orderbook-input-caption">Buy Order</label>
              </div>
            </div>
            <div class="row form-group">
              <div class="col-md-10 form-group">
                <input readonly class="form-control" id="orderBuy" v-model="orderBuyCaption" />
              </div>
              <div class="col-md-2 form-group">
                <b-button
                  variant="outline-danger"
                  @click="removeOrder('BUY')"
                  v-if="userIsBroker"
                >Remove</b-button>
              </div>
            </div>
          </div>
          <div class="col-md-6 form-group">
            <div class="row">
              <div class="col-md-10">
                <label for="orderSell" class="orderbook-input-caption">Sell Order</label>
              </div>
            </div>
            <div class="row form-group">
              <div class="col-md-10 form-group">
                <input readonly class="form-control" id="orderBuy" v-model="orderSellCaption" />
              </div>
              <div class="col-md-2 form-group">
                <b-button
                  variant="outline-danger"
                  @click="removeOrder('SELL')"
                  v-if="userIsBroker"
                >Remove</b-button>
              </div>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-5 form-group">
            <div class="row  form-group">
              <div class="col-md-12  form-group">
                <label for="orderSell" class="orderbook-input-caption">Execution Quantity</label>
                <input readonly class="form-control" id="orderBuy" v-model="execQty" />
              </div>
            </div>
          </div>
          <div class="col-md-1 form-group"></div>
          <div class="col-md-5 form-group">
            <div class="row  form-group">
              <div class="col-md-12  form-group">
                <label for="orderSell" class="orderbook-input-caption">Execution Price</label>
                <input readonly class="form-control" id="orderBuy" v-model="execPrice" />
              </div>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-12 form-group">
            <div class="row  form-group">
              <div class="col  form-group">
                <label for="orderBuy" class="orderbook-input-caption">Matching Validation Status</label>
              </div>
            </div>
            <div class="row form-group">
              <div class="col-10 form-group">
                <input readonly class="form-control" id="orderBuy" v-model="validationStatus" />
              </div>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-12 form-group">
            <div class="row">
              <div class="col">
                <label for="orderBuy" class="orderbook-input-caption">Matching Result</label>
              </div>
            </div>
            <div class="row form-group">
              <div class="col-10 form-group">
                <input readonly class="form-control" id="orderBuy" v-model="matchingResult" />
              </div>
              <div class="col form-group">
                <b-button variant="primary" @click="matchOrders()" v-if="userIsBroker">Match orders</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <b-table
          striped
          hover
          :items="orderbook.buyOrders"
          :fields="headers"
          head-variant="dark"
          sort-icon-left
        >
          <template v-slot:thead-top="data">
            <b-tr>
              <b-th class="bg-success" colspan="5">BUY</b-th>
            </b-tr>
          </template>
          <template v-slot:cell(priceLimit)="data">{{ data.item.priceLimit | toCurrency }}</template>
          <template v-slot:cell(match)="row">
            <b-button
              size="sm"
              variant="outline-danger"
              @click="selectOrder(row.item)"
              v-if="userIsBroker"
            >Select</b-button>
          </template>
        </b-table>
      </div>
      <div class="col-md-6">
        <b-table
          striped
          hover
          :items="orderbook.sellOrders"
          :fields="headers"
          head-variant="dark"
          sort-icon-left
        >
          <template v-slot:thead-top="data">
            <b-tr>
              <b-th class="bg-danger" colspan="5">SELL</b-th>
            </b-tr>
          </template>
          <template v-slot:cell(priceLimit)="data">{{ data.item.priceLimit | toCurrency }}</template>
          <template v-slot:cell(match)="row">
            <b-button
              size="sm"
              variant="outline-danger"
              @click="selectOrder(row.item)"
              v-if="userIsBroker"
            >Select</b-button>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import OrderService from "@/service/order.service";
export default {
  name: "UserProfile",
  data() {
    return {
      content: "",
      orderBuy: {},
      orderSell: {},
      orderbook: {
        buyOrders: [],
        sellOrders: []
      },
      matchingResult: "",
      headers: [
        { label: "Order ID", key: "id", sortable: true },
        { label: "Asset", key: "assetName", sortable: true },
        { label: "Quantity", key: "qty", sortable: true },
        { label: "Price", key: "priceLimit", sortable: true },
        { key: "match" }
      ]
    };
  },
  computed: {
    validationStatus() {
      let buyPrice = this.orderBuy.priceLimit;
      let sellPrice = this.orderSell.priceLimit;
      if (sellPrice == null || buyPrice == null) {
        return null;
      }
      if (sellPrice > buyPrice) {
        return "ERROR: Buy price must be higher than sell price!";
      }
      if (this.orderBuy.partyId == this.orderSell.partyId) {
        return "ERROR: Buyer and Seller must not be identical!";
      }
      return "Orders are ready to be matched!";
    },
    execQty() {
      let qtyBuy = this.orderBuy.qty;
      let qtySell = this.orderSell.qty;
      if (qtyBuy == null || qtySell == null) {
        return null;
      } else {
        return qtyBuy > qtySell ? qtySell : qtyBuy;
      }
    },
    execPrice() {
      let buyPrice = this.orderBuy.priceLimit;
      let sellPrice = this.orderSell.priceLimit;
      if (buyPrice == null || sellPrice == null) {
        return null;
      }
      if (sellPrice > buyPrice) {
        return "-";
      }
      return (this.orderBuy.priceLimit + this.orderSell.priceLimit) / 2;
    },
    orderBuyCaption() {
      return this.orderCaption(this.orderBuy);
    },
    orderSellCaption() {
      return this.orderCaption(this.orderSell);
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    userIsBroker() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("Broker");
      }
      return false;
    }
  },
  methods: {
    orderCaption(orderStex) {
      if (orderStex.id == null) {
        return null;
      } else {
        return (
          orderStex.id +
          ": '" +
          orderStex.assetName +
          "'. Party: '" +
          orderStex.partyName +
          "' Qty: " +
          orderStex.qty +
          " Price: " +
          orderStex.priceLimit
        );
      }
    },
    selectOrder(orderStex) {
      if (orderStex.orderDir == "BUY") {
        this.orderBuy = orderStex;
      }
      if (orderStex.orderDir == "SELL") {
        this.orderSell = orderStex;
      }
    },
    matchOrders() {
      if (this.orderBuy.id != null && this.orderSell.id != null) {
        OrderService.matchOrders(this.orderBuy.id, this.orderSell.id).then(
          response => {
            this.matchingResult = response.data;
          }
        );
      }
    },
    removeOrder(orderDir) {
      if (orderDir == "BUY") {
        this.orderBuy = {};
      }
      if (orderDir == "SELL") {
        this.orderSell = {};
      }
    },
    getOrderbook(assetId) {
      this.orderbook.buyOrders = [];
      this.orderbook.sellOrders = [];
      if (assetId) {
        OrderService.getOrdersByPlacedAndAsset(assetId).then(response => {
          response.data.forEach(order => {
            if (order.orderDir == "BUY") {
              this.orderbook.buyOrders.push(order);
            } else {
              this.orderbook.sellOrders.push(order);
            }
          });
        });
      }
    }
  },
  mounted() {
    this.getOrderbook();
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
.orderbook-input-caption {
  font-size: 1.1em;
}
</style>
