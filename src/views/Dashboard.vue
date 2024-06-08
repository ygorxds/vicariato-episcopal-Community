<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="content-area">
      <UserHeader />
      <DateFilter />
      <div v-if="chartsLoaded" class="charts-container">
        <div class="chart">
          <PieChart />
        </div>
        <div class="chart">
          <BarChart />
        </div>
        <div class="chart">
          <SchoolDistribuetion />
        </div>
        <div class="chart">
          <AgeDistributionChart />
        </div>
        <div class="chart">
          <CityDistributionChart />
        </div>
        <div class="chart">
          <EducationParticipationChart />
        </div>
        <div class="chart">
          <MaritalStatusChart />
        </div>
        <div class="chart">
          <PastoralParticipationChart />
        </div>
        <div class="chart">
          <RegistrationOverTimeChart />
        </div>
        <div class="chart">
          <StateDistributionChart />
        </div>
      </div>
      <div v-else>
        Carregando Gráficos...
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
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

export default defineComponent({
  name: 'UserDashboard',
  components: {
    SidebarMenu,
    UserHeader,
    BarChart,
    DateFilter,
    PieChart,
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

    // Função para simular o carregamento de dados dos gráficos
    const loadCharts = async () => {
      try {
        // Simulando a busca de dados com um delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        chartsLoaded.value = true;
      } catch (error) {
        console.error("Failed to load charts:", error);
        chartsLoaded.value = false;
      }
    };

    // Função chamada quando a página é redimensionada
    const onResize = async () => {
      console.log("Redimensionando a página, recarregando os gráficos...");
      chartsLoaded.value = false; // primeiro, definir como não carregado
      await loadCharts(); // então recarregar os gráficos
    };

    onMounted(() => {
      loadCharts();
      window.addEventListener('resize', onResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', onResize);
    });

    return {
      chartsLoaded
    };
  }
});
</script>

<style>
.dashboard-container {
  display: flex;
  width: 100%;
  min-height: 100vh;
  height: auto;
}

.sidebar {
  min-width: 100px;
  width: 300px; /* Ajuste a largura conforme necessário */
  background-color: #f4f4f4; /* Cor de fundo da barra lateral */
}

.content-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: rgb(239, 239, 239);
}

.charts-container {
  display: flex;
  flex-wrap: wrap; /* Permite que os gráficos quebrem linha */
  justify-content: space-between;
  padding: 15px;
}

.chart {
  flex: 0 1 calc(50% - 50px); /* Cada gráfico ocupará 50% da largura menos os gaps */
  margin-bottom: 20px; /* Espaçamento entre as linhas */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff; /* Fundo branco para cada gráfico */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bar-chart, .pie-chart {
  width: 100%; /* Assegura que cada gráfico ocupe toda a largura do seu contêiner */
}
</style>
