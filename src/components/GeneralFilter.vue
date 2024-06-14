<template>
    <div class="filter-sidebar">
      <button class="close-btn" @click="$emit('close')">
        <font-awesome-icon icon="times" />
      </button>
      <div class="filter-options">
        <h1 style="color: darkred" for="filterType">Filtros:</h1>
        <label>Tipo de Instituição:</label>
        <select v-model="filterType" @change="handleFilterChange">
          <option value="">Selecione o tipo de instituição:</option>
          <option value="paroquia">Paróquia</option>
          <option value="capela">Capela</option>
        </select>
        <div v-if="filterType === 'paroquia'">
          <label for="paroquia">Selecione a Paróquia:</label>
          <select v-model="selectedParoquia">
            <option value="">Selecione</option>
            <option v-for="paroquia in paroquias" :key="paroquia.id" :value="paroquia.id">{{ paroquia.name }}</option>
          </select>
        </div>
        <div v-if="filterType === 'capela'">
          <label for="capela">Selecione a Capela:</label>
          <select v-model="selectedCapela">
            <option value="">Selecione</option>
            <option v-for="capela in capelas" :key="capela.id" :value="capela.id">{{ capela.name }}</option>
          </select>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GeneralFilter',
    data() {
      return {
        filterType: '',
        selectedParoquia: '',
        selectedCapela: '',
        paroquias: [
          { id: 1, name: 'Paróquia A' },
          { id: 2, name: 'Paróquia B' },
          // Adicione outras paróquias aqui
        ],
        capelas: [
          { id: 1, name: 'Capela A' },
          { id: 2, name: 'Capela B' },
          // Adicione outras capelas aqui
        ],
      };
    },
    methods: {
      handleFilterChange() {
        this.selectedParoquia = '';
        this.selectedCapela = '';
      },
    },
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
    border-radius: 0 10px 10px 0; /* Bordas arredondadas à direita */
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
  