<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <NavBar />
    <h2 class="text-center text-white">Registro de actividades</h2>
    <v-data-table :items="items" :headers="headers"></v-data-table>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import axios from 'axios';
import store from "@/store";
import NavBar from '@/components/NavBar.vue';
export default {
  components:{NavBar},
  data: () => ({
    
    user :store.getters.getUser.id,
    items: [],
    headers: [
          { title: 'Name', align: 'start', key: 'exercise.name' },
          { title: 'Reps', align: 'end', key: 'reps' },
          { title: 'Lifted weight (Kg)', align: 'end', key: 'lifted_weight' },
          { title: 'Duration', align: 'end', key: 'duration' },
          { title: 'Date', align: 'end', key: 'start_date' },
        ],
  }),

  mounted() {
    this.fetchActivities();
    
  },
  methods: {
    fetchActivities() {
      console.log(this.user)
      axios
        .get(`http://localhost:3000/activities/user/${this.user}/all`)
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>