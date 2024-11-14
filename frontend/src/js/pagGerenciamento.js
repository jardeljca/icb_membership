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
    if(areaConsultas.style.display === 'flex'){
        areaConsultas.style.display = 'none';
    }
    logoIcb.style.display = 'none';
})

btnConsultas.addEventListener("click", () => {
    areaConsultas.style.display = 'flex';
    if(areaMembros.style.display === 'flex'){
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

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "loginLider.html";
}