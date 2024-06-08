<template>
  <div class="header">
    <img src="@/assets/logoLogin.png" alt="Vicariato Barra" class="logo">
    <div class="welcome-area" @click="toggleDropdown">
      <div class="text-icon-container">
        <font-awesome-icon icon="user-circle" class="user-icon"/>
        <div class="text-container">
          <span class="welcome-message">Bem vindo,</span>
          <span class="user-name">Alfredo Boente</span>
        </div>
      </div>
    </div>
    <!-- Dropdown que aparece baseado no estado isDropdownVisible -->
    <div v-if="isDropdownVisible" class="dropdown">
  <a href="/profile">
    <font-awesome-icon :icon="['fas', 'user']" /> Ver perfil
  </a>
  <a href="/">
    <font-awesome-icon :icon="['fas', 'sign-out-alt']" /> Fazer logoff
  </a>
  <div style="margin-top: 5px;
  font-size: 12px;
  color: gray">
    VMA-Vicariato Mesc Analycs V.Beta
    
  </div>
</div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Vue } from 'vue-class-component';

export default {
  name: 'UserHeader',
  components: {
    'font-awesome-icon': FontAwesomeIcon
  },
  data() {
    return {
      isDropdownVisible: false // Controle de visibilidade do dropdown
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    }
  }
}
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
