<template>
  <div ref="canvasWrapper">
    <h1 style="color: #777777;">Relação entre Escolaridade e Participação em Movimentos</h1>
    <canvas v-if="hasData" ref="educationParticipationChartCanvas"></canvas>
    <h3 v-else>Não há dados para exibir</h3>
  </div>
</template>

<script>
import Chart from 'chart.js';
import axios from 'axios';

export default {
  name: 'EducationParticipationChart',
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      educationParticipationChart: null,
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
        const response = await axios.post('http://localhost:5000/api/dados/escolaridadePorMovimento', filters);
        const data = response.data;
        if (data && data.length) {
          this.hasData = true;
          this.$nextTick(() => {
            this.createEducationParticipationChart(data);
          });
        } else {
          this.hasData = false;
          if (this.educationParticipationChart) {
            this.educationParticipationChart.destroy();
            this.educationParticipationChart = null;
          }
          console.error('Nenhum dado para exibir.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        this.hasData = false;
      }
    },
    createEducationParticipationChart(data) {
      this.$nextTick(() => {
        const ctx = this.$refs.educationParticipationChartCanvas.getContext('2d');
        if (!ctx) {
          console.error('Contexto do Canvas não está disponível');
          return;
        }
        if (this.educationParticipationChart) {
          this.educationParticipationChart.destroy();
        }

        const educationLevels = [...new Set(data.map(item => item.EducationLevel))];
        const participationLabels = ["Participa", "Não Participa"];
        const backgroundColors = {
          'Participa': '#42A5F5',
          'Não Participa': '#FFA726'
        };

        const datasets = participationLabels.map(label => ({
          label: label,
          backgroundColor: backgroundColors[label],
          data: educationLevels.map(level => {
            const item = data.find(d => d.EducationLevel === level && d.MovementParticipation === label.toLowerCase());
            return item ? item.Total : 0;
          })
        }));

        this.educationParticipationChart = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: educationLevels,
            datasets: datasets
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

