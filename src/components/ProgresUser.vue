<!-- eslint-disable prettier/prettier -->
<template>
    <div class="text-center mx-auto mt-15">
        <h3 class="text-white">Percent of daily average duration reached</h3>
        <p class="text-white">Daily average duration lastest 7 days : {{ averageDuration }} minutes</p>
        <v-progress-circular :model-value="value" :rotate="360" :size="200" :width="35" color="teal">
            <template v-slot:default> {{ value }} % </template>
        </v-progress-circular>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<style scoped>
.v-progress-circular {
    margin: 1rem;
}
</style>
<!-- eslint-disable prettier/prettier -->
<script>

import axios from 'axios';
import store from "@/store";
export default {
    name:'ProgresUser',
    data() {
        return { 
            
            user: store.getters.getUser.id,
            averageDuration:null,
            activiesToday: 0,
            value:0
        }
    },
    mounted() {
       this.fetchActivities()
       
    },
    methods:{
        async fetchActivities() {
            try {
                const response = await axios.get(`http://localhost:3000/activities/user/${this.user}`);
                this.activities = response.data;
                this.averageDuration = await this.averageDailyDuration();
                this.value = await this.dailyProgressReached();
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        },
        async dailyProgressReached(){
            const response = await axios.get(`http://localhost:3000/activities/user/${this.user}/today`);
            this.activiesToday = response.data;

            if(this.value >= 100){
                return 100;
            }else{
                const sumToday = this.activiesToday.reduce((sum, activity) => sum + activity.duration, 0);
                const value = Math.round((sumToday/ this.averageDuration) * 100);
                return value;    
            }
        },

        async averageDailyDuration() {
            this.findSameDay = this.activities.map(activity => new Date(activity.start_date).toISOString().split('T')[0]);
            this.labelsDate = this.findSameDay.filter((date, index) => this.findSameDay.indexOf(date) === index);
            

            let sum = 0;
            for (let i = 0; i < this.labelsDate.length; i++) {
                const activitiesByDay = this.activities.filter(activity => new Date(activity.start_date).toISOString().split('T')[0] === this.labelsDate[i]);
                const duration = activitiesByDay.reduce((sum, activity) => sum + activity.duration, 0);
                sum += duration;
            }
            
            this.averageDuration = Math.round(sum / this.labelsDate.length);
            
            return this.averageDuration;
        }
    }
    
}
</script>