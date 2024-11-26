/* Função para mascara do telefone */
function formatarTelefone(input) {
    // Remove todos os caracteres não numéricos
    var telefone = input.value.replace(/\D/g, '');

    // Insere os parênteses, espaço e traço nos lugares corretos
    telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');

    // Atualiza o valor do campo de entrada com o telefone formatado
    input.value = telefone;
}

window.onload = gerarListaIgrejas()

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
                alert("Erro ao buscar o CEP. Digite somente números");
            });
    }
    else {
        alert("O cep precisa ter 8 digitos")
    }
}

/* Funções para mostrar ou esconder campo input data de batismo de acordo com a seleção da caixa */

function mostrarData() {
    const campoData = document.getElementById("campoData"); campoData.style.display = "block";
}

function esconderData() {
    const campoData = document.getElementById("campoData"); campoData.style.display = "none";
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

async function gerarListaIgrejas() {
    try {
        const token = sessionStorage.getItem("access_token");
        const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
        const response = await axios.get('https://backend-icb-membership.vercel.app/unidades')

        const selectElement = document.getElementById("igreja");
        selectElement.innerHTML = '<option value="" disabled selected>Selecione uma igreja</option>';

        response.data.data.forEach((unidade) => {
            const option = document.createElement("option");
            option.value = unidade.id;
            option.textContent = unidade.nome;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar igrejas: ", error)
    }
}

async function CadastrarMembroPublico() {
    const token = sessionStorage.getItem("access_token");
    const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
    try {
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const dataNascimento = document.getElementById("dataNascimento").value;
        const estadoCivil = document.getElementById("estadoCivil").value;
        const unidade_id = document.getElementById("igreja").value;
        const contato = document.getElementById("contato").value;
        const profissao = document.getElementById("profissao").value;
        const cep = document.getElementById("cep").value;
        const endereco = document.getElementById("logradouro").value;
        const numero = document.getElementById("numero").value;
        const bairro = document.getElementById("bairro").value;
        const cidade = document.getElementById("cidade").value;
        const estado = document.getElementById("estado").value;
        const batismoRadio = document.querySelector('input[name="batismo"]:checked');
        const batismo = batismoRadio.value
        const sexoRadio = document.querySelector('input[name="sexo"]:checked');
        const sexo = sexoRadio.value
        const posicao = "Membro"

        const response = await axios.post(
            'https://backend-icb-membership.vercel.app/membro_formulario/',
            {
                "nome": nome,
                "email": email,
                "data_nascimento": dataNascimento,
                "sexo": sexo,
                "unidade_id": unidade_id,
                "posicao": posicao,
                "endereco": endereco,
                "bairro": bairro,
                "estado_civil": estadoCivil,
                "telefone": contato,
                "cep": cep,
                "estado": estado,
                "cidade": cidade,
                "numero": numero,
                "profissao": profissao,
                "batismo": batismo
            }
        );
        if (response.data.detail['id']) {
            alert("Membro cadastrado com sucesso!!!")
            location.reload()
        }
    } catch (error) {
        if (error.response.data.detail == "Já existe um membro com este email") {
            alert("Já existe um membro com este email")
        }
        else {
            alert("Erro na criação do Membro")
        }
        console.log(error)
    }
}
