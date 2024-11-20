async function logar() {
    const emailLogin = document.getElementById('emailLogin').value;
    const senhaLogin = document.getElementById('senhaLogin').value;

    if (!emailLogin || !senhaLogin) {
        alert("Preencha todos os campos!");
        return;
    }
  
    try {
      const response = await axios.post('https://backend-icb-membership.vercel.app/login/', {
        email: emailLogin,
        senha: senhaLogin,
      });
  
      if (response.status == 200) {
        alert("Login realizado com sucesso")
        sessionStorage.setItem('access_token', JSON.stringify(response.data.access_token));
        window.location.replace('pagGerenciamento.html');
      }
    } catch (error) {
        if (error.response && error.response.data) {
            alert(error.response.data.detail);
        } else {
            alert("Erro ao conectar com o servidor.");
        }
        document.getElementById('emailLogin').value = ""
        document.getElementById('senhaLogin').value = ""
    }
  }

  /*
  function logar() {

    const emailLogin = document.getElementById('emailLogin').value;
    const senhaLogin = document.getElementById('senhaLogin').value;

    if (emailLogin == 'admin@admin.com'){
        if(senhaLogin =='admin'){
            localStorage.setItem("isLoggedIn", true);
            location.href = "pagGerenciamento.html"
        }
        else{
            alert("Senha incorreta!");
        }
    }
    else{
        alert("Usuário inexistente!");
    }

}
  */