<template>
  <div>
    <header class="col-md-12">
      <h1>Value Investing</h1>
      <h2>How do get started</h2>
    </header>
    <body>
      <p>Please create an account to get started!</p>
      <p>Current Mode: <b>{{mode}}</b></p>
      <button @click="action()" class="btn btn-primary">Button</button>
    </body>
  </div>
</template>

<script>
import UserService from '../service/user.service';

export default {
  name: 'Home',
  data() {
    return {
      content: '',
      mode: process.env.NODE_ENV
    };
  },
  methods:  {
    action() {
      console.log("a method");
      console.log(process.env.NODE_ENV);
      console.log(process.env.VUE_APP_MYVAR);
      console.log(process.env.VUE_APP_API_URL);
    }
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
  padding-top: 2em;
  text-align: center;
}

body {
  padding-top: 2em;
}
</style>