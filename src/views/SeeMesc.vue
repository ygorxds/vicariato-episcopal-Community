<template>
    <div class="dashboard-container">
      <SidebarMenu />
      <div class="content-area">
        <UserHeader />
        <div class="details-container">
          <h2>Detalhes do MESC</h2>
          <div class="details-grid">
            <div class="detail-item">
              <label>Nome:</label>
              <span>{{ mesc.nome }}</span>
            </div>
            <div class="detail-item">
              <label>Data de Nascimento:</label>
              <span>{{ mesc.dataNascimento }}</span>
            </div>
            <div class="detail-item">
              <label>Nome da Mãe:</label>
              <span>{{ mesc.mae }}</span>
            </div>
            <div class="detail-item">
              <label>Nome do Pai:</label>
              <span>{{ mesc.pai }}</span>
            </div>
            <div class="detail-item">
              <label>Identidade:</label>
              <span>{{ mesc.identidade }}</span>
            </div>
            <div class="detail-item">
              <label>Órgão Emissor:</label>
              <span>{{ mesc.orgaoEmissor }}</span>
            </div>
            <div class="detail-item">
              <label>Data de Expedição:</label>
              <span>{{ mesc.dataExpedicao }}</span>
            </div>
            <div class="detail-item">
              <label>CPF:</label>
              <span>{{ mesc.cpf }}</span>
            </div>
            <div class="detail-item">
              <label>Estado Civil:</label>
              <span>{{ mesc.estadoCivil }}</span>
            </div>
            <div class="detail-item">
              <label>CEP:</label>
              <span>{{ mesc.cep }}</span>
            </div>
            <div class="detail-item">
              <label>Naturalidade:</label>
              <span>{{ mesc.naturalidade }}</span>
            </div>
            <div class="detail-item">
              <label>Estado (UF):</label>
              <span>{{ mesc.estado }}</span>
            </div>
            <div class="detail-item">
              <label>Endereço:</label>
              <span>{{ mesc.endereco }}</span>
            </div>
            <div class="detail-item">
              <label>Número:</label>
              <span>{{ mesc.numero }}</span>
            </div>
            <div class="detail-item">
              <label>Complemento:</label>
              <span>{{ mesc.complemento }}</span>
            </div>
            <div class="detail-item">
              <label>Bairro:</label>
              <span>{{ mesc.bairro }}</span>
            </div>
            <div class="detail-item">
              <label>Escolaridade:</label>
              <span>{{ mesc.escolaridade }}</span>
            </div>
            <div class="detail-item">
              <label>Profissão:</label>
              <span>{{ mesc.profissao }}</span>
            </div>
            <div class="detail-item">
              <label>Telefone Residencial:</label>
              <span>{{ mesc.telefoneResidencial }}</span>
            </div>
            <div class="detail-item">
              <label>Telefone Celular:</label>
              <span>{{ mesc.telefoneCelular }}</span>
            </div>
            <div class="detail-item">
              <label>E-mail:</label>
              <span>{{ mesc.email }}</span>
            </div>
            <div class="detail-item">
              <label>Paróquia:</label>
              <span>{{ mesc.paroquia }}</span>
            </div>
            <div class="detail-item">
              <label>Movimentos Pastorais:</label>
              <span>{{ mesc.movimentosPastorais }}</span>
            </div>
            <div v-if="mesc.movimentosPastorais === 'sim'" class="detail-item">
              <label>Quais Movimentos?</label>
              <span>{{ mesc.quaisMovimentos }}</span>
            </div>
          </div>
          <button @click="goBack">Voltar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import SidebarMenu from '../components/SidebarMenu.vue';
  import UserHeader from '../components/Header.vue';
  
  export default defineComponent({
    name: 'MescDetails',
    components: {
      SidebarMenu,
      UserHeader
    },
    setup() {
      const router = useRouter();
      const mesc = ref({
        nome: 'João Silva',
        dataNascimento: '1985-10-15',
        mae: 'Maria Silva',
        pai: 'José Silva',
        identidade: '123456789',
        orgaoEmissor: 'SSP',
        dataExpedicao: '2000-01-15',
        cpf: '123.456.789-10',
        estadoCivil: 'Solteiro',
        cep: '12345-678',
        naturalidade: 'São Paulo',
        estado: 'SP',
        endereco: 'Rua Exemplo, 123',
        numero: '123',
        complemento: 'Apt 1',
        bairro: 'Centro',
        escolaridade: 'Ensino Superior',
        profissao: 'Engenheiro',
        telefoneResidencial: '11 1234-5678',
        telefoneCelular: '11 98765-4321',
        email: 'joao.silva@example.com',
        paroquia: 'Paróquia São João',
        movimentosPastorais: 'sim',
        quaisMovimentos: 'Círculo Bíblico, Grupo de Oração'
      });
  
      const goBack = () => {
        router.back();
      };
  
      return {
        mesc,
        goBack
      };
    }
  });
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    width: 100%;
    min-height: 100vh;
  }
  
  .content-area {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: #dddddd;
  }
  
  .details-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  
  .details-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 15px;
  }
  
  .detail-item {
    display: flex;
    flex-direction: column;
  }
  
  .detail-item label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
  }
  
  .detail-item span {
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  button {
    padding: 10px 20px;
    background-color: #831302;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 20px;
    display: block;
    width: 100%;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
  }
  
  button:hover {
    background-color: #e61010;
  }
  </style>
  