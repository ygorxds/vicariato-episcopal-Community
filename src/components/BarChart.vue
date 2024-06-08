<!-- Gráfico de rosca de Quantidade de Mescs por idade e gênero 
Desenvolvido por: Ygor Pereira
05/06/2024 
-->

<template>
  <div ref="canvasWrapper">
    <h1 style="color: #777777;"> Quantidade de Mescs por idade e gênero</h1>
    <canvas ref="barChartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'BarChart',
  mounted() {
    this.createBarChart();
  },
  methods: {
    createBarChart() {
      const ctx = this.$refs.barChartCanvas.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["0-12", "13-19", "20-29", "30-49", "50+"],
          datasets: [
            {
              label: 'Masculino',
              backgroundColor: '#42A5F5',
              data: [50, 25, 12, 48, 90]
            },
            {
              label: 'Feminino',
              backgroundColor: '#FFA726',
              data: [30, 70, 45, 60, 39]
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
