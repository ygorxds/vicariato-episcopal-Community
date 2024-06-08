<template>
    <div ref="canvasWrapper">
      <h1 style="color: #777777;">Participação em Outros Movimentos Pastorais</h1>
      <canvas ref="pastoralParticipationChartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js';
  
  export default {
    name: 'PastoralParticipationChart',
    mounted() {
      this.createPastoralParticipationChart();
    },
    methods: {
      createPastoralParticipationChart() {
        const ctx = this.$refs.pastoralParticipationChartCanvas.getContext('2d');
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ["Participa", "Não Participa"],
            datasets: [{
              backgroundColor: ["#42A5F5", "#FFA726"],
              data: [60, 40] // Substitua pelos seus dados
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
  