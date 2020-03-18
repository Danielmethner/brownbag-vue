<template>
  <div class="container">
    <header class="jumbotron">
      <h1>User Profile</h1>
    </header>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr class="bg-success">
          <th colspan="4" scope="colgroup" class="bg-info">User Data</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <b>User ID</b>
          </td>
          <td>{{currentUser.id}}</td>
        </tr>
        <tr>
          <td>
            <b>Login Name</b>
          </td>
          <td>{{currentUser.username}}</td>
        </tr>
        <tr>
          <td>
            <b>Token (Partial)</b>
          </td>
          <td>{{currentUser.accessToken.substring(0, 20)}}...</td>
        </tr>
        <tr>
          <td>
            <b>Authorities</b>
          </td>
          <td>
            <label v-for="(role,index) in currentUser.roles" :key="index">&rArr; {{role}}</label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    currentUser() {
      console.log(this.$store.state.auth);
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  }
};
</script>
