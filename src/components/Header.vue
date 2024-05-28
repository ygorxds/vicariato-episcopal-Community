<template>
    <div class="header">
      <img src="@/assets/logoLogin.png" alt="Vicariato Barra" class="logo">
      <div class="user-menu">
        <!-- Ícone de usuário que, ao ser clicado, controla o dropdown -->
        <font-awesome-icon icon="user-circle" @click="toggleDropdown" class="user-icon"/>
        <!-- Dropdown que aparece baseado no estado isDropdownVisible -->
        <div v-if="isDropdownVisible" class="dropdown">
          <a href="/profile">Ver perfil</a>
          <a href="/logout">Sair da conta</a>
        </div>
      </div>
      <div>
        <!-- Link adicional no cabeçalho para outra funcionalidade, com um ícone também clicável -->
        <router-link to="/" class="menu-link">
            <font-awesome-icon icon="user" class="icon"/>
        </router-link>
        <span class="welcome-message">Bem vindo, Alfredo Boente</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserHeader',
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
    border-bottom: 2px solid #E1E1E1;
    padding: 0.5rem 1rem;
  }
  
  .logo {
    width: 200px;
  }
  
  .user-menu {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .user-icon {
    font-size: 24px;
    cursor: pointer;
  }
  
  .dropdown {
    position: absolute;
    right: 0;
    top: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    z-index: 100;
    display: flex;
    flex-direction: column;
  }
  
  .dropdown a {
    padding: 0.5rem;
    text-decoration: none;
    color: #333;
    display: block;
  }
  
  .dropdown a:hover {
    background-color: #eee;
  }
  
  .welcome-message {
    color: #555;
  }
  
  .menu-link {
    color: #555;
    margin-right: 10px;
  }
  </style>
  