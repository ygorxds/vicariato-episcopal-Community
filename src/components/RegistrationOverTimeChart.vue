<template>
    <div ref="canvasWrapper">
      <h1 style="color: #777777;">Cadastro ao Longo do Tempo</h1>
      <canvas ref="registrationOverTimeChartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js';
  
  export default {
    name: 'RegistrationOverTimeChart',
    mounted() {
      this.createRegistrationOverTimeChart();
    },
    methods: {
      createRegistrationOverTimeChart() {
        const ctx = this.$refs.registrationOverTimeChartCanvas.getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
            datasets: [{
              label: "Total",
              borderColor: "#42A5F5",
              data: [10, 20, 30, 25, 35] // Substitua pelos seus dados
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
  