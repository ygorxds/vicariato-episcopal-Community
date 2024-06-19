<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="content-area">
      <UserHeader />
      <DateFilter @filtersUpdated="updateFilters" />
      <div class="charts-container">
        <div class="chart" v-if="chartsLoaded">
          <PieChart :filters="filters" />
        </div>
        <div class="chart" v-if="chartsLoaded">
          <BarChart :filters="filters" />
        </div>
        <div class="chart" v-if="chartsLoaded">
          <AgeDistributionChart :filters="filters" />
        </div>
        <div class="chart" v-if="chartsLoaded">
          <SchoolDistribution :filters="filters" />
        </div>
        <div class="chart" v-if="chartsLoaded">
          <EducationParticipationChart :filters="filters" />
        </div>
        <div class="chart" v-if="chartsLoaded">
          <MaritalStatusChart :filters="filters" />
        </div>
        <div class="chart" v-if="chartsLoaded">
          <PastoralParticipationChart :filters="filters" />
        </div>
        <div v-else>
          Carregando Gráficos...
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import SidebarMenu from '../components/SidebarMenu.vue';
import UserHeader from '../components/Header.vue';
import PieChart from '../components/PieChart.vue';
import BarChart from '../components/BarChart.vue';
import DateFilter from '../components/DateFilter.vue';
import SchoolDistribution from '@/components/SchoolDistribuetion.vue';
import AgeDistributionChart from '@/components/AgeDistributionChart.vue';
import EducationParticipationChart from '@/components/EducationParticipationChart.vue';
import MaritalStatusChart from '@/components/MaritalStatusChart.vue';
import PastoralParticipationChart from '@/components/PastoralParticipationChart.vue';

interface Filters {
  startDate: string;
  endDate: string;
  paroquia: string;
  capela: string;
}

export default defineComponent({
  name: 'DashboardView',
  components: {
    SidebarMenu,
    UserHeader,
    PieChart,
    BarChart,
    DateFilter,
    SchoolDistribution,
    AgeDistributionChart,
    EducationParticipationChart,
    MaritalStatusChart,
    PastoralParticipationChart,
  },
  setup() {
    const chartsLoaded = ref(false);
    const filters = reactive<Filters>({ startDate: '', endDate: '', paroquia: '', capela: '' });
    const router = useRouter();

    const loadCharts = async () => {
      chartsLoaded.value = false;
      // Simulate fetching data
      await new Promise(resolve => setTimeout(resolve, 2000));
      chartsLoaded.value = true;
    };

    const updateFilters = (newFilters: Filters) => {
      Object.assign(filters, newFilters);
      loadCharts();
    };

    onMounted(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
      axios.defaults.headers.common['x-access-token'] = token;
      loadCharts();
    });

    return {
      chartsLoaded,
      filters,
      updateFilters,
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
