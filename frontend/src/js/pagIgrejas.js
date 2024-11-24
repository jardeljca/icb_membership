/* Funções que controlarão login e logout */

function verificarSessao() {
    if (!sessionStorage.getItem("access_token")) {
        window.location.href = "loginLider.html";
    }
}

window.onload = verificarSessao()

window.onload = getUnidadesPaginado(0, 9)

window.onload = function () {
    gerarPaginacao()
}

/*window.onpopstate = function () {
    logout();
};*/

function logout() {
    sessionStorage.removeItem("access_token")
    alert("Você foi desconectado!");
    window.location.href = "loginLider.html";
}

async function deletarUnidade(id) {
    try {
        const token = sessionStorage.getItem("access_token");
        const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
        const response = await axios.delete(`https://backend-icb-membership.vercel.app/unidade/${id}`, {
            headers: {
                'Authorization': `Bearer ${formattedToken}`,
            },
        });
        if (response.data) {
            alert("Unidade deletada com sucesso")
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
        const response = await axios.get('https://backend-icb-membership.vercel.app/unidades', {
            headers: {
                'Authorization': `Bearer ${formattedToken}`,
            },
        })
        const unidades = response.data.data.data
        const totalUnidades = unidades.length
        const quantidadePagina = Math.ceil(totalUnidades / 10)
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
            a.setAttribute('onclick', 'getUnidadesPaginado(' + inicio + ', ' + fim + ')')
            li.appendChild(a)
            divPaginacao.appendChild(li)
        }
    } catch (error) {
        console.error('Erro ao tentar acessar a lista de unidades', error)
    }
}

async function getUnidadesPaginado(inicio, fim) {
    try {
        verificarSessao()
        const token = sessionStorage.getItem("access_token");
        const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
        const response = await axios.get(`https://backend-icb-membership.vercel.app/unidades/filtro?inicio=${inicio}&fim=${fim}`, {
            headers: {
                'Authorization': `Bearer ${formattedToken}`,
            },
        });
        const unidades = response.data.data
        const tableUnidades = document.getElementById('bodyTableUnidades')
        tableUnidades.innerHTML = ''

        unidades.forEach(unidade => {
            const row = document.createElement('tr')
            row.innerHTML = `
                <td style='color: #FFFFFF; text-align: center;'>${unidade.nome}</td>
                <td style='color: #FFFFFF; text-align: center;'>${unidade.cidade}</td>
                <td class="colunaAcoes">
                    <a type='button' class='acaoNome' onclick="visualizarUnidade('${unidade.id}')">
                        <img src="/frontend/public/imagens/ver.png" alt="Ícone ver" class="icone">
                        <span class='texto'>Ver</span>
                    </a>
                    <a type='button' class='acaoNome' onclick="editarUnidade('${unidade.id}')">
                        <img src="/frontend/public/imagens/editar.png" alt="Ícone Editar" class="icone">
                        <span class='texto'>Editar</span>
                    </a>
                    <a type='button' class='acaoNome' onclick="deletarUnidade('${unidade.id}')">
                        <img src="/frontend/public/imagens/excluir.png" alt="Ícone Excluir" class="icone">
                        <span class='texto'>Excluir</span>
                    </a>
                </td>
            `
            tableUnidades.appendChild(row)
        });
    } catch (error) {
        console.error('Erro ao tentar acessar a lista de unidades paginados', error)
    }
}