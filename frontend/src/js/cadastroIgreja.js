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
    mostrarCarregando()
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
        esconderCarregando()
        if (response.data.detail['id']) {
            alert("Igreja cadastrada com sucesso!!!")
            window.location.replace('pagGerenciamento.html');
        }
    } catch (error) {
        if(error.response.data.detail == "Já existe uma unidade com este nome"){
            alert("Já existe uma igreja com este nome")
            esconderCarregando()
        }
        else{
            alert("Erro na criação da Igreja")
            esconderCarregando()
        }
        console.log(error)
    }
}


function mostrarCarregando() {
    document.querySelector('.carregando').style.visibility = 'visible';
}

function esconderCarregando() {
    document.querySelector('.carregando').style.visibility = 'hidden';
}
