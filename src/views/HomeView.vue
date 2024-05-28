<template>
  <header class="navbar">
    <img src="https://arqrio.org.br/wp-content/uploads/2021/01/logo.png" alt="Logo" class="logo">
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="https://discord.gg/N5v4kCAA">Faça parte da comunidade</a></li>
      <li><a href="https://arqrio.org.br/category/noticias/">Notícias</a></li>
      <li><a href="https://arqrio.org.br/agenda/">Eventos</a></li>
      <li><a href="https://arqrio.org.br/vicariatos/">Vicariatos</a></li>
      <li><a href="https://arqrio.org.br/contatos/">Contatos</a></li>
      <li> <router-link to="/login">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
  </svg>
  Login
</router-link></li>
    </ul>
  </header>

  <body>
      <div class="content-container">
  <div class="text-box">
    <p>Esta aplicação web foi desenvolvida com o objetivo de auxiliar o Vicariato Episcopal na gestão e inscrição dos MESCs, facilitando e otimizando os processos administrativos. Se você é um desenvolvedor e gostaria de contribuir com seu conhecimento, convidamos você a se juntar à nossa comunidade no Discord.</p>
    <button class="participate-button">Participar</button>
  </div>
  <img :src="womanImg" alt="Imagem Descrição" class="side-image">
</div>
  </body>

  <footer class="site-footer">
  Todos os direitos reservados ao ©Vicáriato Epíscopal
  </footer>

</template>

<style scoped>
.navbar {
background-color: #ffffff; /* Fundo branco para melhor visibilidade */
padding: 10px 20px;
width: 100%; /* Estende o navbar para a largura total da tela */
top: 0;
left: 0;
position: fixed;
display: flex;
align-items: center; /* Alinha verticalmente o conteúdo */
box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Adiciona uma sombra para destaque */
z-index: 1000;
}

.logo {
height: 80px; /* Ajuste a altura conforme necessário */
margin-right: 10px; /* Espaço entre o logo e o menu */
}

ul {
list-style: none;
padding: 0;
margin: 0;
display: flex;
align-items: center;
justify-content: center; /* Centraliza os itens do menu */
flex-grow: 1; /* Permite que a lista ocupe o espaço restante */
}

li {
margin: 0 15px; /* Aumenta o espaçamento entre os itens do menu */
}

a {
text-decoration: none;
color: rgb(88, 88, 88); /* Cor mais escura para contraste */
font-weight: bold;
display: flex; /* Alinha o ícone com o texto */
align-items: center; /* Centraliza verticalmente o ícone com o texto */
}

svg {
margin-right: 5px; /* Espaçamento entre o ícone e o texto */
}

.content-container {
display: flex;
justify-content: center;
align-items: center;
padding: 20px;
}

.text-box {
background-color: #8B0000; /* Cor vermelho escuro */
border-radius: 15px; /* Bordas arredondadas */
padding: 20px;
margin-right: 20px; /* Espaçamento entre o texto e a imagem */
min-width: 600px; /* Largura máxima do texto */
color: white; /* Cor do texto */
}

.side-image {
max-width: 400px; /* Largura máxima da imagem */
height: auto; /* Altura automática baseada na largura */
margin-left: 150px;
}

p {
margin: 0; /* Remove a margem padrão do parágrafo */
}

.participate-button {
background-color: #ffffff; /* Fundo branco */
color: #8B0000; /* Texto vermelho escuro */
border: 2px solid #8B0000; /* Borda com a cor do texto */
border-radius: 10px; /* Bordas arredondadas */
padding: 10px 20px; /* Padding interno */
font-weight: bold; /* Negrito para o texto */
cursor: pointer; /* Muda o cursor para indicar clicabilidade */
margin-top: 20px; /* Espaçamento superior para separar do texto */
}

.participate-button:hover {
background-color: #f00c0c; /* Altera o fundo ao passar o mouse */
color: #ffffff; /* Altera a cor do texto ao passar o mouse */
}
.site-footer {
background-color: #8B0000; /* Cor vermelho escuro */
color: white; /* Texto branco */
text-align: center; /* Centraliza o texto */
padding: 10px 0; /* Padding vertical para um bom espaçamento */
width: 100%; /* Largura total */
position: fixed; /* Fixo na parte inferior da página */
bottom: 0; /* Na parte inferior da tela */
left: 0; /* Alinha à esquerda */
font-size: 16px; /* Tamanho do texto */
box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); /* Sombra para separar do conteúdo */
}

</style>

<script setup lang="ts">
import { defineComponent } from 'vue';
import womanImg from "../assets/woman.svg";

 defineComponent({
    name: 'userHomePage'
  });
</script>

