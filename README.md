# Formulário de Cadastro Completo - Projeto e-Commerce

Este projeto é um exemplo de um **formulário de cadastro completo** com validações e consumo de API, desenvolvido para ser utilizado em plataformas de e-commerce. Ele inclui campos essenciais como nome, e-mail, senha, CPF, data de nascimento e endereço completo, com preenchimento automático baseado no CEP utilizando a API **ViaCEP**.

## Funcionalidades

- **Validação de E-mail:** Verifica se o formato do e-mail inserido é válido.
- **Validação de CPF:** Implementa a lógica para validar um CPF válido com base nos dígitos verificadores.
- **Consumo de API ViaCEP:** Busca automaticamente o endereço (logradouro, bairro, cidade e estado) ao inserir um CEP válido.
- **Formulário responsivo:** Interface ajustável para dispositivos móveis.

---

## Estrutura do Projeto

O projeto está dividido em três principais arquivos:

1. **HTML** (`index.html`): Estrutura do formulário e os campos de entrada de dados.
2. **CSS** (`styles.css`): Estilos visuais para layout e responsividade.
3. **JavaScript** (`scripts.js`): Lógica de validação dos campos e consumo da API ViaCEP.

---

## Instruções de Uso

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/formulario-cadastro-ecommerce.git
```

### 2. Estrutura de Arquivos

Após clonar o projeto, a estrutura de arquivos será:

```
formulario-cadastro-ecommerce/
│
├── index.html
├── styles.css
└── scripts.js
```

### 3. Abrir o Projeto

Abra o arquivo `index.html` em qualquer navegador para visualizar o formulário. Certifique-se de que há conexão com a internet, já que a busca pelo endereço depende da API ViaCEP.

---

## Detalhes do Formulário

### Campos

- **Nome Completo:** Campo de texto simples que aceita qualquer valor de nome.
- **E-mail:** Aceita e-mails válidos no formato `exemplo@dominio.com`.
- **Senha:** Deve conter no mínimo 6 caracteres.
- **CPF:** Implementa a lógica de validação dos dígitos verificadores de um CPF válido.
- **Data de Nascimento:** Campo de data, obrigatório.
- **CEP:** Utilizado para consultar o endereço via a API **ViaCEP**.
- **Logradouro, Bairro, Cidade, Estado:** Preenchidos automaticamente após a consulta à API ViaCEP, ao inserir um CEP válido.
- **Número:** Deve ser inserido manualmente pelo usuário.

---
## Repositórios Usados Para Criação do Projeto
[Repositório com API de rastreio de CEP](https://github.com/Geovanaaplima/form-CadEndereco)

[Repositório de validação de CPF E EMAIL](https://github.com/Geovanaaplima/validacao_email_cpf)


## Explicação do Código

### HTML (`index.html`)

O formulário está estruturado com vários campos de entrada, com seus respectivos `id` e `name` para facilitar a manipulação via JavaScript. Ele contém os campos necessários para um cadastro completo de usuário:

```html
<form id="formCadastro">
    <label for="nome">Nome Completo:</label>
    <input type="text" id="nome" name="nome" required>

    <label for="email">E-mail:</label>
    <input type="email" id="email" name="email" required>

    <label for="senha">Senha:</label>
    <input type="password" id="senha" name="senha" required minlength="6">
    
    <!-- Mais campos... -->
</form>
```

### CSS (`styles.css`)

O CSS utilizado neste projeto é básico e focado na responsividade e boa apresentação visual do formulário. Cada input tem um `padding` para melhorar a usabilidade e um `border-radius` para um design moderno. O botão de cadastro muda de cor ao ser "hovered".

```css
button {
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #218838;
}
```

### JavaScript (`scripts.js`)

#### 1. Validação de CPF:

A função `validarCPF` segue o algoritmo de validação oficial de CPF no Brasil, utilizando os dois dígitos verificadores. Ela limpa o CPF (removendo pontos e traços), calcula os dígitos de validação e verifica se o CPF informado é válido.

```javascript
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
```

#### 2. Validação de E-mail:

A validação de e-mail é feita com uma expressão regular simples, que verifica se o e-mail está no formato `nome@dominio.com`.

```javascript
function validarEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}
```

#### 3. Consulta à API ViaCEP:

O evento `blur` no campo de CEP faz uma requisição à API ViaCEP quando o usuário sai do campo, preenchendo automaticamente os campos de endereço (logradouro, bairro, cidade e estado) se o CEP for válido.

```javascript
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
```

---

## Tecnologias Utilizadas

- **HTML5:** Linguagem de marcação para estruturar o formulário.
- **CSS3:** Para estilizar e garantir a responsividade do formulário.
- **JavaScript:** Para validação de dados e consumo de APIs.
- **API ViaCEP:** Para consulta de endereço com base no CEP.

---

## Melhorias Futuras

- **Validações Adicionais:** Adicionar validações mais detalhadas, como força de senha e validação de data.
- **Mensagens de Erro Melhoradas:** Substituir `alert()` por mensagens visuais mais agradáveis diretamente no formulário.
- **API Internacional:** Integrar com uma API de endereços internacionais para permitir cadastros de usuários fora do Brasil.

---

## Autor

Projeto desenvolvido por [Geovana](https://github.com/Geovanaaplima) Este é um exemplo didático de um formulário de cadastro que pode ser expandido e modificado conforme as necessidades da aplicação.

<img src="geovana.jpg" alt="" width="100px" >

---

Esse README oferece uma visão geral completa do projeto, suas funcionalidades, como executá-lo, além de detalhes técnicos sobre o código implementado.