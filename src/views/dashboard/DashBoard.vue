<!-- eslint-disable prettier/prettier -->
<template>
    <div>
        <v-btn class="mx-2 text-blue-lighten-1 bg-black" prepend-icon="mdi-logout" variant="elevated" @click="logout">
    Logout
  </v-btn>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->

    <script>
    
    // eslint-disable-next-line no-unused-vars
    import LogoutUser from '../../components/LogoutUser.vue';
    export default {
        name: 'LogoutUser',
        methods:{
    logout() {
      this.$store.commit("destroyUser")
      this.$router.push({ path: "/login"});
    }
  }
           
    }
    </script>