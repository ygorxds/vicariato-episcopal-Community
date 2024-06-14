<template>
  <div class="filter-sidebar">
    <button class="close-btn" @click="$emit('close')">
      <font-awesome-icon icon="times" />
    </button>
    <div class="filter-options">
      <h1 style="color: darkred" for="filterType">Filtros:</h1>
      <label for="paroquia">Selecione a Paróquia:</label>
      <select v-model="selectedParoquia" @change="handleParoquiaChange">
        <option value="">Selecione</option>
        <option v-for="paroquia in paroquias" :key="paroquia.id" :value="paroquia.id">{{ paroquia.nome }}</option>
      </select>
      <label for="capela">Selecione a Capela:</label>
      <select v-model="selectedCapela" :disabled="!selectedParoquia">
        <option value="">Selecione</option>
        <option v-for="capela in filteredCapelas" :key="capela.id" :value="capela.id">{{ capela.nome }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GeneralFilter',
  data() {
    return {
      selectedParoquia: '',
      selectedCapela: '',
      paroquias: [],
      capelas: [],
      filteredCapelas: []
    };
  },
  methods: {
    async handleParoquiaChange() {
      this.selectedCapela = '';
      if (this.selectedParoquia) {
        this.filteredCapelas = this.capelas.filter(capela => capela.paroqId === this.selectedParoquia);
      } else {
        this.filteredCapelas = [];
      }
    },
    async fetchParoquias() {
      try {
        const response = await axios.get('http://localhost:5000/api/paroquia/listar');
        this.paroquias = response.data;
      } catch (error) {
        console.error('Erro ao buscar paróquias:', error);
      }
    },
    async fetchCapelas() {
      try {
        const response = await axios.get('http://localhost:5000/api/capela/listar');
        this.capelas = response.data;
      } catch (error) {
        console.error('Erro ao buscar capelas:', error);
      }
    }
  },
  async mounted() {
    await this.fetchParoquias();
    await this.fetchCapelas();
  }
};
</script>

<style scoped>
.filter-sidebar {
  width: 300px;
  height: 100%;
  background-color: white;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  border-radius: 0 10px 10px 0;
  color: #a4a4a4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
}

.close-btn {
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #a4a4a4;
}

.filter-options {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #a4a4a4;
}

.filter-options label,
.filter-options select {
  margin-bottom: 10px;
  width: 100%;
}

.filter-options select {
  padding: 8px;
  border: 1px solid #a4a4a4;
  border-radius: 20px;
  color: #747474;
}
</style>
