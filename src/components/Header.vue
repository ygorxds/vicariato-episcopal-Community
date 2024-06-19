<template>
  <div class="header">
    <img src="@/assets/logoLogin.png" alt="Vicariato Barra" class="logo">
    <div class="welcome-area" @click="toggleDropdown">
      <div class="text-icon-container">
        <font-awesome-icon icon="user-circle" class="user-icon"/>
        <div class="text-container">
          <span class="welcome-message">Bem vindo,</span>
          <span class="user-name">{{ userName }}</span>
        </div>
      </div>
    </div>
    <!-- Dropdown que aparece baseado no estado isDropdownVisible -->
    <div v-if="isDropdownVisible" class="dropdown">
      <a href="/see-profile">
        <font-awesome-icon :icon="['fas', 'user']" /> Ver perfil
      </a>
      <a href="/" @click.prevent="logout">
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" /> Fazer logoff
      </a>
      <div style="margin-top: 5px; font-size: 12px; color: gray">
        VMA-Vicariato Mesc Analycs V.Beta
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'UserHeader',
  components: {
    'font-awesome-icon': FontAwesomeIcon
  },
  setup() {
    const userName = ref('Nome do Usuário'); // Inicializa com uma string vazia
    const isDropdownVisible = ref(false);
    const router = useRouter();

    const fetchUserName = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      console.log('Fetching user name with token:', token); // Adicione este log
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/user/me`, {
        headers: {
          'x-access-token': token
        }
      });
      console.log('User data received:', response.data); // Adicione este log
      userName.value = response.data.nome;
    } catch (error) {
      console.error('Erro ao buscar o nome do usuário:', error);
      alert('Erro ao buscar o nome do usuário.');
    }
  } else {
    alert('Token não encontrado. Faça login novamente.');
    router.push('/');
  }
};


    const toggleDropdown = () => {
      isDropdownVisible.value = !isDropdownVisible.value;
    };

    const logout = () => {
      localStorage.removeItem('token');
      router.push('/');
    };

    onMounted(() => {
      fetchUserName();
    });

    return {
      userName,
      isDropdownVisible,
      toggleDropdown,
      logout
    };
  }
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #dddddd;
  padding: 0.5rem 1rem;
  position: relative; /* Adiciona referência para posicionamento do dropdown */
}

.logo {
  width: 200px;
  height: auto; /* Garante que a logo mantenha proporção */
}

.welcome-area {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.text-icon-container {
  display: flex;
  align-items: center;
}

.user-icon {
  color: #990000; /* Vermelho escuro, como solicitado */
  font-size: 24px;
  margin-right: 10px;
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.welcome-message {
  color: #333; /* Cinza escuro, como solicitado */
  font-size: 0.9em; /* Ajuste de tamanho de fonte, se necessário */
}

.user-name {
  color: #990000; /* Vermelho escuro, como solicitado */
  font-weight: bold; /* Faz o nome do usuário se destacar */
  font-size: 1em; /* Ajuste de tamanho de fonte, se necessário */
}

.dropdown {
  position: absolute;
  right: 0;
  top: 100%; /* Posiciona diretamente abaixo do .welcome-area */
  background-color: #ffffff;
  border: 1px solid #cccccc;
  z-index: 100;
  width: 200px; /* Largura do dropdown */
  display: block; /* Mudado de 'none' para 'flex' para testes */
  flex-direction: column;
  border-radius: 10px;
}

.dropdown a {
  padding: 0.5rem;
  text-decoration: none;
  color: #333333;
  display: block;
}

.dropdown a:hover {
  background-color: #eeeeee;
}
</style>
