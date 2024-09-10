<!-- eslint-disable prettier/prettier -->
<template>
    <div class="rounded mt-5 mx-7 bg-color" style="justify-content: center">
        <v-form fast-fail submit.prevent>
            <v-select v-model="rangeSelected" @update:modelValue="fetchActivities" :items="range" item-title="name"
                item-value="name" label="Select range">
            </v-select>
            <v-select v-model="categorySelected" @update:modelValue="fetchActivitie" :items="category" item-title="name"
                item-value="id" label="Select category">
            </v-select>
        </v-form>
        <BarChart :chartData="chartData" :chartOptions="chartOptions" />
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<style scoped>
.bg-color {
    background-image: linear-gradient(to bottom, #2155b6, #020818);
}
</style>
<!-- eslint-disable prettier/prettier -->
<script>
import axios from 'axios';
import store from "@/store";
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

// Define el plugin personalizado
const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
        gradient.addColorStop(0, '#2155b6'); // Color de inicio del degradado
        gradient.addColorStop(1, '#020818'); // Color de fin del degradado
        ctx.fillStyle = gradient; // Asignamos el degradado como color de fondo
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    }
};

Chart.register(...registerables);
Chart.defaults.color = "white";
export default {
    name: 'RankingWeekly',
    components: { BarChart },


    data: () => ({
        activities: [],
        durations: [],
        labelsDate: [],
        range: ['Daily', 'Weekly'],
        category:['Duration','Reps'],
        rangeSelected: [],
        categorySelected:[],
        suma: null,
        promDuration: null,
        totalDuration: null,
        user: store.getters.getUser.id, // Obtener el usuario desde el store
        chartData: {
            labels: [],
            datasets: [{
                label: null,
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                color: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',],
                borderWidth: 2
            }]
        },
        chartOptions: {

            plugins: {
                customCanvasBackgroundColor: {
                    color: '#99ffff',
                },

            },
        }
    }),
    mounted() {
        this.fetchActivities('Daily');

        Chart.register(plugin); // Registrar el plugin personalizado
    },
    methods: {
        async fetchActivities(range) {
            try {
                if (range !== 'Weekly') {
                    this.chartData.datasets[0].data = [];
                    const response = await axios.get(`http://localhost:3000/activities/user/${this.user}`);
                    this.activities = response.data;
                    this.lastestDurationByDay();
                } else {
                    
                    const response = await axios.get(`http://localhost:3000/activities/user/${this.user}/weekly`);
                    this.activities = response.data;
                    this.lastestDurationByWeek()            
                }

            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        },
        async lastestDurationByDay() {
            this.findSameDay = this.activities.map(activity => new Date(activity.start_date).toISOString().split('T')[0]);
            this.labelsDate = this.findSameDay.filter((date, index) => this.findSameDay.indexOf(date) === index);
            this.chartData.labels = this.labelsDate;

            this.chartData.datasets[0].label = 'Daily progress by duration (minutes)';

            for (let i = 0; i < this.labelsDate.length; i++) {
                const activitiesByDay = this.activities.filter(activity => new Date(activity.start_date).toISOString().split('T')[0] === this.labelsDate[i]);
                const totalDuration = activitiesByDay.reduce((sum, activity) => sum + activity.duration, 0);
                this.chartData.datasets[0].data[i] = totalDuration;
                this.suma += totalDuration;
            }

            const promDuration = this.suma / ((this.labelsDate.length))

            return promDuration;
        },
        async lastestDurationByWeek(){
            
            this.addWeeks = this.activities.map(activity => activity.week_number);
            this.chartData.labels = this.addWeeks;

            this.addTotalDuration = this.activities.map(activity => activity.total_duration);
            this.chartData.datasets[0].data = this.addTotalDuration;

            this.chartData.datasets[0].label = 'Weekly progress by duration (minutes)';
        },
       
    }
};
</script>
