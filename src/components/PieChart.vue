<template>
  <div ref="canvasWrapper">
    <h1 style="color: #777777;">Distribuição por Gênero</h1>
    <canvas ref="pieChartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'PieChart',
  mounted() {
    const ctx = this.$refs.pieChartCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ["Masculino", "Feminino", "Outro"],
        datasets: [{
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          data: [120, 90, 30] // Dados fictícios
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
</script>
