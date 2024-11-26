/* Funções que controlarão login e logout */

function verificarSessao() {
    if (!sessionStorage.getItem("access_token")) {
        window.location.href = "loginLider.html";
    }
}

window.onload = verificarSessao()

window.onload = getAdministradoresPaginado(0, 9)

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

async function deletarAdministrador(id) {
    mostrarCarregando()
    try {
        const token = sessionStorage.getItem("access_token");
        const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
        const response = await axios.delete(`https://backend-icb-membership.vercel.app/administrador/${id}`, {
            headers: {
                'Authorization': `Bearer ${formattedToken}`,
            },
        });
        if (response.data) {
            alert("Administrador deletado com sucesso")
            esconderCarregando()
            location.reload()
        }
    } catch (error){
        esconderCarregando()
        alert("Erro na exclusão do Administrador")
        console.error(error.response.data);
        location.reload()
    }
    
    
}

async function gerarPaginacao() {
    mostrarCarregando()
    try {
        verificarSessao()
        const token = sessionStorage.getItem("access_token");
        const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
        const response = await axios.get('https://backend-icb-membership.vercel.app/administradores', {
            headers: {
                'Authorization': `Bearer ${formattedToken}`,
            },
        })
        const administradores = response.data.data.data
        const totalAdministradores = administradores.length
        const quantidadePagina = Math.ceil(totalAdministradores / 10)
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
            a.setAttribute('onclick', 'getAdministradoresPaginado(' + inicio + ', ' + fim + ')')
            li.appendChild(a)
            divPaginacao.appendChild(li)
        }
        esconderCarregando()
    } catch (error) {
        esconderCarregando()
        console.error('Erro ao tentar acessar a lista de administradores', error)
    }
}

async function getAdministradoresPaginado(inicio, fim) {
    mostrarCarregando()
    try {
        verificarSessao()
        const token = sessionStorage.getItem("access_token");
        const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
        const response = await axios.get(`https://backend-icb-membership.vercel.app/administradores/intervalo?inicio=${inicio}&fim=${fim}`, {
            headers: {
                'Authorization': `Bearer ${formattedToken}`,
            },
        });
        const administradores = response.data.data
        const tableAdministradores = document.getElementById('bodyTableAdministradores')
        tableAdministradores.innerHTML = ''

        administradores.forEach(administrador => {
            const row = document.createElement('tr')
            row.innerHTML = `
                <td style='color: #FFFFFF; text-align: center;'>${administrador.membro['nome']}</td>
                <td style='color: #FFFFFF; text-align: center;'>${administrador.tipo}</td>
                <td class="colunaAcoes">
                    <a type='button' class='acaoNome' onclick="visualizarAdministrador('${administrador.id}')">
                        <img src="/frontend/public/imagens/ver.png" alt="Ícone ver" class="icone">
                        <span class='texto'>Ver</span>
                    </a>
                    <a type='button' class='acaoNome' onclick="editarAdministrador('${administrador.id}')">
                        <img src="/frontend/public/imagens/editar.png" alt="Ícone Editar" class="icone">
                        <span class='texto'>Editar</span>
                    </a>
                    <a type='button' class='acaoNome' onclick="deletarAdministrador('${administrador.id}')">
                        <img src="/frontend/public/imagens/excluir.png" alt="Ícone Excluir" class="icone">
                        <span class='texto'>Excluir</span>
                    </a>
                </td>
            `
            tableAdministradores.appendChild(row)
        });
        esconderCarregando()
    } catch (error) {
        esconderCarregando()
        console.error('Erro ao tentar acessar a lista de administradores paginados', error)
    }
}

async function visualizarAdministrador(id) {
    verificarSessao()
    mostrarCarregando()
    document.querySelector('.modal').style.visibility = 'visible';

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const sexo = document.getElementById('sexo');
    const posicao = document.getElementById('posicao');
    const telefone = document.getElementById('telefone');
    const unidade = document.getElementById('unidade');
    
    try {
        const token = sessionStorage.getItem("access_token");
        const formattedToken = token ? token.replace(/^"+|"+$/g, '') : null;
        const response = await axios.get(`https://backend-icb-membership.vercel.app/administrador/${id}`, {
            headers: {
                'Authorization': `Bearer ${formattedToken}`,
            },
        });

        const admin = response.data.data;
        nome.textContent = admin.membro.nome;
        email.textContent = admin.membro.email;
        sexo.textContent = admin.membro.sexo;
        posicao.textContent = admin.membro.posicao;
        telefone.textContent = admin.membro.telefone;
        unidade.textContent = admin.unidade.nome;
        esconderCarregando()
    } catch (error) {
        document.querySelector('.modal').style.visibility = 'hidden';
        console.error('Erro ao buscar dados:', error);
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
