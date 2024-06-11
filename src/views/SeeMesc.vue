<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="content-area">
      <UserHeader />
      <div class="details-container">
        <h2>Detalhes do MESC</h2>
        <div class="details-grid" v-if="mesc">
          <div class="detail-item">
            <label>Nome:</label>
            <span>{{ mesc.nome }}</span>
          </div>
          <!-- Adicione os outros campos aqui -->
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

export default defineComponent({
  name: 'MescDetails',
  components: {
    SidebarMenu,
    UserHeader
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const mesc = ref<any>(null);

    const fetchMescDetails = async (id: number) => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você precisa estar logado para visualizar os detalhes do MESC.');
        return;
      }

      try {
        console.log(`Enviando requisição para buscar detalhes do MESC com ID: ${id}`);
        const response = await axios.get(`http://localhost:5000/api/mesc/verDadosDoMesc/${id}`, {
          headers: {
            'x-access-token': token
          }
        });
        console.log('Resposta do servidor:', response.data);
        mesc.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar detalhes do MESC:', error);
        alert('Erro ao buscar detalhes do MESC.');
      }
    };

    const goBack = () => {
      router.back();
    };

    onMounted(() => {
      const id = Number(route.params.id);
      console.log('ID do MESC recebido no SeeMesc:', id); // Log para verificar o ID
      if (!isNaN(id)) {
        fetchMescDetails(id);
      } else {
        console.error('ID do MESC não é um número válido:', route.params.id);
        alert('ID do MESC inválido.');
      }
    });

    return {
      mesc,
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
