<template>
  <div class="login-container">
    <div class="login-form">
      <img src="@/assets/logoLogin.png" alt="Vicariato Barra" class="logo">
      <h1>Bem Vindo!</h1>
      <input type="text" placeholder="E-mail" v-model="email" />
      <input type="password" placeholder="Senha" v-model="password" />
      <a href="/" class="forgot-password">Esqueci minha senha</a>
      <button @click="login">Entrar</button>
      <p class="register">ou</p>
      <a href="/" class="register-link">Cadastre-se aqui</a>
    </div>
    <div class="login-image">
      <img src="https://images.pexels.com/photos/267559/pexels-photo-267559.jpeg" alt="Bible Image" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'UserLogin',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    function login() {
      if (email.value === 'admin' && password.value === 'admin') {
        router.push('/dashboard');
      } else {
        alert('Credenciais incorretas!');
      }
    }

    return {
      email,
      password,
      login
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
}

.logo {
  width: 250px;
  margin-bottom: 2rem;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  box-sizing: border-box;
}

.forgot-password, .register-link {
  display: block;
  margin-top: 10px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
}

.register {
  text-align: center;
  margin-top: 20px;
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
