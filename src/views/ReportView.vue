<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="content-area">
      <UserHeader />
      <DateFilter @filtersUpdated="updateFilters" />
      <div class="selector-container">
        <label for="chartType"><b>Selecione o tipo de análise:</b></label>
        <select id="chartType" class="selectChoose" v-model="selectedChart">
          <option value="">Nenhum</option>
          <option value="PieChart">Gênero</option>
          <option value="BarChart">Qtd. de Mesc X Idade X Gênero</option>
          <option value="SchoolDistribution">Escolaridade</option>
          <option value="AgeDistributionChart">Idade</option>
          <option value="EducationParticipationChart">Escolaridade e Participação</option>
          <option value="MaritalStatusChart">Estado Civil</option>
          <option value="PastoralParticipationChart">Participação em Movimentos Pastorais</option>
        </select>
      </div>
      <div class="chart-display-area">
        <component :is="chartComponents[selectedChart]" :filters="filters" v-if="selectedChart && chartsLoaded"></component>
        <div v-if="!chartsLoaded">
          Carregando...
        </div>
        <div v-else-if="!selectedChart">
          Nenhum gráfico selecionado
        </div>
      </div>
      <button class="download-report" @click="downloadReport">Baixar Relatório</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import SidebarMenu from '../components/SidebarMenu.vue';
import UserHeader from '../components/Header.vue';
import PieChart from '../components/PieChart.vue';
import BarChart from '../components/BarChart.vue';
import DateFilter from '../components/DateFilter.vue';
import SchoolDistribution from '../components/SchoolDistribuetion.vue';
import AgeDistributionChart from '@/components/AgeDistributionChart.vue';
import CityDistributionChart from '@/components/CityDistributionChart.vue';
import EducationParticipationChart from '@/components/EducationParticipationChart.vue';
import MaritalStatusChart from '@/components/MaritalStatusChart.vue';
import PastoralParticipationChart from '@/components/PastoralParticipationChart.vue';
import RegistrationOverTimeChart from '@/components/RegistrationOverTimeChart.vue';
import StateDistributionChart from '@/components/StateDistributionChart.vue';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface Filters {
  startDate: string;
  endDate: string;
  paroquia: string;
  capela: string;
}

export default defineComponent({
  name: 'ReportView',
  components: {
    SidebarMenu,
    UserHeader,
    PieChart,
    BarChart,
    DateFilter,
    SchoolDistribution,
    AgeDistributionChart,
    CityDistributionChart,
    EducationParticipationChart,
    MaritalStatusChart,
    PastoralParticipationChart,
    RegistrationOverTimeChart,
    StateDistributionChart
  },
  setup() {
    const chartsLoaded = ref(false);
    const selectedChart = ref('');
    const filters = reactive<Filters>({ startDate: '', endDate: '', paroquia: '', capela: '' });
    const chartComponents = {
      PieChart,
      BarChart,
      SchoolDistribution,
      AgeDistributionChart,
      CityDistributionChart,
      EducationParticipationChart,
      MaritalStatusChart,
      PastoralParticipationChart,
      RegistrationOverTimeChart,
      StateDistributionChart
    };

    const loadChart = async () => {
      chartsLoaded.value = false;
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate chart data loading
      chartsLoaded.value = true;
    };

    const updateFilters = (newFilters: Filters) => {
      Object.assign(filters, newFilters);
      loadChart();
    };

    const downloadReport = async () => {
      const dashboardElement = document.querySelector('.content-area') as HTMLElement;

      if (dashboardElement) {
        const canvas = await html2canvas(dashboardElement, {
          scale: 2, // Aumenta a resolução do canvas
          useCORS: true // Resolve problemas de CORS, caso haja imagens externas
        });

        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });

        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('Relatório.pdf');
      }
    };

    onMounted(loadChart);

    return {
      chartsLoaded,
      selectedChart,
      filters,
      updateFilters,
      loadChart,
      downloadReport,
      chartComponents,
    };
  }
});
</script>

<style scoped>
.dashboard-container {
  display: flex;
  width: auto;
  height: auto;
}

.content-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Garante que o mínimo seja a altura da tela, mas pode expandir */
}

.selector-container {
  margin-top: 20px;
  text-align: center;
  color: #777777;
}

.chart-display-area {
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0; /* Ajuste conforme necessário para não afetar outros componentes */
}

.charts-container {
  display: flex;
  flex-wrap: wrap; /* Permite que os gráficos quebrem linha */
  justify-content: space-between;
  width: 80%; /* Ajuste baseado na largura disponível */
  max-width: 1000px; /* Largura máxima do contêiner */
  height: auto; /* Auto para acomodar o tamanho do gráfico */
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
}

.chart {
  flex: 0 1 calc(50% - 10px); /* Cada gráfico ocupará 50% da largura menos os gaps */
  margin-bottom: 20px; /* Espaçamento entre as linhas */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff; /* Fundo branco para cada gráfico */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.download-report {
  cursor: pointer;
  margin: 20px auto;
  display: block;
  padding: 10px 20px;
  background-color: #820000;
  color: white;
  border: none;
  border-radius: 5px;
}

.selectChoose {
  height: 50px;
  width: 400px;
  border-radius: 20px;
  color: #777777;
  background-color: #ffffff;
  padding: 10px;
  border-color: #777777;
  margin-left: 8px;
}
</style>
