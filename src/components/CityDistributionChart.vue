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
          labels: ["Participa"], // Exemplo de categorias
          datasets: [
            {
              label: "Rio de Janeiro",
              backgroundColor: "#42A5F5",
              data: [15, 5] // Substitua pelos seus dados
            },
            {
              label: "Nova Iguaçu",
              backgroundColor: "#66BB6A",
              data: [25, 10] // Substitua pelos seus dados
            },
            {
              label: "Caxias",
              backgroundColor: "#FFA726",
              data: [10, 20] // Substitua pelos seus dados
            },
            {
              label: "Mesquita",
              backgroundColor: "#26A69A",
              data: [30, 15] // Substitua pelos seus dados
            },
            {
              label: "Nilópolis",
              backgroundColor: "#AB47BC",
              data: [20, 25] // Substitua pelos seus dados
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true
            }
          }
        }
      });
    }
  }
}
</script>
