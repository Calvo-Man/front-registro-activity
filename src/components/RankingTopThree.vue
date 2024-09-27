<!-- eslint-disable prettier/prettier -->
<template>
    <div class="rounded mt-5 mx-7 bg-color" style="justify-content: center">
        <v-form fast-fail submit.prevent>
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
    name: 'RankingTopThree',
    components: { BarChart },


    data: () => ({
        activities: [],
        labelsDate: [],
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
        this.fetchActivities();

        Chart.register(plugin); // Registrar el plugin personalizado
    },
    methods: {
        async fetchActivities() {
            const response = await axios.get(`http://localhost:3000/activities/ranking/lifted-weight`);
            this.activities = response.data;
            this.asignData();
        },
        async asignData(){
            this.addNames = this.activities.map(activity => activity.userName);
            this.chartData.labels = this.addNames;

            this.addTotalWeight = this.activities.map(activity => activity.totalWeight);
            this.chartData.datasets[0].data = this.addTotalWeight;
            this.chartData.datasets[0].label = 'Top 3 total Lifted Weight';
        }

       

    }
};
</script>
