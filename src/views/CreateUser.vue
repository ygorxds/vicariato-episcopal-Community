<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="content-area">
      <UserHeader />
      <form class="form-container" @submit.prevent="handleSubmit">
        <h2>Formulário de Cadastro de Usuário</h2>
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
          <label for="senha">Crie uma senha:</label>
          <input type="password" id="senha" v-model="formData.senha" required>
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
          <label for="statusConta">Status da conta:</label>
          <select id="statusConta" v-model="formData.statusConta" required>
            <option disabled value="">Selecione o status</option>
            <option value="coordenador">Coordenador</option>
            <option value="secretaria">Secretaria</option>
          </select>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import SidebarMenu from '../components/SidebarMenu.vue';
import UserHeader from '../components/Header.vue';

export default defineComponent({
  name: 'UserRegistration',
  components: {
    SidebarMenu,
    UserHeader
  },
  setup() {
    const formData = ref({
      nome: '',
      genero: '',
      email: '',
      senha: '',
      telefone: '',
      dataNascimento: '',
      statusConta: ''
    });

    const handleSubmit = async () => {
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/user/register`, formData.value);
        alert('Usuário registrado com sucesso!');
        console.log('Dados enviados:', response.data);
        // Redirecionar ou limpar o formulário após o registro
      } catch (error) {
        console.error('Erro ao registrar o usuário:', error);
        alert('Erro ao registrar o usuário. Tente novamente.');
      }
    };

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
