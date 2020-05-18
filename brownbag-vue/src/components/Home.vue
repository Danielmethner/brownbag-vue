<template>
<div>
  <header>
    <div class="row">
      <div class="col">
        <h1>Value Investing</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h4>
          No account yet?
          <router-link to="/register" class>Sign up here!</router-link>
        </h4>
      </div>
    </div>
  </header>
  <body>
    <div class="row">
      <div class="col-md-12">
        <Login></Login>
      </div>
    </div>
  </body>
</div>
</template>

<script>
import Login from "@/components/auth/Login";
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
    Login
  }
};
</script>
<style scoped>
</style>