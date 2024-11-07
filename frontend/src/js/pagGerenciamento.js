/* Botões */
const btnMembros = document.getElementById("btnMembros");
const btnConsultas = document.getElementById("btnConsultas");
/* Divs */
const areaMembros = document.getElementById("areaMembros");
const areaConsultas = document.getElementById("areaConsultas");

btnMembros.addEventListener("click", () => {
    areaMembros.style.display = 'block';
    if(areaConsultas.style.display === 'block'){
        areaConsultas.style.display = 'none';
    }
})

btnConsultas.addEventListener("click", () => {
    areaConsultas.style.display = 'block';
    if(areaMembros.style.display === 'block'){
        areaMembros.style.display = 'none';
    }
})  