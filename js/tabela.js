function mostrarUsuario() {
    var pessoas = JSON.parse(localStorage.getItem('pessoas'));

    var posicao = JSON.parse(localStorage.getItem('posicoes'));
    document.getElementById("logado").innerText = "Usuário: " + pessoas[posicao].nome;
}




function apresentarRanking() {
    apagarLinhas();

    //recupera o vetor na memória secundária
    var rankings = JSON.parse(localStorage.getItem('rankings'));

    // Ordena o ranking
    rankings = ordenarRanking(rankings);

    //length é comprimento do vetor, ou seja, a quantidade de objetos armazenados
    var quantidade = rankings.length;

    var posicao = 0;
    for (posicao = 0; posicao < quantidade; posicao++) {
        imprimirTabela(rankings[posicao], posicao, quantidade);
    }

}


function imprimirTabela(dados, posicao, quantidade) {
    posicao = quantidade - posicao;

    if (posicao <= 5) {
        var tabelaRanking = document.getElementById("tabelaRanking");

        var linha = tabelaRanking.insertRow(1);

        var celula1 = linha.insertCell(0);
        var celula2 = linha.insertCell(1);
        var celula3 = linha.insertCell(2);
        var celula4 = linha.insertCell(3);
        var celula5 = linha.insertCell(4)

        if (posicao == 1) {
            var img = document.createElement('img');
            img.src = 'img/testemedalhaouro.png';
            img.classList.add('icon');
            celula1.appendChild(img);
        } else {
            if (posicao == 2) {
                var img = document.createElement('img');
                img.src = 'img/testemedalhaprata.png';
                img.classList.add('icon');
                celula1.appendChild(img);
            } else {
                if (posicao == 3) {
                    var img = document.createElement('img');
                    img.src = 'img/testemedalhabronze.png';
                    img.classList.add('icon');
                    celula1.appendChild(img);
                } else {
                    celula1.innerText = posicao + "°";
                }
            }
        }
        
        celula2.innerText = dados.email;
        celula3.innerText = dados.nome;
        celula4.innerText = dados.acerto;
        celula5.innerText = dados.tempo;
    } else {
        console.log('Deu ruim')
    }



}



function apagarLinhas() {
    var tabelaRanking = document.getElementById("tabelaRanking");

    var linhas = tabelaRanking.getElementsByTagName('tr');

    var quantidade = linhas.length;

    var numero = quantidade - 1;
    while (numero >= 1) {
        tabelaRanking.deleteRow(numero);
        numero = numero - 1;
    }
}

function excluirDados() {
    localStorage.removeItem('rankings')
    localStorage.removeItem('pessoas')
    localStorage.removeItem('posicao')
    apagarLinhas();
}

// Função para ordenar o ranking
function ordenarRanking(rankings) {
    rankings.sort(function (a, b) {
        // Ordena por acerto de forma crescente
        if (a.acerto < b.acerto) {
            return -1;
        } else if (a.acerto > b.acerto) {
            return 1;
        }

        // Em caso de empate, ordena por tempo de forma crescente
        if (a.tempo > b.tempo) {
            return -1;
        } else if (a.tempo > b.tempo) {
            return 1;
        }

        return 0; // Retorna 0 se os dois objetos são considerados iguais na ordenação
    });

    return rankings;
}

function consultar(){
    apagarLinhas();

	var dados = JSON.parse(localStorage.getItem('rankings'));
	var quantidade = dados.length;
    var busca = document.getElementById("busca").value

    dados = ordenarRanking(dados)
	var posicao = 0;
	for(posicao = 0; posicao < quantidade; posicao++){
        if (dados[posicao].email == busca) {
           imprimirTabela2(dados[posicao], posicao, quantidade); 
        }	
	}
}

function imprimirTabela2(dados, posicao, quantidade){

	var tabelaRanking = document.getElementById("tabelaRanking");
    posicao = quantidade - posicao
	var linha = tabelaRanking.insertRow(1);
    
	var celula1 = linha.insertCell(0);
        var celula2 = linha.insertCell(1);
        var celula3 = linha.insertCell(2);
        var celula4 = linha.insertCell(3);
        var celula5 = linha.insertCell(4)

        if (posicao == 1) {
            var img = document.createElement('img');
            img.src = 'img/testemedalhaouro.png';
            img.classList.add('icon');
            celula1.appendChild(img);
        } else {
            if (posicao == 2) {
                var img = document.createElement('img');
                img.src = 'img/testemedalhaprata.png';
                img.classList.add('icon');
                celula1.appendChild(img);
            } else {
                if (posicao == 3) {
                    var img = document.createElement('img');
                    img.src = 'img/testemedalhabronze.png';
                    img.classList.add('icon');
                    celula1.appendChild(img);
                } else {
                    celula1.innerText = posicao + "°";
                }
            }
        }
        
        celula2.innerText = dados.email;
        celula3.innerText = dados.nome;
        celula4.innerText = dados.acerto;
        celula5.innerText = dados.tempo;
	
	
}

function limpar() {
    apagarLinhas()
    document.getElementById("busca").value = ""
    apresentarRanking()
}