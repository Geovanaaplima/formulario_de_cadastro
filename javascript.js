document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validação do CPF
    const cpf = document.getElementById('cpf').value;
    if (!validarCPF(cpf)) {
        alert("CPF inválido!");
        return;
    }

    // Validação do E-mail
    const email = document.getElementById('email').value;
    if (!validarEmail(email)) {
        alert("E-mail inválido!");
        return;
    }

    alert('Cadastro realizado com sucesso!');
});

// Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove tudo que não for dígito
    if (cpf.length !== 11) return false;

    let soma = 0;
    let resto;
    if (cpf == "00000000000") return false;

    for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;

    return true;
}

// Função para validar e-mail
function validarEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

// Função para buscar o endereço pelo CEP usando a API ViaCEP
document.getElementById('cep').addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('logradouro').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                } else {
                    alert("CEP não encontrado!");
                }
            })
            .catch(error => {
                alert("Erro ao buscar o endereço.");
            });
    } else {
        alert("CEP inválido!");
    }
});
