async function logar() {
  const emailLogin = document.getElementById('emailLogin').value;
  const senhaLogin = document.getElementById('senhaLogin').value;



  if (!emailLogin || !senhaLogin) {
    alert("Preencha todos os campos!");
    return;
  }

  async function logar() {


    try {
      const response = await axios.post('https://backend-icb-membership.vercel.app/login/', {
        email: emailLogin,
        senha: senhaLogin,
      });

      if (response.status == 200) {
        alert("Login realizado com sucesso")
        esconderCarregando()
        sessionStorage.setItem('access_token', JSON.stringify(response.data.access_token));
        window.location.replace('pagGerenciamento.html');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.detail);
        esconderCarregando()
      } else {
        alert("Erro ao conectar com o servidor.");
        esconderCarregando()
      }
      document.getElementById('emailLogin').value = ""
      document.getElementById('senhaLogin').value = ""
    }
  }
}

function mostrarCarregando() {
  document.querySelector('.carregando').style.visibility = 'visible';
}

function esconderCarregando() {
  document.querySelector('.carregando').style.visibility = 'hidden';
}
