<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="content-area">
      <UserHeader />
      <DateFilter />
      <div class="table-container">
        <h1>Lista de Mescs</h1>
        <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>CPF</th>
              <th>Paróquia</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(mesc, index) in mescs" :key="index">
              <td>{{ mesc.nome }}</td>
              <td>{{ mesc.cpf }}</td>
              <td>{{ mesc.paroquia }}</td>
              <td class="actions">
                <button @click="viewMesc(mesc.id)"><i class="fas fa-eye"></i></button>
                <router-link :to="{ name: 'EditMesc', params: { id: mesc.id } }">
                  <button><i class="fas fa-edit"></i></button>
                </router-link>
                <button @click="deleteMesc(mesc.id)"><i class="fas fa-trash-alt"></i></button>
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
import DateFilter from '../components/DateFilter.vue';
import { jsPDF } from 'jspdf';

interface Mesc {
  id: number;
  nome: string;
  cpf: string;
  paroquia: string;
}

export default defineComponent({
  name: 'ListagemMescs',
  components: {
    SidebarMenu,
    UserHeader,
    DateFilter
  },
  setup() {
    const mescs = ref<Mesc[]>([]);
    const router = useRouter();

    const fetchMescs = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você precisa estar logado para visualizar os MESCs.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/mesc/listarTodosOsMescs', {
          headers: {
            'x-access-token': token
          }
        });
        mescs.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar MESCs:', error);
        alert('Erro ao buscar MESCs.');
      }
    };

    const viewMesc = (id: number) => {
      localStorage.setItem('mescId', id.toString());
      router.push({ name: 'SeeMesc' });
    };

    const deleteMesc = async (id: number) => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você precisa estar logado para deletar um MESC.');
        return;
      }

      try {
        await axios.delete(`http://localhost:5000/api/mesc/deletarMesc/${id}`, {
          headers: {
            'x-access-token': token
          }
        });
        mescs.value = mescs.value.filter(mesc => mesc.id !== id);
        alert('MESC deletado com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar MESC:', error);
        alert('Erro ao deletar MESC.');
      }
    };

    const downloadReport = () => {
      const pdf = new jsPDF();
      pdf.text("Relatório de MESCs", 10, 10);
      mescs.value.forEach((mesc, index) => {
        pdf.text(`${mesc.nome} - ${mesc.cpf} - ${mesc.paroquia}`, 10, 20 + (index * 10));
      });
      pdf.save('Relatório_MESCs.pdf');
    };

    onMounted(() => {
      fetchMescs();
    });

    return {
      mescs,
      viewMesc,
      deleteMesc,
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
