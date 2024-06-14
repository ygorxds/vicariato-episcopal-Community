<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="content-area">
      <UserHeader />
      <form class="form-container" @submit.prevent="handleSubmit">
        <h2>Formulário de Cadastro</h2>
        <div class="form-row">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" v-model="formData.nome" required />
        </div>
        <div class="form-row">
          <label for="dataNascimento">Data de Nascimento:</label>
          <input type="date" id="dataNascimento" v-model="formData.dataNascimento" required />
        </div>
        <div class="form-row">
          <label for="mae">Nome da Mãe:</label>
          <input type="text" id="mae" v-model="formData.mae" />
        </div>
        <div class="form-row">
          <label for="pai">Nome do Pai:</label>
          <input type="text" id="pai" v-model="formData.pai" />
        </div>
        <div class="form-row">
          <label for="identidade">Identidade:</label>
          <input type="text" id="identidade" v-model="formData.identidade" required />
        </div>
        <div class="form-row">
          <label for="orgaoEmissor">Órgão Emissor:</label>
          <select id="orgaoEmissor" v-model="formData.orgaoEmissor">
            <option disabled value="">Selecione um órgão</option>
            <option value="SSP">SSP - Secretaria de Segurança Pública</option>
            <option value="PF">PF - Polícia Federal</option>
            <option value="DETRAN">DETRAN - Departamento estadual de transito</option>
            <option value="OUTRO">OUTRO</option>
          </select>
        </div>
        <div class="form-row">
          <label for="dataExpedicao">Data de Expedição:</label>
          <input type="date" id="dataExpedicao" v-model="formData.dataExpedicao" required />
        </div>
        <div class="form-row">
          <label for="cpf">CPF:</label>
          <input type="text" id="cpf" v-model="formData.cpf" @blur="validateCPF" />
          <span v-if="cpfError" class="error">{{ cpfError }}</span>
        </div>
        <div class="form-row">
          <label for="estadoCivil">Estado Civil:</label>
          <select id="estadoCivil" v-model="formData.estadoCivil">
            <option disabled value="">Selecione o estado civil</option>
            <option value="solteiro">Solteiro(a)</option>
            <option value="casado">Casado(a)</option>
            <option value="divorciado">Divorciado(a)</option>
            <option value="viuvo">Viúvo(a)</option>
          </select>
        </div>
        <div class="form-row">
          <label for="cep">CEP:</label>
          <input type="text" id="cep" v-model="formData.cep" @blur="fetchAddress" />
        </div>
        <div class="form-row">
          <label for="naturalidade">Naturalidade:</label>
          <input type="text" id="naturalidade" v-model="formData.naturalidade" required />
        </div>
        <div class="form-row">
          <label for="estado">Estado (UF):</label>
          <select id="estado" v-model="formData.estado">
            <option disabled value="">Selecione o estado</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
        </div>
        <div class="form-row">
          <label for="endereco">Endereço:</label>
          <input type="text" id="endereco" v-model="formData.endereco" required />
        </div>
        <div class="form-row">
          <label for="numero">Número:</label>
          <input type="text" id="numero" v-model="formData.numero" required />
        </div>
        <div class="form-row">
          <label for="complemento">Complemento:</label>
          <input type="text" id="complemento" v-model="formData.complemento" />
        </div>
        <div class="form-row">
          <label for="bairro">Bairro:</label>
          <input type="text" id="bairro" v-model="formData.bairro" required />
        </div>
        <div class="form-row">
          <label for="escolaridade">Escolaridade:</label>
          <select id="escolaridade" v-model="formData.escolaridade">
            <option disabled value="">Selecione a escolaridade</option>
            <option value="fundamental">Ensino Fundamental</option>
            <option value="medio">Ensino Médio</option>
            <option value="superior">Ensino Superior</option>
          </select>
        </div>
        <div class="form-row">
          <label for="profissao">Profissão:</label>
          <input type="text" id="profissao" v-model="formData.profissao" required />
        </div>
        <div class="form-row">
          <label for="telefoneResidencial">Telefone Residencial:</label>
          <input type="text" id="telefoneResidencial" v-model="formData.telefoneResidencial" />
        </div>
        <div class="form-row">
          <label for="telefoneCelular">Telefone Celular:</label>
          <input type="text" id="telefoneCelular" v-model="formData.telefoneCelular" required />
        </div>
        <div class="form-row">
          <label for="email">E-mail:</label>
          <input type="email" id="email" v-model="formData.email" required />
        </div>
        <div class="form-row">
          <label for="paroquia">Paróquia que faz parte:</label>
          <select id="paroquia" v-model="selectedParoquiaId" @change="filterCapelas" required>
            <option disabled value="">Selecione uma paróquia</option>
            <option v-for="paroquia in paroquias" :key="paroquia.id" :value="paroquia.id">
              {{ paroquia.nome }}
            </option>
          </select>
        </div>
        <div class="form-row" v-if="filteredCapelas.length > 0">
          <label for="capela">Capela:</label>
          <select id="capela" v-model="formData.capelId">
            <option v-for="capela in filteredCapelas" :key="capela.id" :value="capela.id">
              {{ capela.nome }}
            </option>
          </select>
        </div>
        <div class="form-row">
          <label for="movimentosPastorais">Participação em outros movimentos pastorais:</label>
          <div class="radio-buttons">
            <input type="radio" id="sim" v-model="formData.movimentosPastorais" value="sim"> Sim
            <input type="radio" id="nao" v-model="formData.movimentosPastorais" value="nao"> Não
          </div>
          <input v-if="formData.movimentosPastorais === 'sim'" type="text" id="quaisMovimentos"
            v-model="formData.quaisMovimentos" placeholder="Quais movimentos?" />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import SidebarMenu from '../components/SidebarMenu.vue';
