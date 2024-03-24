
if (!localStorage.pessoas) {
    var pessoas = [];
    localStorage.setItem('pessoas', JSON.stringify(pessoas));
}

function salvar() {


    if ($("#formularioDados").valid()) {

    
        var pessoas = JSON.parse(localStorage.getItem('pessoas'));

        var pessoa = new Object();
        pessoa.nome = document.getElementById("cadastronome").value;
        pessoa.email = document.getElementById("cadastroemail").value;
        pessoa.senha = document.getElementById("senha").value;

        if (verificarEMAIL(pessoa.email, pessoas)) {
            alert('O email informado já foi cadastrado');
        } else {
            
            var posicao = pessoas.length;  

            pessoas[posicao] = pessoa;

            
            localStorage.setItem('pessoas', JSON.stringify(pessoas));

            //alert('Cadastro realizado com sucesso');
            console.log(1)

            window.location.href = "login.html"
            //window.location.assign('login.html')
            
            

            
        }
    }

}

function verificarEMAIL(email, pessoas) {
    var teste = false;
    var quantidade = pessoas.length;

    var posicao = 0;
    for (posicao = 0; posicao < quantidade; posicao++) {
        if (email == pessoas[posicao].email) {
            teste = true;
        }
    }
    return teste;
}


$(document).ready(function () {
    $('#senha').mask('AAAAAAAAAA');
    $('#cadastroemail').mask('AAAAAAAAAAAAAAA');
});

$("#formularioDados").validate(
    {
        rules: {
            senha: {
                required: true,
                minlength: 6	   
            },
            cadastronome: {
                required: true
            },
            cadastroemail: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            senha: {
                required: "Campo obrigatório",
                minlength:"Preencha o campo corretamente"
            },
            cadastronome: {
                required: "Campo obrigatório",
            },
            cadastroemail: {
                required: "Campo obrigatório",
                minlength:"Preencha o campo corretamente"
            }
        }
    }
);