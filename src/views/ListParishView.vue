<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="content-area">
      <UserHeader />
      <div class="table-container">
        <h1>Lista de Paróquias</h1>
        <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>RUA</th>
              <th>NÚMERO</th>
              <th>CEP</th>
              <th>COMPLEMENTO</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(paroquia, index) in paroquias" :key="index">
              <td>{{ paroquia.nome }}</td>
              <td>{{ paroquia.rua }}</td>
              <td>{{ paroquia.numero }}</td>
              <td>{{ paroquia.cep }}</td>
              <td>{{ paroquia.complemento }}</td>
              <td class="actions">
                <button @click="viewParoquia(paroquia)"><i class="fas fa-eye"></i></button>
                <router-link :to="{ name: 'EditParish', params: { id: paroquia.id } }">
                  <button><i class="fas fa-edit"></i></button>
                </router-link>
                <button @click="deleteParoquia(paroquia.id)"><i class="fas fa-trash-alt"></i></button>
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

interface Paroquia {
  id: number;
  nome: string;
  rua: string;
  numero: string;
  cep: string;
  complemento: string;
}

export default defineComponent({
  name: 'ListagemParoquias',
  components: {
    SidebarMenu,
    UserHeader
  },
  setup() {
    const paroquias = ref<Paroquia[]>([]);
    const router = useRouter();

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

    const viewParoquia = (paroquia: Paroquia) => {
      localStorage.setItem('paroquiaData', JSON.stringify(paroquia));
      router.push({ name: 'SeeParish', params: { id: paroquia.id } });
    };

    const deleteParoquia = async (id: number) => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você precisa estar logado para deletar uma paróquia.');
        return;
      }

      try {
        await axios.delete(`${process.env.VUE_APP_API_URL}/api/paroquia/deletar/${id}`, {
          headers: {
            'x-access-token': token
          }
        });
        paroquias.value = paroquias.value.filter(paroquia => paroquia.id !== id);
        alert('Paróquia deletada com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar paróquia:', error);
        alert('Erro ao deletar paróquia.');
      }
    };

    const downloadReport = () => {
      const pdf = new jsPDF();
      pdf.text("Relatório de Paróquias", 10, 10);
      paroquias.value.forEach((paroquia, index) => {
        pdf.text(`${paroquia.nome} - ${paroquia.rua} - ${paroquia.numero} - ${paroquia.cep} - ${paroquia.complemento}`, 10, 20 + (index * 10));
      });
      pdf.save('Relatório_Paroquias.pdf');
    };

    onMounted(() => {
      fetchParoquias();
    });

    return {
      paroquias,
      viewParoquia,
      deleteParoquia,
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
