<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="content-area">
      <UserHeader />
      <form class="form-container" @submit.prevent="handleSubmit">
        <h2>Editar MESC</h2>
        <div class="form-row">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" v-model="formData.nome" required>
          <span v-if="errors.nome" class="error">{{ errors.nome }}</span>
        </div>
        <div class="form-row">
          <label for="dataNascimento">Data de Nascimento:</label>
          <input type="date" id="dataNascimento" v-model="formData.dataNascimento" required>
          <span v-if="errors.dataNascimento" class="error">{{ errors.dataNascimento }}</span>
        </div>
        <div class="form-row">
          <label for="mae">Nome da Mãe:</label>
          <input type="text" id="mae" v-model="formData.mae">
          <span v-if="errors.mae" class="error">{{ errors.mae }}</span>
        </div>
        <div class="form-row">
          <label for="pai">Nome do Pai:</label>
          <input type="text" id="pai" v-model="formData.pai">
          <span v-if="errors.pai" class="error">{{ errors.pai }}</span>
        </div>
        <div class="form-row">
          <label for="identidade">Identidade:</label>
          <input type="text" id="identidade" v-model="formData.identidade" required>
          <span v-if="errors.identidade" class="error">{{ errors.identidade }}</span>
        </div>
        <div class="form-row">
          <label for="orgaoEmissor">Órgão Emissor:</label>
          <select id="orgaoEmissor" v-model="formData.orgaoEmissor">
            <option disabled value="">Selecione um órgão</option>
            <option value="SSP">SSP - Secretaria de Segurança Pública</option>
            <option value="PF">PF - Polícia Federal</option>
            <option value="DETRAN">DETRAN - Departamento Estadual de Trânsito</option>
            <option value="OUTRO">Outro</option>
          </select>
          <span v-if="errors.orgaoEmissor" class="error">{{ errors.orgaoEmissor }}</span>
        </div>
        <div class="form-row">
          <label for="dataExpedicao">Data de Expedição:</label>
          <input type="date" id="dataExpedicao" v-model="formData.dataExpedicao" required>
          <span v-if="errors.dataExpedicao" class="error">{{ errors.dataExpedicao }}</span>
        </div>
        <div class="form-row">
          <label for="cpf">CPF:</label>
          <input type="text" id="cpf" v-model="formData.cpf" @blur="validateCPF" @input="formatCPF">
          <span v-if="cpfError" class="error">{{ cpfError }}</span>
          <span v-if="errors.cpf" class="error">{{ errors.cpf }}</span>
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
          <span v-if="errors.estadoCivil" class="error">{{ errors.estadoCivil }}</span>
        </div>
        <div class="form-row">
          <label for="cep">CEP:</label>
          <input type="text" id="cep" v-model="formData.cep" @blur="fetchAddress">
          <span v-if="errors.cep" class="error">{{ errors.cep }}</span>
        </div>
        <div class="form-row">
          <label for="naturalidade">Naturalidade:</label>
          <input type="text" id="naturalidade" v-model="formData.naturalidade" required>
          <span v-if="errors.naturalidade" class="error">{{ errors.naturalidade }}</span>
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
          <span v-if="errors.estado" class="error">{{ errors.estado }}</span>
        </div>
        <div class="form-row">
          <label for="endereco">Endereço:</label>
          <input type="text" id="endereco" v-model="formData.endereco" required>
          <span v-if="errors.endereco" class="error">{{ errors.endereco }}</span>
        </div>
        <div class="form-row">
          <label for="numero">Número:</label>
          <input type="text" id="numero" v-model="formData.numero" required>
          <span v-if="errors.numero" class="error">{{ errors.numero }}</span>
        </div>
        <div class="form-row">
          <label for="complemento">Complemento:</label>
          <input type="text" id="complemento" v-model="formData.complemento">
          <span v-if="errors.complemento" class="error">{{ errors.complemento }}</span>
        </div>
        <div class="form-row">
          <label for="bairro">Bairro:</label>
          <input type="text" id="bairro" v-model="formData.bairro" required>
          <span v-if="errors.bairro" class="error">{{ errors.bairro }}</span>
        </div>
        <div class="form-row">
          <label for="escolaridade">Escolaridade:</label>
          <select id="escolaridade" v-model="formData.escolaridade">
            <option disabled value="">Selecione a escolaridade</option>
            <option value="fundamental">Ensino Fundamental</option>
            <option value="medio">Ensino Médio</option>
            <option value="superior">Ensino Superior</option>
          </select>
          <span v-if="errors.escolaridade" class="error">{{ errors.escolaridade }}</span>
        </div>
        <div class="form-row">
          <label for="profissao">Profissão:</label>
          <input type="text" id="profissao" v-model="formData.profissao" required>
          <span v-if="errors.profissao" class="error">{{ errors.profissao }}</span>
        </div>
        <div class="form-row">
          <label for="telefoneResidencial">Telefone Residencial:</label>
          <input type="text" id="telefoneResidencial" v-model="formData.telefoneResidencial">
          <span v-if="errors.telefoneResidencial" class="error">{{ errors.telefoneResidencial }}</span>
        </div>
        <div class="form-row">
          <label for="telefoneCelular">Telefone Celular:</label>
          <input type="text" id="telefoneCelular" v-model="formData.telefoneCelular" required>
          <span v-if="errors.telefoneCelular" class="error">{{ errors.telefoneCelular }}</span>
        </div>
        <div class="form-row">
          <label for="email">E-mail:</label>
          <input type="email" id="email" v-model="formData.email" required>
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>
        <div class="form-row">
          <label for="paroquia">Paróquia que faz parte:</label>
          <select id="paroquia" v-model="formData.paroqId" @change="filterCapelas" required>
            <option disabled value="">Selecione uma paróquia</option>
            <option v-for="paroquia in paroquias" :key="paroquia.id" :value="paroquia.id">
              {{ paroquia.nome }}
            </option>
          </select>
          <span v-if="errors.paroqId" class="error">{{ errors.paroqId }}</span>
        </div>
        <div class="form-row" v-if="filteredCapelas.length > 0">
          <label for="capela">Capela:</label>
          <select id="capela" v-model="formData.capelId">
            <option v-for="capela in filteredCapelas" :key="capela.id" :value="capela.id">
              {{ capela.nome }}
            </option>
          </select>
          <span v-if="errors.capelId" class="error">{{ errors.capelId }}</span>
        </div>
        <div class="form-row">
          <label for="movimentosPastorais">Participação em outros movimentos pastorais:</label>
          <div class="radio-buttons">
            <input type="radio" id="sim" v-model="formData.movimentosPastorais" value="sim"> Sim
            <input type="radio" id="nao" v-model="formData.movimentosPastorais" value="nao"> Não
          </div>
          <input v-if="formData.movimentosPastorais === 'sim'" type="text" id="quaisMovimentos"
            v-model="formData.quaisMovimentos" placeholder="Quais movimentos?">
          <span v-if="errors.movimentosPastorais" class="error">{{ errors.movimentosPastorais }}</span>
          <span v-if="errors.quaisMovimentos" class="error">{{ errors.quaisMovimentos }}</span>
        </div>
        <button type="submit">Atualizar</button>
        <div v-if="submitError" class="submit-error">{{ submitError }}</div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import SidebarMenu from '../components/SidebarMenu.vue';
