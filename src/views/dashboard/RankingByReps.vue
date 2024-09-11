<!-- eslint-disable prettier/prettier -->
<template>
    <NavBar />
    <div class="rounded mt-10 mx-7" style="display: flex; justify-content: center">
        <RankingWeeklyReps />
        <RankingByMachineReps />
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import axios from 'axios';
import store from "@/store"
import { Chart, registerables } from "chart.js";

import RankingWeeklyReps from '@/components/RankingWeeklyReps.vue';
import RankingByMachineReps from '@/components/rankingByMachineReps.vue';
import NavBar from '@/components/NavBar.vue';

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
    name: 'RankingUser',
    components: { RankingWeeklyReps, RankingByMachineReps,NavBar},


    data: () => ({
        activities: [],
        durations: [],
        labelsDate: [],
        user: store.getters.getUser.id, // Obtener el usuario desde el store
        chartData: {
            labels: [],
            datasets: [{
                label: 'Daily progress by duration',
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
        this.fetchActivities();

        Chart.register(plugin); // Registrar el plugin personalizado
    },
    methods: {
        async fetchActivities() {
            try {
                const response = await axios.get(`http://localhost:3000/activities/user/${this.user}`);
                this.activities = response.data;
                this.lastestDurationByDay();
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        },
        async lastestDurationByDay() {
            this.findSameDay = this.activities.map(activity => new Date(activity.start_date).toISOString().split('T')[0]);
            this.labelsDate = this.findSameDay.filter((date, index) => this.findSameDay.indexOf(date) === index);
            this.chartData.labels = this.labelsDate;

            for (let i = 0; i < this.labelsDate.length; i++) {
                const activitiesByDay = this.activities.filter(activity => new Date(activity.start_date).toISOString().split('T')[0] === this.labelsDate[i]);
                const totalDuration = activitiesByDay.reduce((sum, activity) => sum + activity.duration, 0);
                this.chartData.datasets[0].data[i] = totalDuration;
            }


        }
    }
};
</script>
