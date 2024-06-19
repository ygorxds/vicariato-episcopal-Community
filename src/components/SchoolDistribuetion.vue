<template>
  <div ref="canvasWrapper">
    <h1 style="color: #777777;">Distribuição por Escolaridade</h1>
    <!-- Usar v-if diretamente para mostrar o canvas quando hasData é verdadeiro -->
    <canvas v-if="hasData" ref="educationChartCanvas"></canvas>
    <!-- Usar v-else diretamente após um elemento com v-if para mostrar a mensagem quando não há dados -->
    <h3 v-else>Não há dados para exibir</h3>
  </div>
</template>

<script>
import Chart from 'chart.js';
import axios from 'axios';

export default {
  name: 'SchoolDistribution',
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      educationChart: null,  // Referência ao gráfico para gestão de estado
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
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/dados/escolaridade`, filters);
        const data = response.data;
        if (data && data.length) {
          this.hasData = true;
          this.$nextTick(() => {
            this.createEducationChart(data);
          });
        } else {
          this.hasData = false;
          if (this.educationChart) {
            this.educationChart.destroy();
            this.educationChart = null;
          }
          console.error('Nenhum dado para exibir.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        this.hasData = false;
      }
    },
    createEducationChart(data) {
      this.$nextTick(() => {
        const ctx = this.$refs.educationChartCanvas.getContext('2d');
        if (!ctx) {
          console.error('Contexto do Canvas não está disponível');
          return;
        }
        if (this.educationChart) {
          this.educationChart.destroy();
        }
        this.educationChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: data.map(item => item.EducationLevel),
            datasets: [{
              backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#26A69A", "#AB47BC"],
              data: data.map(item => item.Total)
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
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
