(function () {



    if (!localStorage.rankings) {
        var rankings = [];
        localStorage.setItem('rankings', JSON.stringify(rankings));
    }


    /*RANK*/


    function mostrarUsuario() {
        var pessoas = JSON.parse(localStorage.getItem('pessoas'));

        var posicao = JSON.parse(localStorage.getItem('posicoes'));
        document.getElementById("logado").innerText = "Usuário: " + pessoas[posicao].nome;
    }

    var i = 0;

    const images = [
        { nome: "Acre", src: 'img/mapaAC.avif' },
        { nome: "Alagoas", src: 'img/mapaAL.jpg' },
        { nome: "Amazonas", src: 'img/mapaAM.png' },
        { nome: "Amapá", src: 'img/mapaAP.jpg' },
        { nome: "Bahia", src: 'img/mapaBA.avif' },
        { nome: "Ceará", src: 'img/mapaCE.png' },
        { nome: "Espírito Santo", src: 'img/mapaES.avif' },
        { nome: "Goiás", src: 'img/mapaGO.avif' },
        { nome: "Maranhão", src: 'img/mapaMA.jpg' },
        { nome: "Minas Gerais", src: 'img/mapaMG.png' },
        { nome: "Mato Grosso do Sul", src: 'img/mapaMS.jpg' },
        { nome: "Mato Grosso", src: 'img/mapaMT.avif' },
        { nome: "Pará", src: 'img/mapaPA.jpg' },
        { nome: "Paraíba", src: 'img/mapaPB.avif' },
        { nome: "Pernambuco", src: 'img/mapaPE.avif' },
        { nome: "Piauí", src: 'img/mapaPI.jpg' },
        { nome: "Paraná", src: 'img/mapaPR.avif' },
        { nome: "Rio de Janeiro", src: 'img/mapaRJ.jpg' },
        { nome: "Rio Grande do Norte", src: 'img/mapaRN.jpg' },
        { nome: "Rondônia", src: 'img/mapaRO.avif' },
        { nome: "Roraima", src: 'img/mapaRR.png' },
        { nome: "Rio Grande do Sul", src: 'img/mapaRS.png' },
        { nome: "Santa Catarina", src: 'img/mapaSC.jpg' },
        { nome: "Sergipe", src: 'img/mapaSE.jpg' },
        { nome: "São Paulo", src: 'img/mapaSP.png' },
        { nome: "Tocantins", src: 'img/mapaTO.jpg' }
    ];


    function shuffleArray(images) {
        for (let i = images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [images[i], images[j]] = [images[j], images[i]];
        }

        showImage()
    }


    shuffleArray(images);
    console.log(images);


    function showImage() {

        const imageElement = document.getElementById('image-display');



        if (imageElement) {
            imageElement.src = images[i].src;
        } else {
            console.error('Elemento de imagem não encontrado no HTML.');
        }
    }




    let currentImageIndex = 0;
    document.getElementById("titulo").innerText = "Estado: " + (currentImageIndex + 1) + "/26";

    let startTime;
    let timerInterval;

    // Função para iniciar o cronômetro
    function startTimer() {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTimer, 1000);
    }

    // Função para parar o cronômetro
    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Função para atualizar o cronômetro
    function updateTimer() {
        const currentTime = new Date().getTime();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Converte para segundos

        // Atualiza o elemento de texto com o tempo gasto
        const timerElement = document.getElementById('timer');
        const resultadoTimer = document.getElementById('resultado-tempo');
        const resultadoTimer2 = document.getElementById('resultado-tempo2');
        if (timerElement) {
            timerElement.textContent = `Tempo: ${elapsedTime} segundos`;
            resultadoTimer.textContent = `Tempo: ${elapsedTime} segundos`;
            resultadoTimer2.textContent = `Tempo: ${elapsedTime} segundos`;
        } else {
            console.error('Elemento de timer não encontrado no HTML.');
        }

        var tempoGasto = elapsedTime

        return tempoGasto
    }



    //TEMPO LIMITE







    function showCurrentImage() {
        const imageElement = document.getElementById('image-display');

        if (imageElement) {
            imageElement.src = images[currentImageIndex].src;
        } else {
            console.error('Elemento de imagem não encontrado no HTML.');
        }

        posicao = 0;
        apagarLinhas()
        document.getElementById("titulo").innerText = "Estado: " + (currentImageIndex + 1) + "/26";
        document.getElementById('formularioDados').style.display = "block";
        document.getElementById("tabelaDados").style.display = "block";
        document.getElementById("resultado-vitoria").style.display = "none";
    }



    function nextImage() {

        if (currentImageIndex < images.length - 1) {

            currentImageIndex++;

            // Mostra a nova imagem
            showCurrentImage();
        } else {
            console.log('Você já chegou à última imagem.');
            stopTimer();
            acertos = 26;
            ranking(acertos)
        }
    }





    function cadastrar() {

        var estado = document.getElementById("estado").value;

        var tabelaDados = document.getElementById("tabelaDados");
        var linha = tabelaDados.insertRow(1)
        var coluna1 = linha.insertCell(0);
        var coluna2 = linha.insertCell(1);
        var acertos = 0;

        coluna1.innerText = estado;

        if (estado.toUpperCase() == images[currentImageIndex].nome.toUpperCase()) {
            coluna2.innerText = "Acertou!";
            document.getElementById("formularioDados").style.display = "none";
            document.getElementById("tabelaDados").style.display = "none";
            document.getElementById("resultado-vitoria").style.display = "block";
            document.getElementById("resultado-acertos").innerText = "Acertos: " + (currentImageIndex + 1);
            acertos = currentImageIndex + 1;
            document.getElementById("acertos").innerText = "Acertos: " + (currentImageIndex + 1);
            nextImage(acertos);


        } else {
            coluna2.innerText = "Errado!";
            document.getElementById("formularioDados").style.display = "none";
            document.getElementById("resultado-derrota").style.display = "block";
            document.getElementById("resultado-acertos2").innerText = "Acertos: " + currentImageIndex;
            acertos = currentImageIndex;
            document.getElementById("resposta-correta").innerText = images[currentImageIndex].nome;
            stopTimer();
            ranking(acertos)
        }

        document.getElementById("estado").value = "";

    }





    function apagarLinhas() {
        var tabelaDados = document.getElementById("tabelaDados");

        // o código abaixo cria um vetor com todos os elementos tr (linha) da tabela
        var linhas = tabelaDados.getElementsByTagName('tr');

        //length é comprimento do vetor, ou seja, a quantidade de linhas da tabela
        var quantidade = linhas.length;

        var numero = quantidade - 1;
        while (numero >= 1) {
            tabelaDados.deleteRow(numero);
            numero = numero - 1;
        }
    }



    function ranking(acertos, timerElement) {
        
        var rankings = JSON.parse(localStorage.getItem('rankings'));
        var pessoas = JSON.parse(localStorage.getItem('pessoas'));
        var posicao = JSON.parse(localStorage.getItem('posicoes'));

        var dados = new Object();
        dados.email = pessoas[posicao].email;
        dados.nome = pessoas[posicao].nome;
        dados.acerto = acertos;
        dados.tempo = updateTimer();

        posicaoRank = rankings.length;
        rankings[posicaoRank] = dados;

        //armazena o vetor na memória secundária
        localStorage.setItem('rankings', JSON.stringify(rankings));
    }




    function init() {
        if (!localStorage.rankings) {
            var rankings = [];
            localStorage.setItem('rankings', JSON.stringify(rankings));
        }


    }

    function startGame() {
        document.getElementById("inicio").style.display = "none";
        document.getElementById("container").style.display = "grid";
        startTimer()
    }
    document.getElementById("inicioJogo").addEventListener("click", startGame);
    document.getElementById("btnPalpitar").addEventListener("click", cadastrar);

    window.addEventListener('load', init);
})();