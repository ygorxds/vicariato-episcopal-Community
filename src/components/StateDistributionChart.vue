<template>
    <div ref="canvasWrapper">
      <h1 style="color: #777777;">Distribuição por Estado (UF)</h1>
      <canvas ref="stateDistributionChartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js';
  
  export default {
    name: 'StateDistributionChart',
    mounted() {
      this.createStateDistributionChart();
    },
    methods: {
      createStateDistributionChart() {
        const ctx = this.$refs.stateDistributionChartCanvas.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["Estado 1", "Estado 2", "Estado 3", "Estado 4", "Estado 5"],
            datasets: [{
              backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#26A69A", "#AB47BC"],
              data: [20, 30, 10, 25, 15] // Substitua pelos seus dados
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
  