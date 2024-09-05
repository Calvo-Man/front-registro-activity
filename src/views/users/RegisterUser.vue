<!-- eslint-disable prettier/prettier -->
<template>
  <v-container class="mx-auto text-center bg-indigo-darken-4 rounded" width="500">
    <p class="font-weight-black text-blue-lighten-4 mb-4">Create account</p>
    <v-form fast-fail submit.prevent>
      <v-text-field v-model="name" class="bg-dark" label="Name" :rules="nameRules" />
      <v-text-field type="number" v-model="age" class="bg-dark" label="Age" :rules="ageRules" />
      <v-text-field type="number" v-model="height" class="bg-dark" label="height (Cm)" :rules="heightRules" />
      <v-text-field type="number" v-model="weight" class="bg-dark" label="Weight(Kg)" :rules="weightRules" />
      <v-text-field v-model="email" class="bg-dark" label="Email" :rules="emailRules" />
      <v-text-field v-model="password" label="Password" :rules="passwordRules" type="password" />
      <v-text-field v-model="confirmPassword" label="Confirm Password" :rules="confirmPasswordRules" type="password" />
      <v-btn class="mt-8 text-blue-lighten-4 bg-black" type="submit" @click="register">Register</v-btn>
    </v-form>
  </v-container>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import axios from 'axios';
export default {
  data: () => ({
    name: '',
    email: '',
    age: '',
    height: '',
    weight: '',
    password: '',
    confirmPassword: '',
    nameRules: [
      value => !!value || 'Name is required.',
    ],
    ageRules: [
      value => !!value || 'Age is required.',
    ],
    weightRules: [
      value => !!value || 'Weight is required.',
    ],
    heightRules: [
      value => !!value || 'Height is required.',
    ],
    emailRules: [
      value => !!value || 'E-mail is required.',
      value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
    ],
    passwordRules: [
      value => !!value || 'Password is required.',
      // value => value.length >= 8 || 'Password must be at least 8 characters.',
      // value => /(?=.*[A-Z])/.test(value) || 'Password must contain at least one uppercase letter.',
      // value => /(?=.*[0-9])/.test(value) || 'Password must contain at least one number.',
      // value => /(?=.*[!@#$%^&*])/.test(value) || 'Password must contain at least one special character.',
    ],
    confirmPasswordRules: [
      value => !!value || 'Confirm Password is required.',
      //value => value === this.password || 'Passwords do not match.',

    ],
  }),
  methods: {
    async register() {

      const numericAge = parseInt(this.age, 10);
      const numericHeight = parseInt(this.height, 10);
      const numericWeight = parseInt(this.weight, 10);


      // Lógica para el registro de usuario
      await axios.post(`http://localhost:3000/auth/register`, {
        name: this.name,
        age: numericAge,
        height: numericHeight,
        weight: numericWeight,
        email: this.email,
        password: this.password,
        role: 3
      })
      alert('Registration successful!')

    },

  }
}
</script>