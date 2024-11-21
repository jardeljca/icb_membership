/* Botões */
const btnMembros = document.getElementById("btnMembros");
const btnConsultas = document.getElementById("btnConsultas");
/* Divs */
const areaMembros = document.getElementById("areaMembros");
const areaConsultas = document.getElementById("areaConsultas");
const logoIcb = document.getElementById("logoIcb");

areaMembros.style.display = 'none';
areaConsultas.style.display = 'none';

btnMembros.addEventListener("click", () => {
    areaMembros.style.display = 'flex';
    if (areaConsultas.style.display === 'flex') {
        areaConsultas.style.display = 'none';
    }
    logoIcb.style.display = 'none';
})

btnConsultas.addEventListener("click", () => {
    areaConsultas.style.display = 'flex';
    if (areaMembros.style.display === 'flex') {
        areaMembros.style.display = 'none';
    }
})

/* Funções que controlarão login e logout */

function verificarSessao() {
    if (!sessionStorage.getItem("access_token")) {
        window.location.href = "loginLider.html";
    }
}

window.onload = verificarSessao()

window.onload = getUsersPaginado(0, 9)

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


/* Adicionar membro cadastrado à tabela */
/* import { membrosArray } from './cadastroMembro.js'; */
/* 
function listaTabela() {
    let tbody = document.getElementById("tabelaMembros");

    for (let i = 0; i < membrosArray.length; i++) {
        let novaLinha = tbody.insertRow();

        let colunaNome = novaLinha.insertCell();
        let colunaAcoes = novaLinha.insertCell();

        colunaNome.innerText = membrosArray[i].nome;

        colunaAcoes.classList.add("corpoAcoes");

        let imgVer = document.createElement("img");
        imgVer.src = "../img/ver.png";

        let imgEditar = document.createElement("img");
        imgEditar.src = "../img/editar.png";

        let imgExcluir = document.createElement("img");
        imgExcluir.src = "../img/excluir.png";

        colunaAcoes.appendChild(imgVer);
        colunaAcoes.appendChild(imgEditar);
        colunaAcoes.appendChild(imgExcluir);


    }
} */

async function gerarPaginacao() {
    try {
        const response = await axios.get('https://backend-icb-membership.vercel.app/membros', { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('access_token').replace("\"", "")}` } })
        const users = response.data
        const totalUsers = users.length
        const quantidadePagina = Math.ceil(totalUsers / 10)
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
        console.error('Erro ao tentar acessar a lista de usuários', error)
    }
}

async function getUsersPaginado(inicio, fim) {
    try {
        const response = await axios.get(`https://backend-icb-membership.vercel.app/membros/filtro?inicio =${inicio}&fim=${fim}` , { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('access_token')}` } })
        const users = response.data.users
        const tableUsers = document.getElementById('bodyTableUsers')
        tableUsers.innerHTML = ''

        users.forEach(user => {
            const row = document.createElement('tr')
            row.innerHTML = `
                        <td>${user.nome}</td>
                        <td>${user.email}</td>
                        <td>${new Date(user.createdAt).toLocaleDateString('pt-BR')}</td>
                        <td>
                        <a type='button' href='#' class='btn btn-primary btn-sm' onclick="editarUser('${user.email}')">Editar</a>
                        <a type='button' href='#' class='btn btn-danger btn-sm' onclick="deletarUser('${user.email}')">Excluir</a>
                        </td>
                    `
            tableUsers.appendChild(row)
        });
    } catch (error) {
        console.error('Erro ao tentar acessar a lista de usuários', error)
    }
}