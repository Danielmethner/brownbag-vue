<template>
  <div id="content" class="row">
    <div class="col-md-12">
      <form class="card p-4 bg-light">
        <h2 class="text-center">Place new Order</h2>
        
        <div class="form-group">
          <label for="inputAddress">Order ID</label>
          <label readonly  type="text" class="form-control" id="inputAddress" value="1234 Main St">523</label>
        </div>

        <div class="form-group">
          <label for="inputAddress">Asset</label>
          <input type="text" class="form-control" id="inputAddress" placeholder="Deutsche Bank AG">
        </div>
        
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Price</label>
            <input type="email" class="form-control" id="inputEmail4" placeholder="20.00">
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">Qty</label>
            <input type="password" class="form-control" id="inputPassword4" placeholder="30,000">
          </div>
        </div>
        
        <div class="form-group">
          <label for="inputAddress">Order Amount</label>
          <label readonly  type="text" class="form-control" id="inputAddress" value="1234 Main St">600,000</label>
        </div>
        
        <div class="form-group col-md-12">
          <button type="submit" class="btn btn-success btn-block">Place Order</button>	
          <button type="submit" class="btn btn-dark btn-block">Clear Form</button>			    
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewOrder",
  data() {
    return {
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

<style>
  #content {
    margin: 0 auto;
  }
  
  .row {
    max-width: 500px;
  }
</style>
