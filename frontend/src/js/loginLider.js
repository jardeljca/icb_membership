async function logar() {
    const emailLogin = document.getElementById('emailLogin').value;
    const senhaLogin = document.getElementById('senhaLogin').value;
  
    try {
      const response = await axios.post('https://backend-icb-membership.vercel.app/login/', {
        email: emailLogin,
        senha: senhaLogin,
      });
  
      if (response.status === 200) {
        console.log('Login bem-sucedido:', response.data);
        alert('Login realizado com sucesso!');
      }
    } catch (error) {
      if (error.response) {
        console.error('Erro no login:', error.response.data);
        alert('Erro: ' + error.response.data.message);
      } else {
        console.error('Erro na requisição:', error.message);
        alert('Erro na requisição: ' + error.message);
      }
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