import UserHeader from '../components/Header.vue';

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
  name: 'EditMesc',
  components: {
    SidebarMenu,
    UserHeader
  },
  setup() {
    const router = useRouter();
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
      paroqId: '',
      capelId: '',
      escolaridade: '',
      profissao: '',
      telefoneResidencial: '',
      telefoneCelular: '',
      email: '',
      movimentosPastorais: '',
      quaisMovimentos: ''
    });
    const cpfError = ref('');
    const errors = ref<any>({});
    const submitError = ref<string>('');
    const paroquias = ref<Paroquia[]>([]);
    const capelas = ref<Capela[]>([]);
    const filteredCapelas = ref<Capela[]>([]);

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
      for (let i = 1; i <= 9; i++) soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;

      if ((resto === 10) || (resto === 11)) resto = 0;
      if (resto !== parseInt(strCPF.substring(10, 11))) {
        cpfError.value = "CPF inválido";
        return false;
      }

      cpfError.value = '';
      return true;
    };

    const formatCPF = () => {
      let cpf = formData.value.cpf.replace(/[^\d]/g, '');
      if (cpf.length > 3) cpf = cpf.slice(0, 3) + '.' + cpf.slice(3);
      if (cpf.length > 7) cpf = cpf.slice(0, 7) + '.' + cpf.slice(7);
      if (cpf.length > 11) cpf = cpf.slice(0, 11) + '-' + cpf.slice(11);
      formData.value.cpf = cpf;
    };

    const fetchAddress = () => {
      // Implementar a busca do endereço a partir do CEP depois
    };

    const validateForm = () => {
      errors.value = {};
      if (!formData.value.nome) errors.value.nome = 'Nome é obrigatório';
      if (!formData.value.dataNascimento) errors.value.dataNascimento = 'Data de Nascimento é obrigatória';
      if (!formData.value.identidade) errors.value.identidade = 'Identidade é obrigatória';
      if (!formData.value.orgaoEmissor) errors.value.orgaoEmissor = 'Órgão Emissor é obrigatório';
      if (!formData.value.dataExpedicao) errors.value.dataExpedicao = 'Data de Expedição é obrigatória';
      if (!formData.value.cpf) errors.value.cpf = 'CPF é obrigatório';
      if (!validateCPF()) errors.value.cpf = 'CPF inválido';
      if (!formData.value.estadoCivil) errors.value.estadoCivil = 'Estado Civil é obrigatório';
      if (!formData.value.cep) errors.value.cep = 'CEP é obrigatório';
      if (!formData.value.naturalidade) errors.value.naturalidade = 'Naturalidade é obrigatória';
      if (!formData.value.estado) errors.value.estado = 'Estado é obrigatório';
      if (!formData.value.endereco) errors.value.endereco = 'Endereço é obrigatório';
      if (!formData.value.numero) errors.value.numero = 'Número é obrigatório';
      if (!formData.value.bairro) errors.value.bairro = 'Bairro é obrigatório';
      if (!formData.value.escolaridade) errors.value.escolaridade = 'Escolaridade é obrigatória';
      if (!formData.value.profissao) errors.value.profissao = 'Profissão é obrigatória';
      if (!formData.value.telefoneCelular) errors.value.telefoneCelular = 'Telefone celular é obrigatório';
      if (!formData.value.email) errors.value.email = 'E-mail é obrigatório';
      if (!formData.value.paroqId) errors.value.paroqId = 'Paróquia é obrigatória';
      if (!formData.value.capelId) errors.value.capelId = 'Capela é obrigatória';

      return Object.keys(errors.value).length === 0;
    };

    const handleSubmit = async () => {
      if (!validateForm()) {
        return;
      }
      try {
        const mescId = localStorage.getItem('mescId');
        const updateData = { ...formData.value };

        await axios.put(`${process.env.VUE_APP_API_URL}/api/mesc/editarMesc/${mescId}`, updateData, {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        });
        alert("Dados atualizados com sucesso!");
        router.push('/see-mesc');
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          submitError.value = 'Erro ao atualizar MESC: ' + (error.response.data?.msg || error.message);
        } else {
          submitError.value = 'Erro ao atualizar MESC: ' + (error as Error).message;
        }
      }
    };

    const fetchMescData = async () => {
      const mescId = localStorage.getItem('mescId');
      if (mescId) {
        try {
          const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/mesc/verDadosDoMesc/${mescId}`, {
            headers: {
              'x-access-token': localStorage.getItem('token')
            }
          });
          formData.value = response.data;
          await fetchParoquias();
          await fetchCapelas();
          filterCapelas();
        } catch (error) {
          console.error("Erro ao buscar dados do MESC:", error);
          alert("Erro ao buscar dados do MESC.");
        }
      } else {
        console.warn("Nenhum ID de MESC encontrado no localStorage.");
      }
    };

    const fetchParoquias = async () => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/paroquia/listar`);
        paroquias.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar paróquias:', error);
      }
    };

    const fetchCapelas = async () => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/capela/listar`);
        capelas.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar capelas:', error);
      }
    };

    const filterCapelas = () => {
      filteredCapelas.value = capelas.value.filter((capela: Capela) => capela.paroqId === formData.value.paroqId);
    };

    onMounted(() => {
      fetchMescData();
    });

    return {
      formData,
      validateCPF,
      formatCPF,
      fetchAddress,
      handleSubmit,
      cpfError,
      errors,
      submitError,
      paroquias,
      capelas,
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

.user-header {
  width: 100%;
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.submit-error {
  color: #ff0000;
  text-align: center;
  margin-top: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
