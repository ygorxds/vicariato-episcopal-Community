<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="main-content">
      <UserHeader />
      <div class="content-area">
        <div class="profile-container">
          <h1>Perfil do usuário</h1>
          <div class="profile-card">
            <img src="@/assets/boente.png" alt="User Image" class="profile-image" />
            <div class="profile-details">
              <p><strong>Nome:</strong> <span class="highlight">Alfredo Boente</span></p>
              <p><strong>Idade:</strong> <span class="highlight">45 anos</span></p>
              <p><strong>Gênero:</strong> <span class="highlight">Masculino</span></p>
              <p><strong>Status:</strong> Coordenador</p>
            </div>
            <button class="update-button" @click="goToUpdateUSerPage">Atualizar meus dados</button>
            <button style="margin-left: 10px;" class="update-button" @click="goToNewUserPage">+</button>
            <button style="margin-left: 10px;" class="update-button" @click="goToDeleteMyProfile">Deletar minha conta</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import SidebarMenu from '../components/SidebarMenu.vue';
import UserHeader from '../components/Header.vue';

export default defineComponent({
  name: 'UserProfile',
  components: {
    SidebarMenu,
    UserHeader
  },
  setup() {
    const router = useRouter();

    const goToNewUserPage = () => {
      router.push('/new-user');
    };
    const goToUpdateUSerPage = () =>{
      router.push('/update-user');

    };
    const goToDeleteMyProfile = () =>{
      alert("OPÇÃO NÃO DISPONIVEL NO MOMENTO")

    };

    return {
      goToNewUserPage,
      goToUpdateUSerPage,
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

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
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
