<template>
  <div>
    <b-navbar class="bg-dark" toggleable="md" type="dark" variant="info">
      <b-navbar-brand>
        <router-link to="/home" class="nav-link nav-brand">
          <font-awesome-icon icon="home" />Home
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link v-if="currentUser" to="/private" class="nav-link">Personal Finance</router-link>
        </b-navbar-nav>
        <b-navbar-nav>
          <router-link v-if="currentUser" to="/business" class="nav-link">Business Management</router-link>
        </b-navbar-nav>
        <b-navbar-nav>
          <router-link v-if="currentUser" to="/marketresearch" class="nav-link">Market Research</router-link>
        </b-navbar-nav>
        <b-navbar-nav>
          <router-link v-if="currentUser" to="/log" class="nav-link">Application Log</router-link>
        </b-navbar-nav>
        <!-- Public pages-->
        <b-navbar-nav v-if="!currentUser">
          <router-link to="/contact" class="nav-link">Contact</router-link>
          <router-link to="/imprint" class="nav-link">Imprint</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link v-if="currentUser" to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            User: {{ currentUser.username }}
          </router-link>
          <a v-if="currentUser" class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
          <!-- Public pages-->
          <b-navbar-nav v-if="!currentUser">
            <router-link to="/login" class="nav-link">
              <font-awesome-icon icon="sign-in-alt" />Login
            </router-link>
            <router-link to="/register" class="nav-link">
              <font-awesome-icon icon="user-plus" />Sign-up
            </router-link>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    userIsTrader() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_TRADER");
      }
      return false;
    },
    userIsBroker() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_BROKER");
      }
      return false;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.nav-brand {
  color: white !important;
}
.nav-link {
  color: white !important;
}
.bg-dark {
  background-color: royalblue !important;
}
</style>