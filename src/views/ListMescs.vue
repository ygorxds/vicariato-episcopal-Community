<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="content-area">
      <UserHeader />
      <DateFilter />
    
      <button class="download-report" @click="downloadReport">Baixar Relatório</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import SidebarMenu from '../components/SidebarMenu.vue';
import UserHeader from '../components/Header.vue';
import DateFilter from '../components/DateFilter.vue';

import { jsPDF } from 'jspdf';

export default defineComponent({
  name: 'List-Mescs',
  components: {
    SidebarMenu,
    UserHeader,
    DateFilter
  },
  setup() {
    const chartsLoaded = ref(false);
    const selectedChart = ref('');

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
