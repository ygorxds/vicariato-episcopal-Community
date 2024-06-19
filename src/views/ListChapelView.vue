<template>
    <div class="dashboard-container">
      <SidebarMenu />
      <div class="content-area">
        <UserHeader />
        <div class="table-container">
          <h1>Lista de Capelas</h1>
          <table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>PARÓQUIA</th>
                <th>RUA</th>
                <th>NÚMERO</th>
                <th>CEP</th>
                <th>COMPLEMENTO</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(capela, index) in capelas" :key="index">
                <td>{{ capela.nome }}</td>
                <td>{{ getParoquiaName(capela.paroqId) }}</td>
                <td>{{ capela.rua }}</td>
                <td>{{ capela.numero }}</td>
                <td>{{ capela.cep }}</td>
                <td>{{ capela.complemento }}</td>
                <td class="actions">
                  <button @click="viewCapela(capela.id)"><i class="fas fa-eye"></i></button>
                  <router-link :to="{ name: 'EditChapel', params: { id: capela.id } }">
                    <button><i class="fas fa-edit"></i></button>
                  </router-link>
                  <button @click="deleteCapela(capela.id)"><i class="fas fa-trash-alt"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="download-report" @click="downloadReport">Baixar Relatório</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import SidebarMenu from '../components/SidebarMenu.vue';
  import UserHeader from '../components/Header.vue';
  import { jsPDF } from 'jspdf';
  
  interface Capela {
    id: number;
    nome: string;
    paroqId: number;
    rua: string;
    numero: string;
    cep: string;
    complemento: string;
  }
  
  interface Paroquia {
    id: number;
    nome: string;
  }
  
  export default defineComponent({
    name: 'ListagemCapelas',
    components: {
      SidebarMenu,
      UserHeader
    },
    setup() {
      const capelas = ref<Capela[]>([]);
      const paroquias = ref<Paroquia[]>([]);
      const router = useRouter();
  
      const fetchCapelas = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Você precisa estar logado para visualizar as capelas.');
          return;
        }
  
        try {
          const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/capela/listar`, {
            headers: {
              'x-access-token': token
            }
          });
          capelas.value = response.data;
        } catch (error) {
          console.error('Erro ao buscar capelas:', error);
          alert('Erro ao buscar capelas.');
        }
      };
  
      const fetchParoquias = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Você precisa estar logado para visualizar as paróquias.');
          return;
        }
  
        try {
          const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/paroquia/listar`, {
            headers: {
              'x-access-token': token
            }
          });
          paroquias.value = response.data;
        } catch (error) {
          console.error('Erro ao buscar paróquias:', error);
          alert('Erro ao buscar paróquias.');
        }
      };
  
      const getParoquiaName = (id: number) => {
        const paroquia = paroquias.value.find(paroquia => paroquia.id === id);
        return paroquia ? paroquia.nome : 'Desconhecida';
      };
  
      const viewCapela = (id: number) => {
        router.push({ name: 'SeeChapel', params: { id } });
      };
  
      const deleteCapela = async (id: number) => {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Você precisa estar logado para deletar uma capela.');
          return;
        }
  
        try {
          await axios.delete(`${process.env.VUE_APP_API_URL}/api/capela/deletar/${id}`, {
            headers: {
              'x-access-token': token
            }
          });
          capelas.value = capelas.value.filter(capela => capela.id !== id);
          alert('Capela deletada com sucesso!');
        } catch (error) {
          console.error('Erro ao deletar capela:', error);
          alert('Erro ao deletar capela.');
        }
      };
  
      const downloadReport = () => {
        const pdf = new jsPDF();
        pdf.text("Relatório de Capelas", 10, 10);
        capelas.value.forEach((capela, index) => {
          pdf.text(`${capela.nome} - ${getParoquiaName(capela.paroqId)} - ${capela.rua} - ${capela.numero} - ${capela.cep} - ${capela.complemento}`, 10, 20 + (index * 10));
        });
        pdf.save('Relatório_Capelas.pdf');
      };
  
      onMounted(() => {
        fetchCapelas();
        fetchParoquias();
      });
  
      return {
        capelas,
        paroquias,
        getParoquiaName,
        viewCapela,
        deleteCapela,
        downloadReport
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
    background-color: rgb(239, 239, 239);
  }
  
  .table-container {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-right: 20px;
    margin-left: 20px;
  }
  
  h1 {
    margin-bottom: 20px;
    text-align: center;
  }
  
  table {
    width: 100%;
    border-collapse: separate;
    text-align: center;
  }
  
  thead {
    background-color: #dcdcdc;
  }
  
  th, td {
    border: 0.1px solid #dcdcdc;
    padding: 8px;
    border-radius: 20px;
  }
  
  th {
    background-color: #f9f9f9;
  }
  
  .actions {
    display: flex;
    justify-content: space-around;
  }
  
  .actions button {
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
  }
  
  .actions button:hover {
    color: #000;
  }
  
  .download-report {
    cursor: pointer;
    margin: 20px auto;
    display: block;
    padding: 10px 20px;
    background-color: #820000;
    color: white;
    border: none;
    border-radius: 5px;
    text-align: center;
  }
  </style>
  