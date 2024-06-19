<template>
  <div ref="canvasWrapper">
    <h1 style="color: #777777;">Distribuição por Estado Civil</h1>
    <canvas v-if="hasData" ref="maritalStatusChartCanvas"></canvas>
    <h3 v-else>Não há dados para exibir</h3>
  </div>
</template>

<script>
import Chart from 'chart.js';
import axios from 'axios';

export default {
  name: 'MaritalStatusChart',
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      maritalStatusChart: null,
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
        const response = await axios.post('http://localhost:5000/api/dados/estadoCivil', filters);
        const data = response.data;
        if (data && data.length) {
          this.hasData = true;
          this.$nextTick(() => {
            this.createMaritalStatusChart(data);
          });
        } else {
          this.hasData = false;
          if (this.maritalStatusChart) {
            this.maritalStatusChart.destroy();
            this.maritalStatusChart = null;
          }
          console.error('Nenhum dado para exibir.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        this.hasData = false;
      }
    },
    createMaritalStatusChart(data) {
      this.$nextTick(() => {
        const ctx = this.$refs.maritalStatusChartCanvas.getContext('2d');
        if (!ctx) {
          console.error('Contexto do Canvas não está disponível');
          return;
        }
        if (this.maritalStatusChart) {
          this.maritalStatusChart.destroy();
        }

        this.maritalStatusChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: data.map(item => item.MaritalStatus),
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


