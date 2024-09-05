<!-- eslint-disable prettier/prettier -->
<template>
    <div style="display: flex; justify-content: center">
      <BarChart :chartData="data" />
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { defineComponent } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
    name: 'RankingUser',
    components: { BarChart },
    setup() {
        const data = {
            labels: ['Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ],
            datasets: [{
                label: 'Daily progress by duration (minutes)',
                data: [65, 59, 80, 81, 56, 55],
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
                borderWidth: 3
            }]
        };

        return { data };
    },
});
</script>