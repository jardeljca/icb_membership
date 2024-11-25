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

async function CadastrarIgreja() {
    verificarSessao()
    const token = sessionStorage.getItem("access_token");
    const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
    try {
        const nome = document.getElementById("nome").value;
        const cep = document.getElementById("cep").value;
        const endereco = document.getElementById("logradouro").value;
        const bairro = document.getElementById("bairro").value;
        const cidade = document.getElementById("cidade").value;
        const estado = document.getElementById("estado").value;

        const response = await axios.post(
            'https://backend-icb-membership.vercel.app/unidade/',
            {
                "nome": nome,
                "endereco": endereco,
                "bairro": bairro,
                "cep": cep,
                "estado": estado,
                "cidade": cidade
            },
            {
                headers: {
                    'Authorization': `Bearer ${formattedToken}`,
                },
            }
        );
        if (response.data.detail['id']) {
            alert("Igreja cadastrada com sucesso!!!")
            window.location.replace('pagGerenciamento.html');
        }
    } catch (error) {
        if(error.response.data.detail == "Já existe uma unidade com este nome"){
            alert("Já existe uma igreja com este nome")
        }
        else{
            alert("Erro na criação da Igreja")
        }
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