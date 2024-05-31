<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="content-area">
      <UserHeader />
      <DateFilter/>
      <div v-if="chartsLoaded" class="charts-container">
        <div class="chart pie-chart">
          <PieChart />
          
        </div>
        <div class="chart bar-chart">
          <BarChart />
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

export default defineComponent({
  name: 'UserDashboard',
  components: {
    SidebarMenu,
    UserHeader,
    BarChart,
    DateFilter,
    PieChart
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
  height: 100vh;
}

.sidebar {
  width: 200px; /* Ajuste a largura conforme necessário */
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
  flex-grow: 1;
  padding: 15px;
  gap: 10px; /* Adiciona um espaço entre os gráficos */
}

.chart {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff; /* Fundo branco para cada gráfico */
  border-radius: 10px;
  padding: 20px;
}

.bar-chart, .pie-chart {
  width: 100%; /* Assegura que cada gráfico ocupe toda a largura do seu contêiner */
}
</style>
