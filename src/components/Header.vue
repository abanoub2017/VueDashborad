<template>
  <div>
    <Menubar :model="items" class="shadow px-5">
      <template #start>
        <img alt="logo" src="../assets/logo.png" height="30" class="p-mx-2" />
      </template>
      <template #end>
        <button
          v-if="checked"
          class="btn btn-danger rounded-lg shadow mx-2"
          @click="logout"
        >
          Logout {{userInfo.role || ''}}
        </button>
        <router-link v-else class="btn btn-info rounded-lg shadow" to="/auth"
          >Login</router-link
        >
      </template>
    </Menubar>
  </div>
</template>

<script>
import Menubar from "primevue/menubar";
export default {
  name: "Header",
  components: {
    Menubar,
  },
  data() {
    return {
      checked: false,
      userInfo:'',
      items: [
        {
          label: "Home",
          icon: "pi pi-fw pi-file",
          to: "/",
        },
        {
          label: "Curd",
          icon: "pi pi-fw pi-file",
          to: "/curd",
        },
      ],
    };
  },
  watch: {
    $route() {
    if (this.$route.query.login === "true") {
        this.checked = true;
        this.userInfo = JSON.parse(localStorage.getItem('userData'))
      }
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("authenticated");
      localStorage.removeItem("userData");
      this.userInfo  = ''
      this.checked = false;
      this.$router.push({ path: "/auth" });
    },
  },
};
</script>
