<!-- eslint-disable prettier/prettier -->
<template>
      <v-app-bar color="transparent" flat app>
        <!-- Título o logo 
        <v-toolbar-title>Mi Aplicación</v-toolbar-title>
        -->
        <!-- Espaciador para empujar el contenido a la derecha -->
        <v-spacer></v-spacer>
  
        <!-- Elementos del menú -->
        <v-btn class="text-white" text to="/dashboard">Inicio</v-btn>
        <v-btn class="text-white" text to="/create-activity">Create</v-btn>
        <v-btn class="text-white" text to="/ranking/duration">Duration</v-btn>
        <v-btn class="text-white" text to="/ranking/reps">Reps</v-btn>
  
        <!-- Ícono para acciones adicionales, como iniciar sesión -->
        <v-btn icon>
          <v-icon class="text-white" @click="logout">mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
  </template>
<!-- eslint-disable prettier/prettier -->
  <script>
  export default {
    name: "NavBar",
    methods:{
      logout() {
      this.$store.commit("destroyUser")
      this.$router.push({ path: "/login"});
    }
    }
  };
  </script>