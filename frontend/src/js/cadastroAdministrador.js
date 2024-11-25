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

async function gerarListaMembros() {
    try {
        verificarSessao()
        const token = sessionStorage.getItem("access_token");
        const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
        const response = await axios.get('https://backend-icb-membership.vercel.app/membros', {
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

async function CadastrarAdministrador() {
    verificarSessao()
    const token = sessionStorage.getItem("access_token");
    const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
    try {
        const membro = document.getElementById("membro").value;
        membro = membro.split(",")[0]
        const unidade = document.getElementById("membro").value;
        unidade = unidade.split(",")[1]
        const senha = document.getElementById("senha").value;
        const tipo = document.getElementById("tipo").value;
        const acessoUnidades = document.getElementById("acessoUnidades").value;

        const response = await axios.post(
            'https://backend-icb-membership.vercel.app/unidade/',
            {
                "membro_id": membro,
                "unidade_id": unidade,
                "senha": senha,
                "tipo": tipo,
                "acesso_unidade_id": acessoUnidades
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
