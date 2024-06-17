<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="content-area">
      <UserHeader />
      <DateFilter @filtersUpdated="updateFilters" />
      <div class="selector-container">
        <label for="chartType"><b>Selecione o tipo de análise:</b></label>
        <select class="selectChoose" v-model="selectedChart" @change="loadChart">
          <option value="">Nenhum</option>
          <option value="gender">Gênero</option>
          <option value="ageGenderMesc">Qtd. de Mesc X Idade X Gênero</option>
          <option value="education">Escolaridade</option>
          <option value="age">Idade</option>
          <option value="city">Município do RJ</option>
          <option value="educationParticipation">Escolaridade e Participação</option>
          <option value="maritalStatus">Estado Civil</option>
          <option value="pastoralParticipation">Participação em Movimentos Pastorais</option>
          <option value="registrationOverTime">Cadastro ao Longo do Tempo</option>
          <option value="state">Estado (UF)</option>
        </select>
      </div>
      <div class="chart-display-area">
        <div v-if="selectedChart">
          <div v-if="chartsLoaded" class="charts-container">
            <PieChart v-if="selectedChart === 'gender'" :filters="filters" />
            <BarChart v-if="selectedChart === 'ageGenderMesc'" :filters="filters" />
            <SchoolDistribuetion v-if="selectedChart === 'education'" :filters="filters" />
            <AgeDistributionChart v-if="selectedChart === 'age'" :filters="filters" />
            <CityDistributionChart v-if="selectedChart === 'city'" :filters="filters" />
            <EducationParticipationChart v-if="selectedChart === 'educationParticipation'" :filters="filters" />
            <MaritalStatusChart v-if="selectedChart === 'maritalStatus'" :filters="filters" />
            <PastoralParticipationChart v-if="selectedChart === 'pastoralParticipation'" :filters="filters" />
            <RegistrationOverTimeChart v-if="selectedChart === 'registrationOverTime'" :filters="filters" />
            <StateDistributionChart v-if="selectedChart === 'state'" :filters="filters" />
          </div>
          <div v-else>
            Carregando...
          </div>
        </div>
        <div v-else>
          Nenhum gráfico selecionado
        </div>
      </div>
      <button class="download-report" @click="downloadReport">Baixar Relatório</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import SidebarMenu from '../components/SidebarMenu.vue';
import UserHeader from '../components/Header.vue';
import PieChart from '../components/PieChart.vue';
import BarChart from '../components/BarChart.vue';
import DateFilter from '../components/DateFilter.vue';
import SchoolDistribuetion from '../components/SchoolDistribuetion.vue';
import AgeDistributionChart from '@/components/AgeDistributionChart.vue';
import CityDistributionChart from '@/components/CityDistributionChart.vue';
import EducationParticipationChart from '@/components/EducationParticipationChart.vue';
import MaritalStatusChart from '@/components/MaritalStatusChart.vue';
import PastoralParticipationChart from '@/components/PastoralParticipationChart.vue';
import RegistrationOverTimeChart from '@/components/RegistrationOverTimeChart.vue';
import StateDistributionChart from '@/components/StateDistributionChart.vue';
import { jsPDF } from 'jspdf';

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
    SchoolDistribuetion,
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
    const filters = ref<Filters>({ startDate: '', endDate: '', paroquia: '', capela: '' });

    const loadChart = async () => {
      try {
        // Simulate loading of chart data
        await new Promise(resolve => setTimeout(resolve, 1000));
        chartsLoaded.value = true;
      } catch (error) {
        console.error("Failed to load chart:", error);
        chartsLoaded.value = false;
      }
    };

    const updateFilters = (newFilters: Filters) => {
      filters.value = newFilters;
      loadChart();
    };

    const downloadReport = () => {
      const pdf = new jsPDF();
      pdf.text("Relatório de Análise", 10, 10);
      pdf.text("Aqui você pode colocar mais textos e dados", 10, 20);
      pdf.save('Relatório.pdf');
    };

    onMounted(() => {
      loadChart();
    });

    return {
      chartsLoaded,
      selectedChart,
      filters,
      updateFilters,
      loadChart,
      downloadReport
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