import UserHeader from '../components/Header.vue';
import { useRouter } from 'vue-router';

interface Paroquia {
  id: string;
  nome: string;
}

interface Capela {
  id: string;
  nome: string;
  paroqId: string;
}

export default defineComponent({
  name: 'RegistrationView',
  components: {
    SidebarMenu,
    UserHeader
  },
  setup() {
    const formData = ref({
      nome: '',
      dataNascimento: '',
      mae: '',
      pai: '',
      identidade: '',
      orgaoEmissor: '',
      dataExpedicao: '',
      cpf: '',
      estadoCivil: '',
      cep: '',
      naturalidade: '',
      estado: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      escolaridade: '',
      profissao: '',
      telefoneResidencial: '',
      telefoneCelular: '',
      email: '',
      paróquia: '',
      movimentosPastorais: '',
      quaisMovimentos: '',
      paroqId: '', // Altere para parocId
      capelId: '' // Altere para capelId
    });
    const cpfError = ref('');
    const router = useRouter();
    const paroquias = ref<Paroquia[]>([]);
    const capelas = ref<Capela[]>([]);
    const selectedParoquiaId = ref<string>('');
    const filteredCapelas = ref<Capela[]>([]);

    const fetchParoquias = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/paroquia/listar');
        paroquias.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar paróquias:', error);
      }
    };

    const fetchCapelas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/capela/listar');
        capelas.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar capelas:', error);
      }
    };

    const filterCapelas = () => {
      filteredCapelas.value = capelas.value.filter((capela: Capela) => capela.paroqId === selectedParoquiaId.value);
    };

    onMounted(() => {
      fetchParoquias();
      fetchCapelas();
    });

    const validateCPF = () => {
      const strCPF = formData.value.cpf.replace(/[^\d]/g, "");
      let soma = 0;
      let resto;
      if (strCPF === "00000000000" || strCPF.length !== 11) {
        cpfError.value = "CPF inválido";
        return false;
      }

      for (let i = 1; i <= 9; i++) soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;

      if ((resto === 10) || (resto === 11)) resto = 0;
      if (resto !== parseInt(strCPF.substring(9, 10))) {
        cpfError.value = "CPF inválido";
        return false;
      }

      soma = 0;
      for (let i = 1; i <= 10; i++) soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;

      if ((resto === 10) || (resto === 11)) resto = 0;
      if (resto !== parseInt(strCPF.substring(10, 11))) {
        cpfError.value = "CPF inválido";
        return false;
      }

      cpfError.value = '';
      return true;
    };

    const fetchAddress = () => {
      // Implementar a busca do endereço a partir do CEP depois
    };

    const handleSubmit = async () => {
      if (!validateCPF()) {
        alert("Por favor, corrija os erros antes de submeter.");
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você precisa estar logado para enviar o formulário.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:5000/api/mesc/criarMesc', formData.value, {
          headers: {
            'x-access-token': token
          }
        });
        console.log('Dados enviados:', response.data);
        alert('MESC registrado com sucesso!');
        router.push('/list-mesc'); // Redireciona para o dashboard após o cadastro
      } catch (error) {
        alert('Mesc não foi registrado');
      }
    };

    return {
      formData,
      validateCPF,
      fetchAddress,
      handleSubmit,
      cpfError,
      paroquias,
      capelas,
      selectedParoquiaId,
      filteredCapelas,
      filterCapelas
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
  padding: 0px;
  background-color: #dddddd;
}

.form-container {
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 15px;
}

.form-row label {
  width: 200px;
  min-width: 120px;
  padding-right: 10px;
}

.form-row input,
.form-row select {
  flex: 1 1 180px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-row .radio-buttons {
  display: flex;
  align-items: center;
}

.form-row .radio-buttons input {
  margin-right: 5px;
}

button {
  padding: 10px 20px;
  background-color: #831302;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e61010;
}

.error {
  color: #ff0000;
  font-size: 0.9rem;
  margin-left: 10px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
