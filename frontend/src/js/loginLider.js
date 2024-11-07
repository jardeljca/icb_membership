function logar() {

    const emailLogin = document.getElementById('emailLogin').value;
    const senhaLogin = document.getElementById('senhaLogin').value;

    if (emailLogin == 'admin@admin.com'){
        if(senhaLogin =='admin'){
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
