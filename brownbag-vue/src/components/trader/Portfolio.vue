<template>
  <div>
    <header class="jumbotron">
      <h1>Portfolio</h1>
      <h3>Overview over Your current holdings</h3>
    </header>
    <div>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Asset</th>
            <th scope="col">Qty</th>
            <th scope="col">Buy Price</th>
            <th scope="col">Curr. Price</th>
            <th scope="col">Buy Value</th>
            <th scope="col">Curr. Value</th>
            <th scope="col">P/L</th>
            <th scope="col">P/L [%]</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="position in positions" v-bind:key="position.id">
            <th scope="row">{{position.id}}</th>
            <td>{{position.asset.name}}</td>
            <td>{{position.qty}}</td>
            <td>$ {{position.priceAvg}}</td>
            <!-- <td>$ {{position.asset.currPrice}}</td> -->
            <!-- <td>$ {{position.buyVal()}}</td> -->
            <!-- <td>$ {{position.currVal()}}</td> -->
            <!-- <td v-bind:class="position.pl() > 0  ? 'amtPositive' : 'amtNegative'">$ {{position.pl()}}</td> -->
            <!-- <td v-bind:class="position.pl() > 0  ? 'amtPositive' : 'amtNegative'">{{position.plPerc()}} %</td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PosService from "../../service/pos.service";


export default {
  name: "UserProfile",
  data() {
    return {
      content: "",
      positions: []
    };
  },
  mounted() {
    PosService.getPosByUser().then(response => {
      response.data.forEach(pos => {
        console.log(pos);
        this.positions.push(pos);
      });
    });
  },
  calculated() {

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
</style>
