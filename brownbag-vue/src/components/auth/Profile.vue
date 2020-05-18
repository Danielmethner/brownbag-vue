<template>
  <div class="container">
    <header class="jumbotron">
      <h1>User Profile</h1>
    </header>
    <div class="row">
      <div class="col">
        <table class="table table-striped">
          <thead class="table-dark">
            <tr class="bg-success">
              <th colspan="2" scope="colgroup" class="bg-info">User Data</th>
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
                <div v-for="(role,index) in currentUser.roles" :key="index">
                  <label>&rArr; {{role}}</label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col">
        <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th colspan="2" scope="colgroup">Private Person</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>Person ID</b>
              </td>
              <td>{{privatePerson.id}}</td>
            </tr>
            <tr>
              <td>
                <b>Person Name</b>
              </td>
              <td>{{privatePerson.name}}</td>
            </tr>
            <tr>
              <td>
                <b>Party Type</b>
              </td>
              <td>{{privatePerson.partyType}}</td>
            </tr>
            <tr>
              <td>
                <b>Legal Form</b>
              </td>
              <td>{{privatePerson.legalForm}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    privatePerson() {
      return this.$store.state.party.privatePerson;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  }
};
</script>
