<template>
    <div class="dashboard-container">
      <SidebarMenu />
      <div class="content-area">
        <UserHeader />
        <div class="details-container">
          <h2>Detalhes da Capela</h2>
          <div class="details-grid" v-if="capela">
            <div class="detail-item">
              <label>Nome:</label>
              <span>{{ capela.nome }}</span>
            </div>
            <div class="detail-item">
              <label>Paróquia:</label>
              <span>{{ getParoquiaName(capela.paroqId) }}</span>
            </div>
            <div class="detail-item">
              <label>Rua:</label>
              <span>{{ capela.rua }}</span>
            </div>
            <div class="detail-item">
              <label>Número:</label>
              <span>{{ capela.numero }}</span>
            </div>
            <div class="detail-item">
              <label>CEP:</label>
              <span>{{ capela.cep }}</span>
            </div>
            <div class="detail-item">
              <label>Complemento:</label>
              <span>{{ capela.complemento }}</span>
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
  
  interface Capela {
    id: number;
    nome: string;
    paroqId: number;
    rua: string;
    numero: string;
    cep: string;
    complemento: string;
  }
  
  interface Paroquia {
    id: number;
    nome: string;
  }
  
  export default defineComponent({
    name: 'ChapelDetails',
    components: {
      SidebarMenu,
      UserHeader
    },
    setup() {
      const router = useRouter();
      const route = useRoute();
      const capela = ref<Capela | null>(null);
      const paroquias = ref<Paroquia[]>([]);
  
      const fetchCapelaDetails = async () => {
        const id = route.params.id as string;
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Você precisa estar logado para visualizar os detalhes da capela.');
          return;
        }
  
        try {
          const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/capela/ver/${id}`, {
            headers: {
              'x-access-token': token
            }
          });
          capela.value = response.data;
        } catch (error) {
          console.error('Erro ao buscar detalhes da capela:', error);
          alert('Erro ao buscar detalhes da capela.');
        }
      };
  
      const fetchParoquias = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Você precisa estar logado para visualizar as paróquias.');
          return;
        }
  
        try {
          const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/paroquia/listar`, {
            headers: {
              'x-access-token': token
            }
          });
          paroquias.value = response.data;
        } catch (error) {
          console.error('Erro ao buscar paróquias:', error);
          alert('Erro ao buscar paróquias.');
        }
      };
  
      const getParoquiaName = (id: number) => {
        const paroquia = paroquias.value.find(paroquia => paroquia.id === id);
        return paroquia ? paroquia.nome : 'Desconhecida';
      };
  
      const goBack = () => {
        router.back();
      };
  
      onMounted(() => {
        fetchCapelaDetails();
        fetchParoquias();
      });
  
      return {
        capela,
        getParoquiaName,
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
  