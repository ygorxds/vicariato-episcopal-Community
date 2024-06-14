<template>
    <div class="dashboard-container">
      <SidebarMenu />
      <div class="content-area">
        <UserHeader />
        <form class="form-container" @submit.prevent="handleSubmit">
          <h2>Formulário de Cadastro de Capela</h2>
          <div class="form-row">
            <label for="nome">Nome da Capela:</label>
            <input type="text" id="nome" v-model="formData.nome" required />
          </div>
          <div class="form-row">
            <label for="paroqId">Paróquia:</label>
            <select id="paroqId" v-model="formData.paroqId" required>
              <option v-for="paroquia in paroquias" :key="paroquia.id" :value="paroquia.id">
                {{ paroquia.nome }}
              </option>
            </select>
          </div>
          <div class="form-row">
            <label for="rua">Rua:</label>
            <input type="text" id="rua" v-model="formData.rua" required />
          </div>
          <div class="form-row">
            <label for="numero">Número:</label>
            <input type="text" id="numero" v-model="formData.numero" required />
          </div>
          <div class="form-row">
            <label for="cep">CEP:</label>
            <input type="text" id="cep" v-model="formData.cep" required />
          </div>
          <div class="form-row">
            <label for="complemento">Complemento:</label>
            <input type="text" id="complemento" v-model="formData.complemento" />
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import SidebarMenu from '../components/SidebarMenu.vue';
  import UserHeader from '../components/Header.vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'CapelaRegistration',
    components: {
      SidebarMenu,
      UserHeader
    },
    setup() {
      const router = useRouter();
      const formData = ref({
        nome: '',
        paroqId: null,
        rua: '',
        numero: '',
        cep: '',
        complemento: ''
      });
      const paroquias = ref([]);
  
      const fetchParoquias = async () => {
        const token = localStorage.getItem('token'); // Obter o token do armazenamento local
        if (!token) {
          alert('Você precisa estar logado para visualizar as paróquias.');
          return;
        }
  
        try {
          const response = await axios.get('http://localhost:5000/api/paroquia/listar', {
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
  
      const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Você precisa estar logado para enviar o formulário.');
          return;
        }
  
        try {
          const response = await axios.post('http://localhost:5000/api/capela/criar', formData.value, {
            headers: {
              'x-access-token': token
            }
          });
          alert('Capela registrada com sucesso!');
          console.log('Dados enviados:', response.data);
          router.push('/institution-management');
        } catch (error) {
          console.error('Erro ao registrar a capela:', error);
          alert('Erro ao registrar a capela. Tente novamente.');
        }
      };
  
      onMounted(() => {
        fetchParoquias();
      });
  
      return {
        formData,
        paroquias,
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
    padding: 20px;
    background-color: #dddddd;
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
  
  .form-row input, .form-row select {
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
  