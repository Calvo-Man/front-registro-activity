<!-- eslint-disable prettier/prettier -->
<template>
  <v-container
  class="mx-auto text-center bg-indigo-darken-4 rounded"
  height="300"
  width="500"
  >
  <p class="font-weight-black text-blue-lighten-4 mb-4">Sign in</p>
  
  <v-form ref="form" validate-on="login lazy" @submit.prevent="login">
      <v-text-field
        v-model="email"
        class="bg-dark"
        label="Email"
        :rules="emailRules"
        />
        
        <v-text-field
        v-model="password"
        label="Password"
        :rules="passwordRules"
        type="password"
        />
        <v-btn
        :loading="loading"
        class="mt-2"
        text="Submit"
        
        @click="login"
      ></v-btn>
      </v-form>
    </v-container>
  </template>
<!-- eslint-disable prettier/prettier -->
<script>
import axios from "axios";
export default {
  data: () => ({
    API: process.env.VUE_APP_API,
    loading:false,
    email: "",
    emailRules: [
      (value) => !!value || "E-mail is required.",
      (value) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
    ],
    password: "",
    passwordRules: [
      (value) => !!value || "Password is required.",
      // Agregar más reglas según sea necesario
    ],
  }),
  methods: {
    async login() {

      const isValid = this.$refs.form.validate(); // Valida el formulario


      if (!isValid) {
        console.log("Formulario no válido");
        return; // Si el formulario no es válido, no se envía
      }

      try {
        const response = await axios.post(`${this.API}/auth/login`, {
          email: this.email,
          password: this.password,
        });
        console.log("Login exitoso:", response.data);

        this.$store.commit("setUser",response.data)
        
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        if (error.response) {
          console.error("Error de respuesta:", error.response.data);
          console.error("Código de estado:", error.response.status);
          console.error("Encabezados:", error.response.headers);
        } else if (error.request) {
          console.error("Sin respuesta del servidor:", error.request);
        } else {
          console.error("Error en la solicitud:", error.message);
        }
        console.error("Configuración completa del error:", error.config);
      }
    },
    
  },
};
</script>
