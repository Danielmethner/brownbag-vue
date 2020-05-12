<template>
<div>
  <header class="col-md-12">
    <h1>Value Investing</h1>
    <h2>How do get started</h2>
  </header>
  <body>
    <p>Please create an account to get started!</p>
    <p>
      Current Mode:
      <b>{{mode}}</b>
    </p>
  </body>
</div>
</template>

<script>
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
  }
};
</script>
<style scoped>
header {
  display: block;
  padding-top: 2em;
  text-align: center;
}

body {
  padding-top: 2em;
}
</style>