<template>
  <div id="app" class ="container">
    <Auth />
    <Todos />
  </div>
</template>

<script>
import Auth from "./components/Auth.vue";
import Log from "./components/Log.vue";
import Todos from "./components/Todos.vue";

export default {
  name: "App",
  components: {
    Auth,
    Log,
    Todos
  }
};
</script>

<style>
/* @import "./assets/css/erp.css"; */
.container {
  margin: 0 auto;
  max-width: 600px;}
</style>
