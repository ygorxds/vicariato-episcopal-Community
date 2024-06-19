<template>
  <div class="login-container">
    <div class="login-form">
      <img src="@/assets/logoLogin.png" alt="Vicariato Barra" class="logo">
      <div class="header">
        <h1>Bem Vindo!</h1>
        <h3>Faça Login</h3>
      </div>
      <input type="text" placeholder="E-mail" v-model="email" />
      <input type="password" placeholder="Senha" v-model="password" />
      <a href="/" @click="menuNotification" class="forgot-password">Esqueci minha senha</a>
      <div class="actions">
        <button @click="login">Entrar</button>
      </div>
      <p class="register">ou <a @click="menuNotification" class="register-link">Cadastre-se aqui</a></p>
    </div>
    <div class="login-image">
      <img src="https://images.pexels.com/photos/267559/pexels-photo-267559.jpeg" alt="Bible Image" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'UserLogin',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const menuNotification = () => {
      alert("OPÇÃO NÃO DISPONIVEL NO MOMENTO. FALE COM O SUPORTE PARA ALTERAR SUA SENHA MANUALMENTE NO BANCO OU CRIAR A SUA CONTA");
    };

    const login = async () => {
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/user/login`, {
          email: email.value,
          senha: password.value
        });

        const { token } = response.data;
        localStorage.setItem('token', token);
        router.push({ path: '/dashboard', query: { token } });
      } catch (error) {
        alert('Credenciais incorretas!');
      }
    };

    return {
      email,
      password,
      login,
      menuNotification
    };
  }
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
}

.login-form {
  width: 50%;
  padding: 2rem;
  box-sizing: border-box;
  color: #333; /* Example color */
  font-family: Arial, sans-serif; /* Example font */
}

.logo {
  width: 300px;
  margin-bottom: 2rem;
}

h3 {
  margin-left: 10px;
}

.header {
  display: flex;
  justify-content: left;
  align-items: center;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  box-sizing: border-box;
  border-radius: 5px;
  color: #555;
  text-decoration-color: #555;
  border-color: #eeeeee;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-password {
  color: #555;
  text-decoration: none;
  align-items:
}

button {
  margin-top: 10px;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  width: 1000px;
  border-radius: 5px;
}

.register {
  text-align: left;
  margin-top: 20px;
}

.register-link {
  color: rgb(255, 0, 0); /* Adjust as needed */
  text-decoration: none;
}

.login-image {
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.login-image img {
  width: 100%;
  height: auto;
}
</style>
