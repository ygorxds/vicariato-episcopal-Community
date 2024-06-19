<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="main-content">
      <UserHeader />
      <div class="content-area">
        <div class="profile-container">
          <h1>Perfil do usuário</h1>
          <div class="profile-card" v-if="user">
            <font-awesome-icon icon="user" class="profile-icon" />
            <div class="profile-details">
              <p><strong>Nome:</strong> <span class="highlight">{{ user.nome }}</span></p>
              <p><strong>Idade:</strong> <span class="highlight">{{ idade }} anos</span></p>
              <p><strong>Gênero:</strong> <span class="highlight">{{ user.genero }}</span></p>
              <p><strong>Status:</strong> {{ user.statusConta }}</p>
            </div>
            <button class="update-button" @click="goToUpdateUserPage">Atualizar meus dados</button>
            <button v-if="user.statusConta === 'coordenador'" style="margin-left: 10px;" class="update-button" @click="goToNewUserPage">+</button>
            <button style="margin-left: 10px;" class="update-button" @click="goToDeleteMyProfile">Deletar minha conta</button>
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineComponent({
  name: 'UserProfile',
  components: {
    SidebarMenu,
    UserHeader,
    FontAwesomeIcon
  },
  setup() {
    const router = useRouter();
    const user = ref(null);
    const idade = ref('');

    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/user/myData', {
            headers: {
              'x-access-token': token
            }
          });
          user.value = response.data;
          calcularIdade(response.data.dataNascimento);
        } catch (error) {
          console.error('Erro ao buscar os dados do usuário:', error);
          alert('Erro ao buscar os dados do usuário.');
        }
      } else {
        alert('Token não encontrado. Faça login novamente.');
        router.push('/');
      }
    };

    const calcularIdade = (dataNascimento: string) => {
      const hoje = new Date();
      const nascimento = new Date(dataNascimento);
      let idadeCalculada = hoje.getFullYear() - nascimento.getFullYear();
      const mes = hoje.getMonth() - nascimento.getMonth();
      if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idadeCalculada--;
      }
      idade.value = idadeCalculada.toString();
    };

    const goToNewUserPage = () => {
      router.push('/new-user');
    };

    const goToUpdateUserPage = () => {
      router.push('/update-user');
    };

    const goToDeleteMyProfile = async () => {
      const userConfirmed = window.confirm("Você tem certeza que deseja deletar sua conta?");
      if (userConfirmed) {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.delete('http://localhost:5000/api/user/deleteAccount', {
            headers: {
              'x-access-token': token
            }
          });
          alert(response.data.msg);
          router.push('/'); // Redireciona para a página inicial após deletar a conta
        } catch (error) {
          console.error('Erro ao deletar a conta:', error);
          alert('Erro ao deletar a conta.');
        }
      }
    };

    onMounted(() => {
      fetchUserData();
    });

    return {
      user,
      idade,
      goToNewUserPage,
      goToUpdateUserPage,
      goToDeleteMyProfile
    };
  },
});
</script>

<style scoped>
.dashboard-container {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.content-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px; /* Adicionado para separar do header */
}

.profile-card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.profile-icon {
  font-size: 100px;
  color: #750303;
  margin-bottom: 20px;
}

.profile-details p {
  margin: 10px 0;
}

.highlight {
  color: red;
}

.update-button {
  padding: 10px 20px;
  background-color: #831302;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}

.update-button:hover {
  background-color: #e61010;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}
</style>
