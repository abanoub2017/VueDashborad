<template>
  <div class="container py-5">
     <h1 class="text-center">{{checkRoute ==='login'? 'Login' : 'Regestration'}}</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkRoute: this.$route.name
    };
  },
  components: {
  }
};
</script>

<style scoped  lang="scss">
</style>