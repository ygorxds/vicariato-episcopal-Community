<template>
    <div class="management-container">
      <SidebarMenu />
      <div class="management-content">
        <UserHeader />
        <div class="management-area">
          <div class="institution-management-container">
            <h1>Gerenciamento de Instituições</h1>
            <div class="institution-card" v-if="user">
              Gerenciamento de Paróquias
              <div class="institution-details"></div>
              <button class="action-button" @click="goToSeeParish">Ver Paróquias</button>
              <button style="margin-left: 10px;" class="action-button" @click="goToCreateParish">Adicionar Paróquia</button>
            </div>
            <div style="margin-top: 10px;" class="institution-card" v-if="user">
              Gerenciamento de Capelas
              <div class="institution-details"></div>
              <button class="action-button" @click="goToSeeChapel">Ver Capelas</button>
              <button style="margin-left: 10px;" class="action-button" @click="goToCreateChapel">Adicionar Capela</button>
            </div>
            <div v-else>
              <p>Carregando...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import SidebarMenu from '../components/SidebarMenu.vue';
  import UserHeader from '../components/Header.vue';
  
  export default defineComponent({
    name: 'ParoquiaCapelaManagement',
    components: {
      SidebarMenu,
      UserHeader
    },
    setup() {
      const router = useRouter();
      const user = ref(null);
  
      const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/user/myData`, {
              headers: {
                'x-access-token': token
              }
            });
            user.value = response.data;
          } catch (error) {
            console.error('Erro ao buscar os dados do usuário:', error);
            alert('Erro ao buscar os dados do usuário.');
          }
        } else {
          alert('Token não encontrado. Faça login novamente.');
          router.push('/');
        }
      };
  
      const goToCreateParish = () => {
        router.push('/create-parish');
      };
  
      const goToSeeParish = () => {
        router.push('/list-parish');
      };
  
      const goToDeleteParish = async () => {
        const userConfirmed = window.confirm('Você tem certeza que deseja deletar a paróquia?');
        if (userConfirmed) {
          const token = localStorage.getItem('token');
          try {
            const response = await axios.delete(`${process.env.VUE_APP_API_URL}/api/parish/delete`, {
              headers: {
                'x-access-token': token
              }
            });
            alert(response.data.msg);
            router.push('/');
          } catch (error) {
            console.error('Erro ao deletar a paróquia:', error);
            alert('Erro ao deletar a paróquia.');
          }
        }
      };
  
      const goToCreateChapel = () => {
        router.push('/create-chapel');
      };
  
      const goToSeeChapel = () => {
        router.push('/list-chapel');
      };
  
      const goToDeleteChapel = async () => {
        const userConfirmed = window.confirm('Você tem certeza que deseja deletar a capela?');
        if (userConfirmed) {
          const token = localStorage.getItem('token');
          try {
            const response = await axios.delete(`${process.env.VUE_APP_API_URL}/api/chapel/delete`, {
              headers: {
                'x-access-token': token
              }
            });
            alert(response.data.msg);
            router.push('/');
          } catch (error) {
            console.error('Erro ao deletar a capela:', error);
            alert('Erro ao deletar a capela.');
          }
        }
      };
  
      onMounted(() => {
        fetchUserData();
      });
  
      return {
        user,
        goToCreateParish,
        goToSeeParish,
        goToDeleteParish,
        goToCreateChapel,
        goToSeeChapel,
        goToDeleteChapel
      };
    }
  });
  </script>
  
  <style scoped>
  .management-container {
    display: flex;
    width: 100%;
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  
  .management-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  
  .management-area {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .institution-management-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 20px;
  }
  
  .institution-card {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 100%;
  }
  
  .institution-details p {
    margin: 10px 0;
  }
  
  .action-button {
    padding: 10px 20px;
    background-color: #831302;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 20px;
  }
  
  .action-button:hover {
    background-color: #e61010;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  </style>
  