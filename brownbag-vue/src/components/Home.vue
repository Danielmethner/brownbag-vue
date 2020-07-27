<template>
<div>
  <header>
    <b-jumbotron class="jumbo" text-variant="white" fluid>
      <h1>Value Investing</h1>
    </b-jumbotron>
  </header>
  <body>
    <div class="row intro-cont">
      <div class="col-md-6">
        <Benefits></Benefits>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-8">
            <Login></Login>
          </div>
        </div>
        <div class="col-md-4"></div>
      </div>
    </div>
  </body>
</div>
</template>

<script>
import Login from "@/components/auth/Login";
import Benefits from "@/components/public/landing-page/Benefits";

import authHeader from "../service/auth-header";
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      content: "",
      mode: process.env.NODE_ENV
    };
  },
  methods: {
    action() {
      axios.get("http://localhost:8081/api/order/user", {
        headers: authHeader()
      });
    }
  },
  components: {
    Login,
    Benefits
  }
};
</script>
<style scoped>
h1 {
  font-weight: bold;
}
header {
  padding-top:0;
}
.intro-cont {
  padding-top: 2em;
}
.jumbo{
  background-color:mediumseagreen
}
</style>