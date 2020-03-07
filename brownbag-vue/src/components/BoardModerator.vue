<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Moderator Data</h3>
    </header>
  </div>
</template>

<script>
import UserService from '../service/user.service';

export default {
  name: 'Moderator',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getUserBoard().then(
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
