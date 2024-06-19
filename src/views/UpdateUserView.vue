<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="content-area">
      <UserHeader />
      <form class="form-container" @submit.prevent="handleSubmit">
        <h2>Atualizar o meu Usuário</h2>
        <div class="form-row">
          <label for="nome">Nome completo:</label>
          <input type="text" id="nome" v-model="formData.nome" required>
        </div>
        <div class="form-row">
          <label for="genero">Gênero:</label>
          <select id="genero" v-model="formData.genero" required>
            <option disabled value="">Selecione o gênero</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div class="form-row">
          <label for="email">E-mail:</label>
          <input type="email" id="email" v-model="formData.email" required>
        </div>
        <div class="form-row">
          <label for="telefone">Telefone:</label>
          <input type="text" id="telefone" v-model="formData.telefone" required>
        </div>
        <div class="form-row">
          <label for="dataNascimento">Data de Nascimento:</label>
          <input type="date" id="dataNascimento" v-model="formData.dataNascimento" required>
        </div>
        <div class="form-row">
          <label for="senha">Nova Senha (deixe em branco se não quiser mudar):</label>
          <input type="password" id="senha" v-model="formData.senha">
        </div>
        <button type="submit">Atualizar</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import SidebarMenu from '../components/SidebarMenu.vue';
import UserHeader from '../components/Header.vue';
import router from '@/router';

export default defineComponent({
  name: 'UserUpdate',
  components: {
    SidebarMenu,
    UserHeader
  },
  setup() {
    const formData = ref({
      nome: '',
      genero: '',
      email: '',
      telefone: '',
      dataNascimento: '',
      senha: ''
    });

    const statusConta = ref(''); // Mantém a hierarquia do usuário separadamente

    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/user/userData', {
            headers: {
              'x-access-token': token
            }
          });
          const userData = response.data;
          formData.value = {
            nome: userData.nome,
            genero: userData.genero,
            email: userData.email,
            telefone: userData.telefone,
            dataNascimento: userData.dataNascimento.slice(0, 10),
            senha: ''
          };
          statusConta.value = userData.statusConta;
          localStorage.setItem('userData', JSON.stringify({ ...formData.value, statusConta: statusConta.value }));
        } catch (error) {
          console.error('Erro ao buscar os dados do usuário:', error);
          alert('Erro ao buscar os dados do usuário.');
        }
      } else {
        alert('Token não encontrado. Faça login novamente.');
      }
    };

    const handleSubmit = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const updatedData = { ...formData.value, statusConta: statusConta.value };
          await axios.put('http://localhost:5000/api/user/update', updatedData, {
            headers: {
              'x-access-token': token
            }
          });
          alert('Usuário atualizado com sucesso!');
          router.push('/see-profile');
          localStorage.setItem('userData', JSON.stringify(updatedData));
        } catch (error) {
          console.error('Erro ao atualizar o usuário:', error);
          alert('Erro ao atualizar o usuário. Tente novamente.');
        }
      } else {
        alert('Token não encontrado. Faça login novamente.');
      }
    };

    onMounted(() => {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        formData.value = parsedData;
        statusConta.value = parsedData.statusConta;
      } else {
        fetchUserData();
      }
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
