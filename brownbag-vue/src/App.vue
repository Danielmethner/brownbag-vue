<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  components: {
    Navbar
  }
};
</script>
<style scoped>
html {
  padding: 0;
  margin: 0;
}
body {
  padding: 0;
  margin: 0;
}
#app {
  padding: 0;
  margin: 0;
}
</style>
