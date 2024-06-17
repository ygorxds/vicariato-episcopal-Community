<template>
  <div class="main-container">
    <div class="header">
      <div class="date-filters">
        <label for="startDate">Data inicial:</label>
        <input type="date" id="startDate" v-model="startDate" @change="handleDateChange" />
        <label for="endDate">Data final:</label>
        <input type="date" id="endDate" v-model="endDate" @change="handleDateChange" />
        <select id="periodSelector" v-model="selectedPeriod" @change="updateDates">
          <option disabled value="">Filtre o Período</option>
          <option value="weekly">Semana atual</option>
          <option value="last_week">Semana anterior</option>
          <option value="monthly">Mês atual</option>
          <option value="last_month">Mês anterior</option>
          <option value="yearly">Ano atual</option>
          <option value="last_year">Ano anterior</option>
          <option value="all_time">Todo o Período</option>
          <option value="custom">Customizado</option>
        </select>
      </div>
      <font-awesome-icon icon="filter" class="filter-icon" @click="showFilter = !showFilter"/>
    </div>
    <GeneralFilter v-if="showFilter" @close="showFilter = false" @paroquiaSelected="handleParoquiaSelected" @capelaSelected="handleCapelaSelected" class="sidebar-filter"/>
  </div>
</template>

<script>
import { ref } from 'vue';
import GeneralFilter from './GeneralFilter.vue';

export default {
  components: {
    GeneralFilter,
  },
  setup(_, { emit }) {
    const startDate = ref('');
    const endDate = ref('');
    const selectedPeriod = ref('');
    const showFilter = ref(false);
    const selectedParoquia = ref('');
    const selectedCapela = ref('');

    const updateDates = () => {
      const today = new Date();
      let start = '';
      let end = '';

      switch (selectedPeriod.value) {
        case 'weekly':
          start = new Date(today.setDate(today.getDate() - today.getDay() + 1)).toISOString().split('T')[0];
          end = new Date(today.setDate(today.getDate() - today.getDay() + 7)).toISOString().split('T')[0];
          break;
        case 'last_week':
          start = new Date(today.setDate(today.getDate() - today.getDay() - 6)).toISOString().split('T')[0];
          end = new Date(today.setDate(today.getDate() - today.getDay())).toISOString().split('T')[0];
          break;
        case 'monthly':
          start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
          end = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
          break;
        case 'last_month':
          start = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0];
          end = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split('T')[0];
          break;
        case 'yearly':
          start = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0];
          end = new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0];
          break;
        case 'last_year':
          start = new Date(today.getFullYear() - 1, 0, 1).toISOString().split('T')[0];
          end = new Date(today.getFullYear() - 1, 11, 31).toISOString().split('T')[0];
          break;
        case 'all_time':
          start = '';
          end = '';
          break;
        case 'custom':
          // No need to change dates when custom is selected
          break;
      }

      if (selectedPeriod.value !== 'custom') {
        startDate.value = start;
        endDate.value = end;
      }
      emitFilters();
    };

    const handleDateChange = () => {
      if (startDate.value || endDate.value) {
        selectedPeriod.value = 'custom';
      }
      emitFilters();
    };

    const handleParoquiaSelected = (paroquiaId) => {
      selectedParoquia.value = paroquiaId;
      emitFilters();
    };

    const handleCapelaSelected = (capelaId) => {
      selectedCapela.value = capelaId;
      emitFilters();
    };

    const emitFilters = () => {
      emit('filtersUpdated', {
        startDate: startDate.value,
        endDate: endDate.value,
        paroquia: selectedParoquia.value,
        capela: selectedCapela.value,
      });
    };

    return { startDate, endDate, selectedPeriod, showFilter, updateDates, handleDateChange, handleParoquiaSelected, handleCapelaSelected };
  }
};
</script>

<style scoped>
.main-container {
  position: relative;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  margin-left: 19px;
  margin-right: 19px;
  margin-top: 19px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.date-filters {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-icon {
  cursor: pointer;
  font-size: 24px;
  color: #858585;
}

.sidebar-filter {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 0 10px 10px 0;
}

.filter-container {
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(143, 143, 143, 0.1);
  box-sizing: border-box;
  width: calc(100% - 30px);
  max-width: calc(100% - 30px);
  margin: 15px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #a4a4a4;
}

.filter-item {
  display: flex;
  align-items: center;
  color: #a4a4a4;
}

.filter-item label {
  margin-right: 10px;
  color: #a4a4a4;
}

input[type="date"], select {
  padding: 8px;
  border: 1px solid #a4a4a4;
  border-radius: 20px;
  color: #747474;
}
</style>
