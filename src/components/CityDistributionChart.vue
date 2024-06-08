<template>
    <div ref="canvasWrapper">
      <h1 style="color: #777777;">Distribuição por Município do Estado do Rio de Janeiro</h1>
      <canvas ref="cityDistributionChartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js';
  
  export default {
    name: 'CityDistributionChart',
    mounted() {
      this.createCityDistributionChart();
    },
    methods: {
      createCityDistributionChart() {
        const ctx = this.$refs.cityDistributionChartCanvas.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["Rio de Janeiro", "Nova Iguaçu", "Caxias", "Mesquita", "Nilópolis"],
            datasets: [{
              backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#26A69A", "#AB47BC"],
              data: [15, 25, 10, 30, 20] // Substitua pelos seus dados
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
  