<template>
  <div class="container">
    <header class="col-md-12">
      <h1>Value Investing</h1>
      <h2>Basics of Trading</h2>
    </header>
  </div>
</template>

<script>
import UserService from '../service/user.service';

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
<style scoped>
header {
  display: block;
}
</style>