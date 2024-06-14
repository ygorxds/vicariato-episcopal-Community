<template>
    <div class="sidebar">
      <!-- <img src="@/assets/sidebarLogo.svg" alt="Logo" class="sidebar-logo"> -->
      <ul class="menu">
        <li class="menu-item">
          <router-link to="/dashboard" class="menu-link">
            <font-awesome-icon icon="home" class="icon"/>
            <span>Dashboard</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/report" class="menu-link">
            <font-awesome-icon icon="chart-bar" class="icon"/>
            <span>Relatórios</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/add-mesc" class="menu-link">
            <font-awesome-icon :icon="['fas', 'plus']" class="icon"/>
            <span>Cadastrar Mesc</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/list-mesc" class="menu-link">
            <font-awesome-icon :icon="['fas', 'user']" class="icon"/>
            <span>Listar Mescs</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/institution-management" class="menu-link">
            <font-awesome-icon :icon="['fas', 'church']" class="icon"/>
            <span>Gerenciamento de instituições</span>
          </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SidebarMenu',
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 100px;
    height: auto;
    background-color: #dddddd;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .sidebar-logo {
    width: 80px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .menu {
    list-style: none;
    padding: 0;
    width: 100%;
    text-align: center;
  }
  
  .menu-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: inherit;
    text-decoration: none;
  }
  
  .icon {
    font-size: 24px; /* Tamanho do ícone */
    color: #4a4a4a; /* Cor do ícone */
    margin-bottom: 5px;
  }
  
  .menu-item {
    padding: 10px 0;
    cursor: pointer;
    font-size: 12px; /* Menor tamanho de fonte */
  }
  
  .menu-item:hover {
    background-color: #f0f0f0;
  }
  </style>
  