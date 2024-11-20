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
    if (!localStorage.getItem("isLoggedIn")) {
        window.location.href = "loginLider.html";
    }
}
verificarSessao();

window.onpopstate = function () {
    logout();
};

function logout() {
    localStorage.removeItem("isLoggedIn");
    alert("Você foi desconectado!");
    window.location.href = "loginLider.html";
}


/* Adicionar membro cadastrado à tabela */
/* import { membrosArray } from './cadastroMembro.js'; */

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
}