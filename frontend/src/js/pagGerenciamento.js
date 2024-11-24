/* Funções que controlarão login e logout */

function verificarSessao() {
    if (!sessionStorage.getItem("access_token")) {
        window.location.href = "loginLider.html";
    }
}

window.onload = verificarSessao()

window.onload = getMembrosPaginado(0, 9)

window.onload = function () {
    gerarPaginacao()
}

window.onpopstate = function () {
    logout();
};

function logout() {
    sessionStorage.removeItem("access_token")
    alert("Você foi desconectado!");
    window.location.href = "loginLider.html";
}

async function deletarMembro(id) {
    try {
        const token = sessionStorage.getItem("access_token");
        const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
        const response = await axios.delete(`https://backend-icb-membership.vercel.app/membro/${id}`, {
            headers: {
                'Authorization': `Bearer ${formattedToken}`,
            },
        });
        if (response.data) {
            alert("Membro deletado com sucesso")
            location.reload()
        }
    } catch (error){
        alert("Erro na exclusão do Membro")
        console.error(error.response.data);
        location.reload()
    }
    
    
}

async function gerarPaginacao() {
    try {
        verificarSessao()
        const token = sessionStorage.getItem("access_token");
        const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
        const response = await axios.get('https://backend-icb-membership.vercel.app/membros', {
            headers: {
                'Authorization': `Bearer ${formattedToken}`,
            },
        })
        const membros = response.data.data
        const totalMembros = membros.length
        const quantidadePagina = Math.ceil(totalMembros / 10)
        let contador = 0
        const divPaginacao = document.getElementById('paginacao')
        divPaginacao.innerHTML = ''
        for (let index = 0; contador < quantidadePagina; index += 10) {
            contador = contador + 1
            let inicio = index
            let fim = inicio + 9

            const li = document.createElement('li')
            li.className = 'page-item'
            const a = document.createElement('a')
            a.className = 'page-link'
            a.href = '#'
            a.textContent = contador
            a.setAttribute('onclick', 'getUsersPaginado(' + inicio + ', ' + fim + ')')
            li.appendChild(a)
            divPaginacao.appendChild(li)
        }
    } catch (error) {
        console.error('Erro ao tentar acessar a lista de membros', error)
    }
}

async function getMembrosPaginado(inicio, fim) {
    try {
        verificarSessao()
        const token = sessionStorage.getItem("access_token");
        const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
        const response = await axios.get(`https://backend-icb-membership.vercel.app/membros/filtro?inicio=${inicio}&fim=${fim}`, {
            headers: {
                'Authorization': `Bearer ${formattedToken}`,
            },
        });
        const membros = response.data.data
        const tableMembros = document.getElementById('bodyTableMembros')
        tableMembros.innerHTML = ''

        membros.forEach(membro => {
            const row = document.createElement('tr')
            row.innerHTML = `
                <td style='color: #FFFFFF; text-align: center;'>${membro.nome}</td>
                <td style='color: #FFFFFF; text-align: center;'>${membro.unidade}</td>
                <td class="colunaAcoes">
                    <a type='button' class='acaoNome' onclick="visualizarMembro('${membro.id}')">
                        <img src="/frontend/public/imagens/ver.png" alt="Ícone ver" class="icone">
                        <span class='texto'>Ver</span>
                    </a>
                    <a type='button' class='acaoNome' onclick="editarMembro('${membro.id}')">
                        <img src="/frontend/public/imagens/editar.png" alt="Ícone Editar" class="icone">
                        <span class='texto'>Editar</span>
                    </a>
                    <a type='button' class='acaoNome' onclick="deletarMembro('${membro.id}')">
                        <img src="/frontend/public/imagens/excluir.png" alt="Ícone Excluir" class="icone">
                        <span class='texto'>Excluir</span>
                    </a>
                </td>
            `
            tableMembros.appendChild(row)
        });
    } catch (error) {
        console.error('Erro ao tentar acessar a lista de usuários paginados', error)
    }
}