<template>
  <div>
    <UserHeader /> 
    <SidebarMenu />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SidebarMenu from '../components/SidebarMenu.vue';
import UserHeader from '../components/Header.vue';

export default defineComponent({
  name: 'UserDashboard',
  components: {
    SidebarMenu,
    UserHeader
  }
});
</script>
