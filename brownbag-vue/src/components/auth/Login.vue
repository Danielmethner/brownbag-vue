<template>
  <div class="col-md-12">
    <div class="card card-container">
      <b-icon icon="bootstrap-fill" aria-hidden="false" variant="success" class="profile-img-card"></b-icon>
      <h3>Login</h3>
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="user.username" type="text" class="form-control" name="username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="user.password" type="password" class="form-control" name="password" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              v-on:keyup.esc="stopLoading()"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import VeeValidate from 'vee-validate';
import User from "@/model/user";
import PartyService from "@/service/party.service";

export default {
  name: "Login",
  data() {
    return {
      user: new User("U_TRADER_1", "U_TRADER_1"),
      loading: false,
      message: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    stopLoading() {
      this.loading = false;
    },
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            response => {
              if (response != null) {
                this.$router.push("/profile");
                PartyService.getPrivatePerson().then(response => {
                  this.$store.commit("party/privatePerson", response.data);
                });
              } else {
                this.message = "Login failed";
                this.loading = false;
              }
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  margin-bottom: 2em;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
