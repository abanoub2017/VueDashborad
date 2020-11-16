<template>
  <transition name="fade">
    <div class="w-50 m-auto p-3 mt-3 rounded border shadow">
      <Message severity="info">
        For User => Email: user@gmail.com ,Password: user
      </Message>
      <Message severity="info">
        For Admin => Email: admin@gmail.com ,Password: admin
      </Message>
      <form @submit.prevent="autenticate">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            v-model="loginInfo.email"
            required
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="loginInfo.password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </transition> 
</template>

<script>
import Message from "primevue/message";
export default {
  data() {
    return {
      validation: false,
      loginInfo: {
        email: "",
        password: "",
      },
    };
  },
  components: { Message },
  methods: {
    autenticate() {
      if (
        this.loginInfo.email === "user@gmail.com" &&
        this.loginInfo.password === "user"
      ) {
        localStorage.setItem("authenticated", true);
        this.loginInfo.role = "user";
        localStorage.setItem("userData", JSON.stringify(this.loginInfo));
        this.$router.push({ path: "/user", query: { login: true } });
      } else if (
        this.loginInfo.email === "admin@gmail.com" &&
        this.loginInfo.password === "admin"
      ) {
        localStorage.setItem("authenticated", true);
        this.loginInfo.role = "admin";
        localStorage.setItem("userData", JSON.stringify(this.loginInfo));
        this.$router.push({ path: "/admin", query: { login: true } });
      }
    },
  },
};
</script>

<style scoped  lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}

.fade-enter,
.fade-leave-to {
  /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
}
</style>