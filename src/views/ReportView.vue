<template>
    <div id="filter">
        
      </div>
    <h1>TESTE RELATÓRIOS</h1>
        <div>
          <SidebarMenu />
        </div>
      </template>
      
      <script lang="ts">
      import { defineComponent } from 'vue';
      import SidebarMenu from '../components/SidebarMenu.vue'
    
    
      
      export default defineComponent({
        name: 'UserDashboard',
        components: {
        SidebarMenu
      }
      });
      </script>
      