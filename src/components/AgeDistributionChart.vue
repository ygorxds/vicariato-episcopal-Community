<template>
    <div ref="canvasWrapper">
      <h1 style="color: #777777;">Distribuição por Idade</h1>
      <canvas ref="ageDistributionChartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js';
  
  export default {
    name: 'AgeDistributionChart',
    mounted() {
      this.createAgeDistributionChart();
    },
    methods: {
      createAgeDistributionChart() {
        const ctx = this.$refs.ageDistributionChartCanvas.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["0-12", "13-19", "20-29", "30-49", "50+"],
            datasets: [{
              backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#26A69A", "#AB47BC"],
              data: [5, 15, 25, 35, 20] // Substitua pelos seus dados
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
    }
  }
  </script>
  