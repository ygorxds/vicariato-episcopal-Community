<template>
    <div class="dashboard-container">
        <SidebarMenu />
        <div class="content-area">
            <UserHeader />
            <form class="form-container" @submit.prevent="handleSubmit">
                <h2>Editar Mesc</h2>
                <div class="form-row">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" v-model="formData.nome" required>
                </div>
                <div class="form-row">
                    <label for="dataNascimento">Data de Nascimento:</label>
                    <input type="date" id="dataNascimento" v-model="formData.dataNascimento" required>
                </div>
                <div class="form-row">
                    <label for="filiacao">Nome da Mãe:</label>
                    <input type="text" id="mae" v-model="formData.mae">
                </div>
                <div class="form-row">
                    <label for="filiacao">Nome do Pai:</label>
                    <input type="text" id="pai" v-model="formData.pai">
                </div>
                <div class="form-row">
                    <label for="identidade">Identidade:</label>
                    <input type="text" id="identidade" v-model="formData.identidade" required>
                </div>
                <div class="form-row">
                    <label for="orgaoEmissor">Órgão Emissor:</label>
                    <select id="orgaoEmissor" v-model="formData.orgaoEmissor">
                        <option disabled value="">Selecione um órgão</option>
                        <option value="SSP">SSP - Secretaria de Segurança Pública</option>
                        <option value="PF">PF - Polícia Federal</option>
                        <option value="DETRAN">DETRAN - Departamento estadual de transito</option>
                        <option value="DETRAN"></option>
                        <option value="OUTRO"></option>
                    </select>
                </div>
                <div class="form-row">
                    <label for="dataExpedicao">Data de Expedição:</label>
                    <input type="date" id="dataExpedicao" v-model="formData.dataExpedicao" required>
                </div>
                <div class="form-row">
                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" v-model="formData.cpf" @blur="validateCPF">
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
                    <input type="text" id="cep" v-model="formData.cep" @blur="fetchAddress">
                </div>
                <div class="form-row">
                    <label for="naturalidade">Naturalidade:</label>
                    <input type="text" id="naturalidade" v-model="formData.naturalidade" required>
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
                    <input type="text" id="endereco" v-model="formData.endereco" required readonly>
                </div>

                <div class="form-row">
                    <label for="numero">Número:</label>
                    <input type="text" id="numero" v-model="formData.endereco" required readonly>
                </div>
                <div class="form-row">
                    <label for="complemento">Complemento:</label>
                    <input type="text" id="complemento" v-model="formData.endereco" required readonly>
                </div>
                <div class="form-row">
                    <label for="bairro">Bairro:</label>
                    <input type="text" id="bairro" v-model="formData.bairro" required readonly>
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
                    <input type="text" id="profissao" v-model="formData.profissao" required>
                </div>
                <div class="form-row">
                    <label for="telefoneResidencial">Telefone Residencial:</label>
                    <input type="text" id="telefoneResidencial" v-model="formData.telefoneResidencial">
                </div>
                <div class="form-row">
                    <label for="telefoneCelular">Telefone Celular:</label>
                    <input type="text" id="telefoneCelular" v-model="formData.telefoneCelular" required>
                </div>
                <div class="form-row">
                    <label for="email">E-mail:</label>
                    <input type="email" id="email" v-model="formData.email" required>
                </div>
                <div class="form-row">
                    <label for="paroquia">Paróquia que faz parte:</label>
                    <select id="paroquia" v-model="formData.paróquia">
                        <option disabled value="">Selecione uma paróquia</option>
                        <option value="paroquia1">Paróquia São João</option>
                        <option value="paroquia2">Paróquia Santa Maria</option>
                    </select>
                </div>
                <div class="form-row">
                    <label for="movimentosPastorais">Participação em outros movimentos pastorais:</label>
                    <div class="radio-buttons">
                        <input type="radio" id="sim" v-model="formData.movimentosPastorais" value="sim"> Sim
                        <input type="radio" id="nao" v-model="formData.movimentosPastorais" value="nao"> Não
                    </div>
                    <input v-if="formData.movimentosPastorais === 'sim'" type="text" id="quaisMovimentos"
                        v-model="formData.quaisMovimentos" placeholder="Quais movimentos?">
                </div>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SidebarMenu from '../components/SidebarMenu.vue';
import UserHeader from '../components/Header.vue';

export default defineComponent({
    name: 'RegistrationView',
    components: {
        SidebarMenu,
        UserHeader
    },
    setup() {
        const formData = ref({
            nome: '',
            filiacao: '',
            dataNascimento: '',
            naturalidade: '',
            identidade: '',
            mae: '',
            pai: '',
            cpf: '',
            orgaoEmissor: '',
            dataExpedicao: '',
            estadoCivil: '',
            cep: '',
            endereco: '',
            numero: '',
            complemento: '',
            bairro: '',
            paróquia: '',
            escolaridade: '',
            profissão: '',
            telefoneResidencial: '',
            telefoneCelular: '',
            email: '',
            movimentosPastorais: '',
            quaisMovimentos: ''
        });
        const cpfError = ref('');

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
            // Implementar a busca do endereço a partir do CEP dps
        };

        const handleSubmit = () => {
            if (!validateCPF()) {
                alert("Por favor, corrija os erros antes de submeter.");
                return;
            }
            console.log('Dados enviados:', formData.value);
        };

        return {
            formData,
            validateCPF,
            fetchAddress,
            handleSubmit,
            cpfError
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

/* Certifique-se de que o UserHeader esteja sendo renderizado corretamente */
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
    padding-right: 10zpx;
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