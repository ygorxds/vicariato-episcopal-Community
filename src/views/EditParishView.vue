<template>
    <div class="dashboard-container">
      <SidebarMenu />
      <div class="content-area">
        <UserHeader />
        <form class="form-container" @submit.prevent="handleSubmit">
          <h2>Editar Paróquia</h2>
          <div class="form-row">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" v-model="formData.nome" required>
          </div>
          <div class="form-row">
            <label for="rua">Rua:</label>
            <input type="text" id="rua" v-model="formData.rua" required>
          </div>
          <div class="form-row">
            <label for="numero">Número:</label>
            <input type="text" id="numero" v-model="formData.numero" required>
          </div>
          <div class="form-row">
            <label for="cep">CEP:</label>
            <input type="text" id="cep" v-model="formData.cep" required>
          </div>
          <div class="form-row">
            <label for="complemento">Complemento:</label>
            <input type="text" id="complemento" v-model="formData.complemento">
          </div>
          <button type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import axios from 'axios';
  import SidebarMenu from '../components/SidebarMenu.vue';
  import UserHeader from '../components/Header.vue';
  
  export default defineComponent({
    name: 'EditParishView',
    components: {
      SidebarMenu,
      UserHeader
    },
    setup() {
      const router = useRouter();
      const route = useRoute();
      const formData = ref({
        nome: '',
        rua: '',
        numero: '',
        cep: '',
        complemento: ''
      });
  
      const fetchParoquiaData = async () => {
        const token = localStorage.getItem('token');
        const paroquiaId = route.params.id;
        if (!token) {
          alert('Você precisa estar logado para editar a paróquia.');
          return;
        }
  
        try {
          const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/paroquia/ver/${paroquiaId}`, {
            headers: {
              'x-access-token': token
            }
          });
          formData.value = response.data;
        } catch (error) {
          console.error('Erro ao buscar dados da paróquia:', error);
          alert('Erro ao buscar dados da paróquia.');
        }
      };
  
      const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const paroquiaId = route.params.id;
        if (!token) {
          alert('Você precisa estar logado para atualizar a paróquia.');
          return;
        }
  
        try {
          await axios.put(`${process.env.VUE_APP_API_URL}/api/paroquia/editar/${paroquiaId}`, formData.value, {
            headers: {
              'x-access-token': token
            }
          });
          alert('Dados da paróquia atualizados com sucesso!');
          router.push('/list-parish');
        } catch (error) {
          console.error('Erro ao atualizar dados da paróquia:', error);
          alert('Erro ao atualizar dados da paróquia.');
        }
      };
  
      onMounted(() => {
        fetchParoquiaData();
      });
  
      return {
        formData,
        handleSubmit
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
    padding: 0px;
    background-color: #dddddd;
  }
  
  .user-header {
    width: 100%;
    background-color: #fff;
    padding: 10px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .form-container {
    width: 100%;
    max-width: 1200px;
    margin: 20px auto;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .form-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .form-row label {
    width: 200px;
    min-width: 120px;
    padding-right: 10px;
  }
  
  .form-row input,
  .form-row select {
    flex: 1 1 180px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #831302;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #e61010;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  