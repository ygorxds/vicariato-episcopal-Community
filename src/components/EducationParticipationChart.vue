<template>
    <div ref="canvasWrapper">
      <h1 style="color: #777777;">Relação entre Escolaridade e Participação em Movimentos</h1>
      <canvas ref="educationParticipationChartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js';
  
  export default {
    name: 'EducationParticipationChart',
    mounted() {
      this.createEducationParticipationChart();
    },
    methods: {
      createEducationParticipationChart() {
        const ctx = this.$refs.educationParticipationChartCanvas.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["Sem escolaridade", "Ensino Fundamental", "Ensino Médio", "Ensino Superior", "Pós-graduação"],
            datasets: [
              {
                label: "Participa",
                backgroundColor: "#42A5F5",
                data: [5, 15, 20, 25, 10] // Substitua pelos seus dados
              },
              {
                label: "Não Participa",
                backgroundColor: "#FFA726",
                data: [10, 10, 15, 20, 5] // Substitua pelos seus dados
              }
            ]
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
  