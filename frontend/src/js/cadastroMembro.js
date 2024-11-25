function verificarSessao() {
    if (!sessionStorage.getItem("access_token")) {
        window.location.href = "loginLider.html";
    }
}
window.onload = verificarSessao()

function logout() {
    sessionStorage.removeItem("access_token")
    alert("Você foi desconectado!");
    window.location.href = "loginLider.html";
}

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
                alert("Erro ao buscar o CEP. Tente novamente mais tarde.");
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
        verificarSessao()
        const token = sessionStorage.getItem("access_token");
        const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
        const response = await axios.get('https://backend-icb-membership.vercel.app/unidades', {
            headers: {
                'Authorization': `Bearer ${formattedToken}`,
            },
        })

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

async function CadastrarMembro() {
    verificarSessao()
    const token = sessionStorage.getItem("access_token");
    const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
    try {
        alert(formattedToken)
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
            'https://backend-icb-membership.vercel.app/membro/',
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
            },
            {
                headers: {
                    'Authorization': `Bearer ${formattedToken}`,
                },
            }
        );
        if (response.data.detail['id']) {
            alert("Membro cadastrado com sucesso!!!")
            window.location.replace('pagGerenciamento.html');
        }
    } catch (error) {
        alert("Erro na criação do Membro")
        console.log(error)
    }
}


/* Função para salvar novo membro */
/*
class Membro {
    constructor(nome, dataNascimento, estadoCivil, contato, escolaridade, instagram, endereco, dadosEclesiasticos) {
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.estadoCivil = estadoCivil;
        this.contato = contato;
        this.escolaridade = escolaridade;
        this.instagram = instagram;
        this.endereco = endereco;
        this.dadosEclesiasticos = dadosEclesiasticos;
    }
}
const membrosArray = [];

function salvarMembro(event) {
    event.preventDefault();

    // Captura os valores do formulário através dos IDs
    const nome = document.getElementById("nome").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const estadoCivil = document.getElementById("estadoCivil").value;
    const contato = document.getElementById("contato").value;
    const escolaridade = document.getElementById("escolaridade").value;
    const instagram = document.getElementById("instagram").value;

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
    listaTabela();
    alert("Membro salvo com sucesso!");
    document.getElementById("formCadastro").reset();
    esconderData();
    esconderAreaTexto();
    console.log(membrosArray);

}*/
// export { membrosArray };