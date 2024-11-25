function verificarSessao() {
    if (!sessionStorage.getItem("access_token")) {
        window.location.href = "loginLider.html";
    }
}
window.onload = verificarSessao()

window.onload = gerarListaMembros()

window.onload = gerarListaIgrejas()

function logout() {
    sessionStorage.removeItem("access_token")
    alert("Você foi desconectado!");
    window.location.href = "loginLider.html";
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

        const selectElement = document.getElementById("membro");
        selectElement.innerHTML = '<option value="" disabled selected>Selecione um membro</option>';

        response.data.data.data.forEach((membro) => {
            const option = document.createElement("option");
            option.value = membro.id + "," + membro.unidade_id;
            option.textContent = membro.nome;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar os membros: ", error)
    }
}

async function CadastrarAdministrador() {
    verificarSessao()
    const token = sessionStorage.getItem("access_token");
    const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
    try {
        let membro = document.getElementById("membro").value;
        membro = membro.split(",")[0]
        let unidade = document.getElementById("membro").value;
        unidade = unidade.split(",")[1]
        const senha = document.getElementById("senha").value;
        const tipo = document.getElementById("tipo").value;
        acessoUnidades = "["+unidade+"]"
        const response = await axios.post(
            'https://backend-icb-membership.vercel.app/administrador/',
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
            alert("Administrador cadastrado com sucesso!!!")
            window.location.replace('pagGerenciamento.html');
        }
    } catch (error) {
        if (error.response.data.detail == "Já existe um membro cadastrado para este administrador") {
            alert("Já existe um membro cadastrado para este administrador")
        }
        else {
            alert("Erro na criação do perfil de administrador")
        }
        console.log(error)
    }
}
