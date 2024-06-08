<template>
    <div ref="canvasWrapper">
      <h1 style="color: #777777;">Distribuição por Estado Civil</h1>
      <canvas ref="maritalStatusChartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js';
  
  export default {
    name: 'MaritalStatusChart',
    mounted() {
      this.createMaritalStatusChart();
    },
    methods: {
      createMaritalStatusChart() {
        const ctx = this.$refs.maritalStatusChartCanvas.getContext('2d');
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ["Solteiro", "Casado", "Divorciado", "Viúvo", "Outro"],
            datasets: [{
              backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#26A69A", "#AB47BC"],
              data: [30, 45, 10, 8, 7] // Substitua pelos seus dados
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
  