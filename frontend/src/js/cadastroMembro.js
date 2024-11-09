/* Função para mascara do telefone */
function formatarTelefone(input) {
    // Remove todos os caracteres não numéricos
    var telefone = input.value.replace(/\D/g, '');

    // Insere os parênteses, espaço e traço nos lugares corretos
    telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');

    // Atualiza o valor do campo de entrada com o telefone formatado
    input.value = telefone;
}

/* Função com API para buscar endereço de acordo com CEP */
function buscaCep(cep) {
    if (cep.length === 8) {
        fetch('https://viacep.com.br/ws/' + cep + '/json/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro de conexão');
                }
                return response.json();
            })
            .then(data => {
                if (data.erro) {
                    alert("CEP inválido! Por favor, verifique e tente novamente.");
                } else {
                    // Preenchendo os campos com os dados retornados
                    logradouro.value = data.logradouro;
                    bairro.value = data.bairro;
                    cidade.value = data.localidade;
                    estado.value = data.uf;
                }
            })
            .catch(error => {
                console.log("Erro:", error);
                alert("Erro ao buscar o CEP. Tente novamente mais tarde.");
            });
    }
    else{
        alert("O cep precisa ter 8 digitos")
    }
}
