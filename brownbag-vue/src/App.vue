<template>
  <div id="app">
    <Navbar></Navbar>
    <div id="content">
      <router-view />
      <div id="push"></div>
    </div>
    <div id="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default {
  components: {
    Navbar,
    Footer
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

header {
  display: block;
  padding-top: 2em;
  padding-bottom: 0;
  text-align: center;
}
html,
body {
  height: 100%;
}
#app {
  height: 100vh;
}
#content {
  min-height: 100%;
  height: auto !important;
  height: 100%;
  margin-bottom: -4em;
}
#footer,
#push {
  height: 4em;
}
</style>
