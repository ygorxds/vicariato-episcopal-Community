<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="content-area">
      <UserHeader />
      <DateFilter/>
      <div class="selector-container">
        <label for="chartType"><b>Selecione o tipo de análise:</b></label>
        <select class="selectChoose" v-model="selectedChart" @change="loadChart">
          <option value="">Nenhum</option>
          <option value="ageGenderMesc">Qtd. de Mesc X Idade X Gênero</option>
          <!-- Adicione outras opções de análise aqui -->
        </select>
      </div>
      <div class="chart-display-area">
        <div v-if="selectedChart">
          <div v-if="chartsLoaded" class="charts-container">
            <BarChart /> <!-- Aqui você pode substituir pelo gráfico desejado -->
          </div>
          <div v-else>
            Loading charts or handle error...
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
import BarChart from '../components/BarChart.vue';
import DateFilter from '../components/DateFilter.vue'
import { jsPDF } from 'jspdf';

export default defineComponent({
  name: 'ReportView',
  components: {
    SidebarMenu,
    UserHeader,
    BarChart,
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
  width: 100%;
  height: 100vh;
}

.content-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.selector-container {
  margin-top: 20px;
  text-align: center;
  color: #777777;
}

.chart-display-area {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.charts-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 1000px; /* Ajuste a largura do gráfico aqui */
  height: 400px; /* Ajuste a altura do gráfico aqui */
  text-align: center;
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

.selectChoose{
  height: 50px;
  width: 400px;
  border-radius: 20px;
  color: #777777;
  background-color: #ffffff; /* White background for charts */
  padding: 10px;
  border-color: #777777;
  margin-left: 8px;
}
</style>
