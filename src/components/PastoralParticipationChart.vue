<template>
  <div ref="canvasWrapper">
    <h1 style="color: #777777;">Participação em Outros Movimentos Pastorais</h1>
    <canvas v-if="hasData" ref="pastoralParticipationChartCanvas"></canvas>
    <h3 v-else>Não há dados para exibir</h3>
  </div>
</template>

<script>
import Chart from 'chart.js';
import axios from 'axios';

export default {
  name: 'PastoralParticipationChart',
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      pastoralParticipationChart: null,
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
        const response = await axios.post('http://localhost:5000/api/dados/mescsParticipamDeOutrasPastorais', filters);
        const data = response.data;
        if (data && data.length) {
          this.hasData = true;
          this.$nextTick(() => {
            this.createPastoralParticipationChart(data);
          });
        } else {
          this.hasData = false;
          if (this.pastoralParticipationChart) {
            this.pastoralParticipationChart.destroy();
            this.pastoralParticipationChart = null;
          }
          console.error('Nenhum dado para exibir.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        this.hasData = false;
      }
    },
    createPastoralParticipationChart(data) {
      this.$nextTick(() => {
        const ctx = this.$refs.pastoralParticipationChartCanvas.getContext('2d');
        if (!ctx) {
          console.error('Contexto do Canvas não está disponível');
          return;
        }
        if (this.pastoralParticipationChart) {
          this.pastoralParticipationChart.destroy();
        }

        this.pastoralParticipationChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: data.map(item => item.ParticipationStatus),
            datasets: [{
              backgroundColor: ["#42A5F5", "#FFA726"],
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

