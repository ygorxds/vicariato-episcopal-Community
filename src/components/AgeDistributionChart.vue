<template>
  <div ref="canvasWrapper">
    <h1 style="color: #777777;">Distribuição por Idade</h1>
    <!-- Condicional para renderizar o canvas apenas se hasData for verdadeiro -->
    <canvas v-if="hasData" ref="ageDistributionChartCanvas"></canvas>
    <h3 v-else>Não há dados para exibir</h3>
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
      deep: true,
      immediate: true,
      handler(newFilters) {
        this.fetchDataAndCreateChart(newFilters);
      }
    }
  },
  data() {
    return {
      ageChart: null,  // Referência ao gráfico para gestão de estado
      hasData: false   // Flag para controlar a exibição do gráfico ou da mensagem
    };
  },
  mounted() {
    // Chama a função de busca de dados ao montar o componente
    this.fetchDataAndCreateChart(this.filters);
  },
  methods: {
    async fetchDataAndCreateChart(filters) {
      const safeFilters = JSON.parse(JSON.stringify(filters)); // Clona os filtros para evitar problemas com reatividade
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/dados/idade`, safeFilters);
        const data = response.data;
        if (data && data.length) {
          this.hasData = true;
          this.$nextTick(() => {
            this.createAgeDistributionChart(data);
          });
        } else {
          this.hasData = false;
          if (this.ageChart) {
            this.ageChart.destroy();
            this.ageChart = null;
          }
          console.error('Nenhum dado para exibir.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        this.hasData = false;
      }
    },
    createAgeDistributionChart(data) {
      this.$nextTick(() => {
        const canvas = this.$refs.ageDistributionChartCanvas;
        if (!canvas) {
          console.error('Canvas não está disponível');
          return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('Contexto do Canvas não está disponível');
          return;
        }
        if (this.ageChart) {
          this.ageChart.destroy();
        }
        this.ageChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Distribuição por Idade'],
            datasets: data.map((item, index) => ({
              label: item.AgeGroup,
              backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"][index % 3],
              data: [item.Count],
              barPercentage: 0.4
            }))
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
              }]
            }
          }
        });
      });
    }
  }
}
</script>

<style scoped>
/* Estilos específicos para o componente */
</style>
