<template>
  <div ref="canvasWrapper">
    <h1 style="color: #777777;">Quantidade de Mescs por idade e gênero</h1>
    <!-- Usar v-if para mostrar o canvas quando hasData é verdadeiro -->
    <canvas v-if="hasData" ref="barChartCanvas"></canvas>
    <!-- Usar v-else diretamente após um elemento com v-if para mostrar a mensagem quando não há dados -->
    <h3 v-else>Não há dados para exibir</h3>
  </div>
</template>

<script>
import Chart from 'chart.js';
import axios from 'axios';

export default {
  name: 'BarChart',
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      barChart: null,  // Referência ao gráfico para gestão de estado
      hasData: false   // Flag para controlar a exibição do gráfico ou da mensagem
    };
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
  mounted() {
    this.fetchDataAndCreateChart(this.filters);
  },
  methods: {
    async fetchDataAndCreateChart(filters) {
      if (!filters || Object.keys(filters).length === 0) {
        console.error('Filtros não definidos ou vazios');
        this.hasData = false;
        return;
      }

      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/dados/generoPorIdade`, filters);
        const data = response.data;
        if (data && data.length) {
          this.hasData = true;
          this.$nextTick(() => {
            this.createBarChart(data);
          });
        } else {
          this.hasData = false;
          if (this.barChart) {
            this.barChart.destroy();
            this.barChart = null;
          }
          console.error('Nenhum dado para exibir.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        this.hasData = false;
      }
    },
    createBarChart(data) {
      this.$nextTick(() => {
        const ctx = this.$refs.barChartCanvas.getContext('2d');
        if (!ctx) {
          console.error('Contexto do Canvas não está disponível');
          return;
        }
        if (this.barChart) {
          this.barChart.destroy();
        }

        const ageGroups = [...new Set(data.map(item => item.AgeGroup))].sort();
        const genders = [...new Set(data.map(item => item.Gender))];
        const backgroundColors = {
          'Masculino': '#42A5F5',
          'Feminino': '#FFA726',
          'Não Catalogado': '#BDBDBD'
        };

        const datasets = genders.map(gender => ({
          label: gender,
          backgroundColor: backgroundColors[gender] || '#9E9E9E',
          data: ageGroups.map(ageGroup => {
            const item = data.find(d => d.AgeGroup === ageGroup && d.Gender === gender);
            return item ? item.Total : 0;
          })
        }));

        this.barChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ageGroups,
            datasets: datasets
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
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