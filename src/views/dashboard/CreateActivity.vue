<!-- eslint-disable prettier/prettier -->
<template>
  <header>
    <NavBar />
  <v-container class="mx-aut mt-5 text-center bg-indigo-darken-4 rounded" width="500" height="580">
    <p class="font-weight-black text-blue-lighten-4 mb-4">Create activity</p>
    <v-form fast-fail submit.prevent>
      <v-select v-model="selectedExercise" @update:modelValue="fetchMachinesByCategory" :items="exercises"
        item-title="name" item-value="id" label="Select exercise"></v-select>

      <v-select v-model="selectedMachine" :items="machines" item-title="name" item-value="id"
        label="Select machine"></v-select>

      <v-text-field type="number" v-model="reps" class="bg-dark" label="Reps" />
      <v-text-field type="number" v-model="lifted_weight" class="bg-dark" label="Lifted weight(Kg)"
        :rules="heightRules" />
      <v-text-field type="datetime-local" v-model="start_date" label="Select start date"></v-text-field>
      <v-text-field type="datetime-local" v-model="end_date" label="Select end date"></v-text-field>

      <v-btn class="mt-3 text-blue-lighten-4 bg-black" type="submit"  @click="register">Register</v-btn>
    </v-form>
  </v-container>
  <ProgresUser />
  </header>
</template>
<!-- eslint-disable prettier/prettier -->

<script>
import axios from 'axios';
import store from "@/store";


import ProgresUser from '@/components/ProgresUser.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  components: { ProgresUser,NavBar },
  data: () => (
    {
      exercises: [],
      machines: [],
      selectedMachine: null,
      selectedExercise: null,
      reps: null,
      lifted_weight: null,
      start_date: null,
      end_date: null,
      user: null,
      nameRules: [
        value => !!value || 'Name is required.',
      ],


    }),

  mounted() {
    this.fetchExercises();
    this.user = store.getters.getUser.id
  },
  methods: {
    async register() {

      const numericReps = parseInt(this.reps, 10);
      const numericWeight = parseInt(this.lifted_weight, 10);


      // Lógica para el registro de actividad
      await axios.post(`http://localhost:3000/activities`, {
        userId: this.user,
        exerciseId: this.selectedExercise,
        machineId: this.selectedMachine,
        reps: numericReps,
        lifted_weight: numericWeight,
        start_date: this.start_date,
        end_date: this.end_date
      }, {
        headers: {
          Authorization: `Bearer ${store.getters.getUser.token}`
        },
      }

      )
      alert('Activity registered successfully!')
      this.fetchExercises();
      
    },
    async fetchExercises() {
      try {
        const response = await axios.get('http://localhost:3000/exercises')
        this.exercises = response.data;
      } catch (error) {
        console.error('Error fetching exercise:'.error);
      }
    },
    async fetchMachinesByCategory(id) {
      const findCategory = this.exercises.find(exercise => exercise.id === id).machineCategory.category
      try {
        if (this.exercises) {
          const response = await axios.get(`http://localhost:3000/machine-category/category/${findCategory}`)
          this.machines = response.data.machine
        } else {
          this.machines = []
        }
      } catch (error) {
        console.error('Error fetching machines:'.error);
      }
    }

  }
}

</script>