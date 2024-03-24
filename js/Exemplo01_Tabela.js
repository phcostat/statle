if(!localStorage.pessoas){
	var pessoas = [];
	localStorage.setItem('pessoas', JSON.stringify(pessoas));
}

function exibirTabela(){
	apagarLinhas();

	//recupera o vetor na memória secundária
	var pessoas = JSON.parse(localStorage.getItem('pessoas'));

	//length é comprimento do vetor, ou seja, a quantidade de objetos armazenados
	var quantidade = pessoas.length;

	var posicao = 0;
	for(posicao = 0; posicao < quantidade; posicao++){	
		imprimirTabela(pessoas[posicao]);
	}
}

function imprimirTabela(pessoa){
	var tabelaDados = document.getElementById("tabelaDados");

	var linha = tabelaDados.insertRow(1);

	var celulaCPF = linha.insertCell(0);
	var celulaNome = linha.insertCell(1);
	var celulaAltura = linha.insertCell(2);
	var celulaPeso = linha.insertCell(3);
	var celulaIMC = linha.insertCell(4);
	
	celulaCPF.innerText = pessoa.cpf;
	celulaNome.innerText = pessoa.nome;
	celulaAltura.innerText = pessoa.altura;
	celulaPeso.innerText = pessoa.peso;
	celulaIMC.innerText = (pessoa.peso / (pessoa.altura * pessoa.altura)).toFixed(2);
	
}

function apagarLinhas(){
	var tabelaDados = document.getElementById("tabelaDados");

	// o código abaixo cria um vetor com todos os elementos tr (linha) da tabela
	var linhas = tabelaDados.getElementsByTagName('tr');

	//length é comprimento do vetor, ou seja, a quantidade de linhas da tabela
	var quantidade = linhas.length;

	var numero = quantidade -1;
	while(numero >= 1){
		tabelaDados.deleteRow(numero);
		numero = numero - 1;
	}
}

function excluirDados(){
	localStorage.removeItem('pessoas')
	apagarLinhas();
}