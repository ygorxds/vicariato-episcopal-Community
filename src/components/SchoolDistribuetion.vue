<template>
    <div ref="canvasWrapper">
      <h1 style="color: #777777;">Distribuição por Escolaridade</h1>
      <canvas ref="educationChartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js';
  
  export default {
    name: 'SchoolDistribuetion',
    mounted() {
      this.createEducationChart();
    },
    methods: {
      createEducationChart() {
        const ctx = this.$refs.educationChartCanvas.getContext('2d');
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ["Sem escolaridade", "Ensino Fundamental", "Ensino Médio", "Ensino Superior", "Pós-graduação"],
            datasets: [{
              backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#26A69A", "#AB47BC"],
              data: [10, 25, 30, 20, 15] // Substitua pelos seus dados
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
  