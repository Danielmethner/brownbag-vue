<template>
  <div>
    <b-navbar class="bg-dark" toggleable="md" type="dark" variant="info">
      <b-navbar-brand>
        <router-link v-if="!currentUser" to="/home" class="nav-link nav-brand">
          <b-icon icon="bootstrap-fill" aria-hidden="false" class="profile-img-card"></b-icon> Home
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link v-if="currentUser" to="/private" class="nav-link">
            <b-icon icon="person" aria-hidden="true"></b-icon> Personal Finance
          </router-link>
        </b-navbar-nav>
        <b-navbar-nav>
          <router-link v-if="currentUser" to="/business" class="nav-link">
            <b-icon icon="building" aria-hidden="true"></b-icon> Business Management
          </router-link>
        </b-navbar-nav>
        <b-navbar-nav>
          <router-link v-if="currentUser" to="/marketresearch" class="nav-link">
            <b-icon icon="graph-up" aria-hidden="true"></b-icon> Market Research
          </router-link>
        </b-navbar-nav>
        <b-navbar-nav>
          <router-link v-if="userIsBroker" to="/brokerage" class="nav-link">
            <b-icon icon="book" aria-hidden="true"></b-icon> Brokerage
          </router-link>
        </b-navbar-nav>
        <b-navbar-nav>
          <router-link v-if="currentUser" to="/system-control" class="nav-link">
            <b-icon icon="gear-fill" aria-hidden="true"></b-icon>
            <span> Settings</span>
          </router-link>
        </b-navbar-nav>
        <!-- Public pages-->
        <b-navbar-nav v-if="!currentUser">
          <!-- <router-link to="/architecture" class="nav-link">Architecture</router-link> -->
          <router-link to="/tech-stack" class="nav-link">Technology Stack</router-link>
          <!-- <router-link to="/trading-simulation" class="nav-link">Trading Simulation</router-link> -->
          <router-link to="/data-privacy" class="nav-link">Data Privacy</router-link>
          <router-link to="/imprint" class="nav-link">Imprint</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link v-if="currentUser" to="/profile" class="nav-link">
            <b-icon icon="person-square" aria-hidden="true"></b-icon>
            {{ currentUser.username }}
          </router-link>
          <a v-if="currentUser" class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
          <!-- Public pages-->
          <b-navbar-nav v-if="!currentUser">
            <router-link to="/login" class="nav-link">
              <font-awesome-icon icon="sign-in-alt" /> Login
            </router-link>
            <router-link to="/register" class="nav-link">
              <font-awesome-icon icon="user-plus" /> Sign-up
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
        return this.currentUser.roles.includes("Broker");
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