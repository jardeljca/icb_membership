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
    mostrarCarregando()
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
            esconderCarregando()
            location.reload()
        }
    } catch (error){
        alert("Erro na exclusão do Membro")
        console.error(error.response.data);
        esconderCarregando()
        location.reload()
    }
    
    
}

async function gerarPaginacao() {
    mostrarCarregando()
    try {
        verificarSessao()
        const token = sessionStorage.getItem("access_token");
        const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
        const response = await axios.get('https://backend-icb-membership.vercel.app/unidades', {
            headers: {
                'Authorization': `Bearer ${formattedToken}`,
            },
        })
        const unidades = response.data.data
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
        esconderCarregando()
    } catch (error) {
        console.error('Erro ao tentar acessar a lista de unidades', error)
        esconderCarregando()
    }
}

async function getUnidadesPaginado(inicio, fim) {
    mostrarCarregando()
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
        esconderCarregando()
    } catch (error) {
        console.error('Erro ao tentar acessar a lista de unidades paginados', error)
        esconderCarregando()
    }
}

async function visualizarUnidade(id) {
    verificarSessao()
    mostrarCarregando()
    document.querySelector('.modal').style.visibility = 'visible';

    const nome = document.getElementById('nome');
    const cidade = document.getElementById('cidade');
    const cep = document.getElementById('cep');
    const bairro = document.getElementById('bairro');
    const estado = document.getElementById('estado');
    
    try {
        const token = sessionStorage.getItem("access_token");
        const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
        const response = await axios.get(`https://backend-icb-membership.vercel.app/unidade/${id}`, {
            headers: {
                'Authorization': `Bearer ${formattedToken}`,
            },
        });

        const unidade = response.data.data;
        nome.textContent = unidade.nome;
        cidade.textContent = unidade.cidade;
        cep.textContent = unidade.cep;
        bairro.textContent = unidade.bairro;
        estado.textContent = unidade.estado;
        esconderCarregando()
    } catch (error) {
        document.querySelector('.modal').style.visibility = 'hidden';
        console.error('Erro ao buscar dados:', error);
        esconderCarregando()
    }
};

function mostrarCarregando() {
    document.querySelector('.carregando').style.visibility = 'visible';
}

function esconderCarregando() {
    document.querySelector('.carregando').style.visibility = 'hidden';
}

function esconderModal() {
    document.querySelector('.modal').style.visibility = 'hidden';
}
