import Membro from "./classeMembros";

/* Função para mascara do telefone */
function formatarTelefone(input) {
    // Remove todos os caracteres não numéricos
    var telefone = input.value.replace(/\D/g, '');

    // Insere os parênteses, espaço e traço nos lugares corretos
    telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');

    // Atualiza o valor do campo de entrada com o telefone formatado
    input.value = telefone;
}

/* Função com API para buscar endereço de acordo com CEP */
function buscaCep(cep) {
    if (cep.length === 8) {
        fetch('https://viacep.com.br/ws/' + cep + '/json/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro de conexão');
                }
                return response.json();
            })
            .then(data => {
                if (data.erro) {
                    alert("CEP inválido! Por favor, verifique e tente novamente.");
                } else {
                    // Preenchendo os campos com os dados retornados
                    logradouro.value = data.logradouro;
                    bairro.value = data.bairro;
                    cidade.value = data.localidade;
                    estado.value = data.uf;
                }
            })
            .catch(error => {
                console.log("Erro:", error);
                alert("Erro ao buscar o CEP. Tente novamente mais tarde.");
            });
    }
    else{
        alert("O cep precisa ter 8 digitos")
    }
}

/* Funções para mostrar ou esconder campo input data de batismo de acordo com a seleção da caixa */

function mostrarData() {
    const campoData = document.getElementById("campoData");campoData.style.display = "block";
}

function esconderData() {
    const campoData = document.getElementById("campoData");campoData.style.display = "none";
    const dataBatismo = document.getElementById("dataBatismo");
    dataBatismo.value = "";
}

//Funções para mostrar ou esconder campo input caixa de cargo de acordo com a seleção da caixa

function mostrarAreaTexto() {
    const campoCargo = document.getElementById("campoCargo");
    campoCargo.style.display = "block";
}

function esconderAreaTexto() {
    const campoCargo = document.getElementById("campoCargo");
    campoCargo.style.display = "none";
    const tipoCargo = document.getElementById("tipoCargo");
    tipoCargo.value = "";
}

/* Função para salvar novo membro */

const membrosArray = [];

function salvarMembro() {
    // Captura os valores do formulário através dos IDs
    const nome = document.getElementById("nome").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const estadoCivil = document.getElementById("estadoCivil").value;
    const contato = document.getElementById("contato").value;
    const escolaridade = document.getElementById("escolaridade").value;
    const instagram = document.getElementById("instagran").value;

    const cep = document.getElementById("cep").value;
    const logradouro = document.getElementById("logradouro").value;
    const numero = document.getElementById("numero").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;

    const dataConversao = document.getElementById("dataConversao").value;

    const batismoRadio = document.querySelector('input[name="batismo"]:checked');
    const batismo = batismoRadio && batismoRadio.value === "sim" ? {
        batizado: true,
        data: document.getElementById("dataBatismo").value
    } : { batizado: false };

    const cargoRadio = document.querySelector('input[name="cargo"]:checked');
    const cargo = cargoRadio && cargoRadio.value === "sim" ? 
        document.getElementById("tipoCargo").value : null;

    // Cria o objeto endereço e dados eclesiásticos
    const endereco = { cep, logradouro, numero, bairro, cidade, estado };
    const dadosEclesiasticos = { dataConversao, batismo, cargo };

    // Cria o objeto Membro
    const membro = new Membro(nome, dataNascimento, estadoCivil, contato, escolaridade, instagram, endereco, dadosEclesiasticos);

    // Adiciona o membro ao array
    membrosArray.push(membro);

    // Exibe uma mensagem de sucesso
    alert("Membro salvo com sucesso!");
    document.getElementById("formCadastro").reset();
    esconderData();
    esconderAreaTexto();
    console.log(membrosArray);
}
