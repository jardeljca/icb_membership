async function logar() {
    const emailLogin = document.getElementById('emailLogin').value;
    const senhaLogin = document.getElementById('senhaLogin').value;
  
    try {
      const response = await axios.post('https://backend-icb-membership.vercel.app/login/', {
        email: emailLogin,
        senha: senhaLogin,
      });
  
      if (response.status === 200) {
        alert(response.data.access_token)
        sessionStorage.setItem('accessToken', JSON.stringify(response.data.access_token));
        window.location.replace('pagGerenciamento.html');
      }
    } catch (error) {
        console.error(error.response.data);
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