//O código a seguir verifica a existência da chave 'pessoas' no localStorage. Caso não exista, o código cria um vetor vazio e o armazena no localStorage.
if (!localStorage.pessoas) {
    var pessoas = [];
    localStorage.setItem('pessoas', JSON.stringify(pessoas));
}

function salvar() {

    //realzia a validação do formulário
    if ($("#formularioDados").valid()) {

        //recupera o vetor na memória secundária
        var pessoas = JSON.parse(localStorage.getItem('pessoas'));

        var pessoa = new Object();
        pessoa.cpf = document.getElementById("cpf").value;
        pessoa.nome = document.getElementById("nome").value;
        pessoa.altura = parseFloat(document.getElementById("altura").value);
        pessoa.peso = parseFloat(document.getElementById("peso").value);

        if (verificarCPF(pessoa.cpf, pessoas)) {
            alert('O CPF informado já foi cadastrado');
        } else {
            //length é comprimento do vetor, ou seja, a quantidade de objetos armazenados
            var posicao = pessoas.length;  

            pessoas[posicao] = pessoa;

            //armazena o vetor na memória secundária
            localStorage.setItem('pessoas', JSON.stringify(pessoas));

            alert('Cadastro realizado com sucesso');
            window.location.href = "statle.html";
        }

    }
}

function verificarCPF(cpf, pessoas) {
    var teste = false;
    var quantidade = pessoas.length;

    var posicao = 0;
    for (posicao = 0; posicao < quantidade; posicao++) {
        if (cpf == pessoas[posicao].cpf) {
            teste = true;
        }
    }
    return teste;
}


$(document).ready(function () {
    $('#cpf').mask('000.000.000-00');
    $('#altura').mask('0.00');
    $('#peso').mask('000.00');
});

$("#formularioDados").validate(
    {
        rules: {
            cpf: {
                required: true,
                minlength: 14	   
            },
            nome: {
                required: true
            },
            altura: {
                required: true
            },
            peso: {
                required: true
            }
        },
        messages: {
            cpf: {
                required: "Campo obrigatório",
                minlength:"Preencha o campo corretamente"
            },
            nome: {
                required: "Campo obrigatório"
            },
            altura: {
                required: "Campo obrigatório"
            },
            peso: {
                required: "Campo obrigatório"
            }
        }
    }
);


