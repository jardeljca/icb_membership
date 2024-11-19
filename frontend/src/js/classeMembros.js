class Membro {
    constructor(nome, dataNascimento, estadoCivil, contato, escolaridade, instagram, endereco, dataConversao, batizado, dataBatismo, cargo, nomeCargo) {
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.estadoCivil = estadoCivil;
        this.contato = contato;
        this.escolaridade = escolaridade;
        this.instagram = instagram;
        this.endereco = endereco; // Objeto contendo informações do endereço
        this.dataConversao = dataConversao;
        this.batizado = batizado; // "Sim" ou "Não"
        this.dataBatismo = batizado === "Sim" ? dataBatismo : null;
        this.cargo = cargo; // "Sim" ou "Não"
        this.nomeCargo = cargo === "Sim" ? nomeCargo : null;
    }
}
