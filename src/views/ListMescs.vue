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
                <button @click="viewMesc(mesc)"><i class="fas fa-eye"></i></button>
                <button @click="editMesc(mesc)"><i class="fas fa-edit"></i></button>
                <button @click="deleteMesc(mesc)"><i class="fas fa-trash-alt"></i></button>
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
import { defineComponent } from 'vue';
import SidebarMenu from '../components/SidebarMenu.vue';
import UserHeader from '../components/Header.vue';
import DateFilter from '../components/DateFilter.vue';
import { jsPDF } from 'jspdf';

interface Mesc {
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
  data() {
    return {
      mescs: [
      { nome: 'Ana Maria Silva', cpf: '123.456.789-01', paroquia: 'N.S de Fátima' },
  { nome: 'José Carlos Souza', cpf: '234.567.890-12', paroquia: 'S.J de Deus' },
  { nome: 'Maria Aparecida', cpf: '345.678.901-23', paroquia: 'N.S de Lourdes' },
  { nome: 'João Pedro Santos', cpf: '456.789.012-34', paroquia: 'S.P de Assis' },
  { nome: 'Paulo Roberto Lima', cpf: '567.890.123-45', paroquia: 'N.S de Nazaré' },
  { nome: 'Clara Beatriz Mendes', cpf: '678.901.234-56', paroquia: 'S.J de Deus' },
  { nome: 'Lucas Henrique Araújo', cpf: '789.012.345-67', paroquia: 'N.S de Lourdes' },
  { nome: 'Juliana Martins', cpf: '890.123.456-78', paroquia: 'N.S de Fátima' },
  { nome: 'Carlos Eduardo Alves', cpf: '901.234.567-89', paroquia: 'N.S de Nazaré' },
  { nome: 'Fernanda Oliveira', cpf: '012.345.678-90', paroquia: 'S.P de Assis' },
  { nome: 'Bruna Silva', cpf: '123.456.789-01', paroquia: 'N.S de Fátima' },
  { nome: 'Renato Gomes', cpf: '234.567.890-12', paroquia: 'S.J de Deus' },
  { nome: 'Camila Pereira', cpf: '345.678.901-23', paroquia: 'N.S de Lourdes' },
  { nome: 'Rafael Costa', cpf: '456.789.012-34', paroquia: 'S.P de Assis' },
  { nome: 'Mariana Rocha', cpf: '567.890.123-45', paroquia: 'N.S de Nazaré' },
  { nome: 'Daniel Ferreira', cpf: '678.901.234-56', paroquia: 'S.J de Deus' },
  { nome: 'Gabriela Castro', cpf: '789.012.345-67', paroquia: 'N.S de Lourdes' },
  { nome: 'Pedro Martins', cpf: '890.123.456-78', paroquia: 'N.S de Fátima' },
  { nome: 'Mateus Nascimento', cpf: '901.234.567-89', paroquia: 'N.S de Nazaré' },
  { nome: 'Larissa Lima', cpf: '012.345.678-90', paroquia: 'S.P de Assis' },
  { nome: 'Bianca Souza', cpf: '123.456.789-01', paroquia: 'N.S de Fátima' },
  { nome: 'Thiago Oliveira', cpf: '234.567.890-12', paroquia: 'S.J de Deus' },
  { nome: 'Fabiana Almeida', cpf: '345.678.901-23', paroquia: 'N.S de Lourdes' },
  { nome: 'Gustavo Pereira', cpf: '456.789.012-34', paroquia: 'S.P de Assis' },
  { nome: 'Vanessa Santos', cpf: '567.890.123-45', paroquia: 'N.S de Nazaré' },
  { nome: 'Bruno Lima', cpf: '678.901.234-56', paroquia: 'S.J de Deus' },
  { nome: 'Marcos Correia', cpf: '789.012.345-67', paroquia: 'N.S de Lourdes' },
  { nome: 'Amanda Vieira', cpf: '890.123.456-78', paroquia: 'N.S de Fátima' },
  { nome: 'Felipe Costa', cpf: '901.234.567-89', paroquia: 'N.S de Nazaré' },
  { nome: 'Aline Fernandes', cpf: '012.345.678-90', paroquia: 'S.P de Assis' },
  { nome: 'Eduardo Silva', cpf: '123.456.789-01', paroquia: 'N.S de Fátima' },
  { nome: 'Jessica Martins', cpf: '234.567.890-12', paroquia: 'S.J de Deus' },
  { nome: 'Henrique Oliveira', cpf: '345.678.901-23', paroquia: 'N.S de Lourdes' },
  { nome: 'Renata Souza', cpf: '456.789.012-34', paroquia: 'S.P de Assis' },
  { nome: 'Fábio Lima', cpf: '567.890.123-45', paroquia: 'N.S de Nazaré' },
  { nome: 'Patrícia Silva', cpf: '678.901.234-56', paroquia: 'S.J de Deus' },
  { nome: 'André Almeida', cpf: '789.012.345-67', paroquia: 'N.S de Lourdes' },
  { nome: 'Carla Pereira', cpf: '890.123.456-78', paroquia: 'N.S de Fátima' },
  { nome: 'Luciana Santos', cpf: '901.234.567-89', paroquia: 'N.S de Nazaré' },
  { nome: 'Roberto Souza', cpf: '012.345.678-90', paroquia: 'S.P de Assis' },
  { nome: 'Sabrina Oliveira', cpf: '123.456.789-01', paroquia: 'N.S de Fátima' },
  { nome: 'Vitor Lima', cpf: '234.567.890-12', paroquia: 'S.J de Deus' },
  { nome: 'Tatiana Almeida', cpf: '345.678.901-23', paroquia: 'N.S de Lourdes' },
  { nome: 'Rodrigo Martins', cpf: '456.789.012-34', paroquia: 'S.P de Assis' },
  { nome: 'Débora Souza', cpf: '567.890.123-45', paroquia: 'N.S de Nazaré' },
  { nome: 'César Oliveira', cpf: '678.901.234-56', paroquia: 'S.J de Deus' },
  { nome: 'Fernanda Lima', cpf: '789.012.345-67', paroquia: 'N.S de Lourdes' },
  { nome: 'Rita Pereira', cpf: '890.123.456-78', paroquia: 'N.S de Fátima' },
  { nome: 'Gilberto Santos', cpf: '901.234.567-89', paroquia: 'N.S de Nazaré' },
  { nome: 'Julio Souza', cpf: '012.345.678-90', paroquia: 'S.P de Assis' },
  { nome: 'Paula Oliveira', cpf: '123.456.789-01', paroquia: 'N.S de Fátima' },
  { nome: 'Ricardo Lima', cpf: '234.567.890-12', paroquia: 'S.J de Deus' },
  { nome: 'Simone Almeida', cpf: '345.678.901-23', paroquia: 'N.S de Lourdes' },
  { nome: 'Guilherme Martins', cpf: '456.789.012-34', paroquia: 'S.P de Assis' },
  { nome: 'Eliane Souza', cpf: '567.890.123-45', paroquia: 'N.S de Nazaré' },
  { nome: 'Antônio Silva', cpf: '678.901.234-56', paroquia: 'S.J de Deus' },
  { nome: 'Rafaela Pereira', cpf: '789.012.345-67', paroquia: 'N.S de Lourdes' },
  { nome: 'Leonardo Santos', cpf: '890.123.456-78', paroquia: 'N.S de Fátima' },
  { nome: 'Monica Oliveira', cpf: '901.234.567-89', paroquia: 'N.S de Nazaré' },
  { nome: 'Cristina Lima', cpf: '012.345.678-90', paroquia: 'S.P de Assis' },
  { nome: 'Marcelo Souza', cpf: '123.456.789-01', paroquia: 'N.S de Fátima' },
  { nome: 'Regina Pereira', cpf: '234.567.890-12', paroquia: 'S.J de Deus' },
  { nome: 'Fabio Almeida', cpf: '345.678.901-23', paroquia: 'N.S de Lourdes' },
  { nome: 'Elaine Martins', cpf: '456.789.012-34', paroquia: 'S.P de Assis' },
  { nome: 'Silvio Souza', cpf: '567.890.123-45', paroquia: 'N.S de Nazaré' },
  { nome: 'Viviane Oliveira', cpf: '678.901.234-56', paroquia: 'S.J de Deus' },
  { nome: 'Cristiano Lima', cpf: '789.012.345-67', paroquia: 'N.S de Lourdes' },
  { nome: 'Lucia Pereira', cpf: '890.123.456-78', paroquia: 'N.S de Fátima' },
  { nome: 'Jorge Santos', cpf: '901.234.567-89', paroquia: 'N.S de Nazaré' },
  { nome: 'Katia Souza', cpf: '012.345.678-90', paroquia: 'S.P de Assis' },
  { nome: 'Fátima Oliveira', cpf: '123.456.789-01', paroquia: 'N.S de Fátima' },
  { nome: 'Luis Lima', cpf: '234.567.890-12', paroquia: 'S.J de Deus' },
  { nome: 'Isabel Almeida', cpf: '345.678.901-23', paroquia: 'N.S de Lourdes' },
  { nome: 'Wilson Martins', cpf: '456.789.012-34', paroquia: 'S.P de Assis' },
  { nome: 'Janaina Souza', cpf: '567.890.123-45', paroquia: 'N.S de Nazaré' },
  { nome: 'Pedro Oliveira', cpf: '678.901.234-56', paroquia: 'S.J de Deus' },
  { nome: 'Tatiana Lima', cpf: '789.012.345-67', paroquia: 'N.S de Lourdes' },
  { nome: 'Paulo Pereira', cpf: '890.123.456-78', paroquia: 'N.S de Fátima' },
  { nome: 'Carolina Santos', cpf: '901.234.567-89', paroquia: 'N.S de Nazaré' },
  { nome: 'Michele Souza', cpf: '012.345.678-90', paroquia: 'S.P de Assis' },
  { nome: 'Anderson Oliveira', cpf: '123.456.789-01', paroquia: 'N.S de Fátima' },
  { nome: 'Roberta Lima', cpf: '234.567.890-12', paroquia: 'S.J de Deus' },
  { nome: 'Wagner Almeida', cpf: '345.678.901-23', paroquia: 'N.S de Lourdes' },
  { nome: 'Jaqueline Martins', cpf: '456.789.012-34', paroquia: 'S.P de Assis' },
  { nome: 'Tatiane Souza', cpf: '567.890.123-45', paroquia: 'N.S de Nazaré' },
  { nome: 'Augusto Oliveira', cpf: '678.901.234-56', paroquia: 'S.J de Deus' },
  { nome: 'Paula Lima', cpf: '789.012.345-67', paroquia: 'N.S de Lourdes' },
  { nome: 'André Pereira', cpf: '890.123.456-78', paroquia: 'N.S de Fátima' },
  { nome: 'Laura Santos', cpf: '901.234.567-89', paroquia: 'N.S de Nazaré' },
  { nome: 'Ricardo Souza', cpf: '012.345.678-90', paroquia: 'S.P de Assis' },
  { nome: 'Patricia Oliveira', cpf: '123.456.789-01', paroquia: 'N.S de Fátima' },
  { nome: 'Marcio Lima', cpf: '234.567.890-12', paroquia: 'S.J de Deus' },
  { nome: 'Alice Almeida', cpf: '345.678.901-23', paroquia: 'N.S de Lourdes' },
  { nome: 'Alessandra Martins', cpf: '456.789.012-34', paroquia: 'S.P de Assis' },
  { nome: 'Flávia Souza', cpf: '567.890.123-45', paroquia: 'N.S de Nazaré' },
  { nome: 'Douglas Oliveira', cpf: '678.901.234-56', paroquia: 'S.J de Deus' },
  { nome: 'Marina Lima', cpf: '789.012.345-67', paroquia: 'N.S de Lourdes' },
  { nome: 'José Pereira', cpf: '890.123.456-78', paroquia: 'N.S de Fátima' },
  { nome: 'Thiago Santos', cpf: '901.234.567-89', paroquia: 'N.S de Nazaré' },
      ] as Mesc[],
    };
  },
  methods: {
    downloadReport() {
      const pdf = new jsPDF();
      pdf.text("Relatório de MESCs", 10, 10);
      this.mescs.forEach((mesc, index) => {
        pdf.text(`${mesc.nome} - ${mesc.cpf} - ${mesc.paroquia}`, 10, 20 + (index * 10));
      });
      pdf.save('Relatório_MESCs.pdf');
    },
    viewMesc(mesc: Mesc) {
      // Lógica para visualizar MESC
      alert(`Visualizar: ${mesc.nome}`);
    },
    editMesc(mesc: Mesc) {
      // Lógica para editar MESC
      alert(`Editar: ${mesc.nome}`);
    },
    deleteMesc(mesc: Mesc) {
      // Lógica para deletar MESC
      alert(`Deletar: ${mesc.nome}`);
    }
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
