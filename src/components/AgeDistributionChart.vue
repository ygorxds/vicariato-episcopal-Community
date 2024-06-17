<template>
  <div ref="canvasWrapper">
    <h1 style="color: #777777;">Distribuição por Idade</h1>
    <canvas ref="ageDistributionChartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';
import axios from 'axios';

export default {
  name: 'AgeDistributionChart',
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  watch: {
    filters: {
      deep: true,  // Ativa a observação profunda
      immediate: true,
      handler(newFilters) {
        this.fetchDataAndCreateChart(newFilters);
      }
    }
  },
  data() {
    return {
      ageChart: null, // Guarda a instância do gráfico para poder destruí-lo/recriá-lo
    };
  },
  mounted() {
    this.fetchDataAndCreateChart(this.filters);  // Certifica-se de carregar dados inicialmente
  },
  methods: {
    async fetchDataAndCreateChart(filters) {
      try {
        const response = await axios.post('http://localhost:5000/api/dados/idade', filters);
        const data = response.data;
        if (data && data.length) {
          this.createAgeDistributionChart(data);
        } else {
          console.error('Nenhum dado para exibir.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    },
    createAgeDistributionChart(data) {
      const colors = ["#42A5F5", "#66BB6A", "#FFA726"];  // Cores para cada faixa de idade
      const datasets = data.map((item, index) => ({
        label: item.AgeGroup,
        backgroundColor: colors[index],
        data: [item.Count]  // Dados como um array com um único valor para cada barra
      }));
      const ctx = this.$refs.ageDistributionChartCanvas.getContext('2d');

      // Destruir o gráfico existente se ele já existe
      if (this.ageChart) {
        this.ageChart.destroy();
      }

      // Criar um novo gráfico
      this.ageChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Distribuição por Idade'],
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: 'top'
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              barPercentage: 0.4
            }]
          }
        }
      });
    }
  }
}
</script>

<style scoped>
/* Seus estilos específicos aqui */
</style>
