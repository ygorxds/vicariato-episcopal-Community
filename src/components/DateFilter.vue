<template>
  <div class="filter-container">
    <div class="filter-item">
      <label for="startDate">Data inicial:</label>
      <input type="date" id="startDate" v-model="startDate" @change="emitStartDate" />
      <label for="endDate">Data final:</label>
      <input type="date" id="endDate" v-model="endDate" @change="emitEndDate" />
    </div>
    <div class="filter-item">
      <label for="churchSelector">Filtrar por Igreja:</label>
      <select id="churchSelector" v-model="selectedChurch" @change="emitChurch">
        <option disabled value="">Selecione uma Igreja</option>
        <option v-for="church in churches" :key="church" :value="church">{{ church }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DateFilter',
  setup(_, { emit }) {
    const startDate = ref('');
    const endDate = ref('');
    const selectedChurch = ref('');
    const churches = [
      'Paróquia Nossa Senhora da Conceição',
      'Paróquia São José Operário',
      'Paróquia Santa Luzia',
      'Paróquia Santo Antônio de Pádua',
      'Paróquia São Judas Tadeu',
      'Todas'
      // Adicione mais igrejas conforme necessário
    ];

    function emitStartDate() {
      emit('startDateSelected', startDate.value);
    }

    function emitEndDate() {
      emit('endDateSelected', endDate.value);
    }

    function emitChurch() {
      emit('churchSelected', selectedChurch.value);
    }

    return { startDate, endDate, selectedChurch, churches, emitStartDate, emitEndDate, emitChurch };
  }
});
</script>

<style scoped>
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
