if (!localStorage.posicoes) {
    var posicoes = 0;
    localStorage.setItem('posicoes', JSON.stringify(posicoes));
}


function logar(email, senha, pessoas) {
    var pessoas = JSON.parse(localStorage.getItem('pessoas'));

    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    var teste = false;
    var quantidade = pessoas.length;

    var posicao = 0;
    for (posicao = 0; posicao < quantidade; posicao++) {
        if ((email == pessoas[posicao].email) && (senha == pessoas[posicao].senha)) {
            teste = true
            var usuarioLogado = pessoas[posicao].nome

            var posicoes = JSON.parse(localStorage.getItem('posicoes'));
            posicoes = posicao
            localStorage.setItem('posicoes', JSON.stringify(posicoes));
        }
    }

    if (teste == false) {
        alert("Email ou senha incorretos!");
    } else {
        alert("EMAIL ENCONTRADO");
    
        window.location.href = "menu.html"
    }
}

$(document).ready(function () {
    $('#senha').mask('AAAAAAAAAA');
    $('#email').mask('AAAAAAAAAAAAAAA');
});

$("#formularioDados").validate(
    {
        rules: {
            senha: {
                required: true,
                minlength: 6	   
            },
            email: {
                required: true
            }
        },
        messages: {
            senha: {
                required: "Campo obrigatório",
                minlength:"Preencha o campo corretamente"
            },
            email: {
                required: "Campo obrigatório"
            }
        }
    }
);