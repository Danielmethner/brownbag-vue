<template>
  <div id="content" class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <form class="card p-4 bg-light">
        <h2 class="text-center">Place new Order</h2>

        <div class="form-group">
          <b-form-group label="Trading direction">
            <div class="btn-group btn-group-toggle">
              <label class="btn btn-lg button-dir" v-bind:class="btnFormat('buy')" >
                <input
                  type="radio"
                  name="options"
                  value="buy"
                  id="buy"
                  v-model="mode"
                  autocomplete="off"
                />Buy
              </label>
              <label class="btn btn-lg button-dir" v-bind:class="btnFormat('sell')">
                <input
                  type="radio"
                  name="options"
                  value="sell"
                  id="sell"
                  v-model="mode"
                  autocomplete="off"
                />Sell
              </label>
            </div>
          </b-form-group>
        </div>
        <!-- :options="options" -->
        <!-- button-variant="outline-success" -->
        <div class="form-group">
          <label for="inputAddress">Order ID</label>
          <label
            readonly
            type="text"
            class="form-control"
            id="inputAddress"
            value="1234 Main St"
          >523</label>
        </div>

        <div class="form-group">
          <label for="inputAddress">Asset</label>
          <input type="text" class="form-control" id="inputAddress" placeholder="Deutsche Bank AG" />
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Price</label>
            <input type="email" class="form-control" id="inputEmail4" placeholder="20.00" />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">Qty</label>
            <input type="password" class="form-control" id="inputPassword4" placeholder="30,000" />
          </div>
        </div>

        <div class="form-group">
          <label for="inputAddress">Order Amount</label>
          <label
            readonly
            type="text"
            class="form-control"
            id="inputAddress"
            value="1234 Main St"
          >600,000</label>
        </div>

        <div class="form-group col-md-12">
          <button type="submit" class="btn btn-primary btn-block">Place Order</button>
          <button type="submit" class="btn btn-dark btn-block">Clear Form</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "radio1",
  data() {
    return {
      mode: "buy",
      btnFormat: function(direction) {
        if (direction == 'buy') {
          return this.mode == "buy" ? 'btn-success': 'btn-outline-success';
        } else {
            return this.mode == "sell" ? 'btn-danger': 'btn-outline-danger';
        }
      },
      myorders: [
        {
          id: 1,
          asset: { name: "Deutsche Bank" },
          direction: "BUY",
          qty: 100,
          price: 20
        }
      ]
    };
  }
};
</script>

<style scoped>
#content {
  /* max-width: 500px; */
  padding-bottom: 50px;
  padding-top: 50px;
  text-align: center;
}
.button-dir {
  min-width: 100px;
}
.form-group {
  text-align:left;
}
</style>
