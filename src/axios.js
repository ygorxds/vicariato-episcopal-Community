// src/axios.js
import axios from 'axios';

console.log('API URL:', process.env.VUE_APP_API_URL); // Verificar se a variável de ambiente está disponível

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

export default instance;