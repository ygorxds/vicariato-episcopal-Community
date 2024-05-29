<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="content-area">
      <UserHeader />
      <div v-if="chartsLoaded" class="charts-container">

        <!-- <PieChart />-->
        <BarChart /> 
      </div>
      <div v-else>
        Loading charts or handle error...
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import SidebarMenu from '../components/SidebarMenu.vue';
import UserHeader from '../components/Header.vue';
import PieChart from '../components/PieChart.vue';
import BarChart from '../components/BarChart.vue';

export default defineComponent({
  name: 'UserDashboard',
  components: {
    SidebarMenu,
    UserHeader,
    // PieChart,
     BarChart
  },
  setup() {
    const chartsLoaded = ref(false);

    // Function to simulate chart data loading
    const loadCharts = async () => {
      try {
        // Simulate fetching data with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        chartsLoaded.value = true;
      } catch (error) {
        console.error("Failed to load charts:", error);
        chartsLoaded.value = false;
      }
    };

    onMounted(() => {
      loadCharts();
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
  width: 200px; /* Adjust the width as needed */
  background-color: #f4f4f4; /* Sidebar background color */
}

.content-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: rgb(239, 239, 239);
}

.charts-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: #ffffff; /* Light gray background for charts */
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  height: 300px;
  margin-top: 15px;
  margin-right: 15px;
  margin-left: 15px;
}
</style>
