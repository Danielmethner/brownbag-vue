<template>
  <!-- <nav class="navbar navbar-expand navbar-dark bg-dark">
    <router-link to="/home" class="nav-link navbar-brand">
      <font-awesome-icon icon="home" />Home
    </router-link>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link v-if="currentUser" to="/profile" class="nav-link">Profile</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="userIsTrader" to="/portfolio" class="nav-link">Portfolio</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="userIsTrader" to="/orderbook" class="nav-link">Orderbook</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="userIsTrader" to="/tradingdesk" class="nav-link">Trading Desk</router-link>
      </li>

      <li v-if="showAdminBoard" class="nav-item">
        <router-link to="/admin" class="nav-link">Admin Board</router-link>
      </li>
    </div>

    <div v-if="!currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/register" class="nav-link">
          <font-awesome-icon icon="user-plus" />Sign Up
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/login" class="nav-link">
          <font-awesome-icon icon="sign-in-alt" />Login
        </router-link>
      </li>
    </div>

    <div v-if="currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/profile" class="nav-link">
          <font-awesome-icon icon="user" />
          User: {{ currentUser.username }}
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href @click.prevent="logOut">
          <font-awesome-icon icon="sign-out-alt" />LogOut
        </a>
      </li>
    </div>
  </nav>-->

  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Home</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link v-if="userIsTrader" to="/portfolio" class="nav-link">Portfolio</router-link>
        </b-navbar-nav>
        <b-navbar-nav>
          <router-link v-if="userIsTrader" to="/orderbook" class="nav-link">Orderbook</router-link>
        </b-navbar-nav>
        <b-navbar-nav>
          <router-link v-if="userIsTrader" to="/tradingdesk" class="nav-link">Trading Desk</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            User: {{ currentUser.username }}
          </router-link>
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
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
.bg-dark {
  background-color: royalblue !important;
}
</style>