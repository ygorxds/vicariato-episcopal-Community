<template>
    <div class="dashboard-container">
      <SidebarMenu />
      <div class="content-area">
        <UserHeader />
        <div class="details-container">
          <h2>Detalhes da Paróquia</h2>
          <div class="details-grid" v-if="paroquia">
            <div class="detail-item">
              <label>Nome:</label>
              <span>{{ paroquia.nome }}</span>
            </div>
            <div class="detail-item">
              <label>Rua:</label>
              <span>{{ paroquia.rua }}</span>
            </div>
            <div class="detail-item">
              <label>Número:</label>
              <span>{{ paroquia.numero }}</span>
            </div>
            <div class="detail-item">
              <label>CEP:</label>
              <span>{{ paroquia.cep }}</span>
            </div>
            <div class="detail-item">
              <label>Complemento:</label>
              <span>{{ paroquia.complemento }}</span>
            </div>
          </div>
          <button @click="goBack">Voltar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import axios from 'axios';
  import SidebarMenu from '../components/SidebarMenu.vue';
  import UserHeader from '../components/Header.vue';
  
  interface Paroquia {
    id: number;
    nome: string;
    rua: string;
    numero: string;
    cep: string;
    complemento: string;
  }
  
  export default defineComponent({
    name: 'ParishDetailsView',
    components: {
      SidebarMenu,
      UserHeader
    },
    setup() {
      const router = useRouter();
      const route = useRoute();
      const paroquia = ref<Paroquia | null>(null);
  
      const fetchParoquiaDetails = async () => {
        const token = localStorage.getItem('token');
        const paroquiaId = route.params.id;
  
        if (!token) {
          alert('Você precisa estar logado para visualizar os detalhes da paróquia.');
          return;
        }
  
        try {
          const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/paroquia/ver/${paroquiaId}`, {
            headers: {
              'x-access-token': token
            }
          });
          paroquia.value = response.data;
        } catch (error) {
          console.error('Erro ao buscar detalhes da paróquia:', error);
          alert('Erro ao buscar detalhes da paróquia.');
        }
      };
  
      const goBack = () => {
        router.back();
      };
  
      onMounted(() => {
        fetchParoquiaDetails();
      });
  
      return {
        paroquia,
        goBack
      };
    }
  });
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    width: 100%;
    min-height: 100vh;
  }
  
  .content-area {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: #dddddd;
  }
  
  .details-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  
  .details-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 15px;
  }
  
  .detail-item {
    display: flex;
    flex-direction: column;
  }
  
  .detail-item label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
  }
  
  .detail-item span {
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  button {
    padding: 10px 20px;
    background-color: #831302;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 20px;
    display: block;
    width: 100%;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
  }
  
  button:hover {
    background-color: #e61010;
  }
  </style>
  