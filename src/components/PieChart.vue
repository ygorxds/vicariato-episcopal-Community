<template>
  <div ref="canvasWrapper">
    <h1 style="color: #777777;">Distribuição por Gênero</h1>
    <!-- Usar v-if para mostrar o canvas quando hasData é verdadeiro -->
    <canvas v-if="hasData" ref="pieChartCanvas"></canvas>
    <!-- Usar v-else diretamente após um elemento com v-if para mostrar a mensagem quando não há dados -->
    <h3 v-else>Não há dados para exibir</h3>
  </div>
</template>

<script>
import Chart from 'chart.js';
import axios from 'axios';

export default {
  name: 'PieChart',
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      pieChart: null,
      hasData: false
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
        const response = await axios.post('http://localhost:5000/api/dados/genero', filters);
        const data = response.data;
        if (data && data.length) {
          this.hasData = true;
          this.$nextTick(() => {
            this.createPieChart(data);
          });
        } else {
          this.hasData = false;
          if (this.pieChart) {
            this.pieChart.destroy();
            this.pieChart = null;
          }
          console.error('Nenhum dado para exibir.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        this.hasData = false;
      }
    },
    createPieChart(data) {
      this.$nextTick(() => {
        const ctx = this.$refs.pieChartCanvas.getContext('2d');
        if (!ctx) {
          console.error('Contexto do Canvas não está disponível');
          return;
        }
        if (this.pieChart) {
          this.pieChart.destroy();
        }

        this.pieChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: data.map(item => item.Gender),
            datasets: [{
              backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
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