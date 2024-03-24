(function () {

    var palpites = [5];
    var posicao = 0;
    var i = 0;

    function mostrarUsuario() {
        var pessoas = JSON.parse(localStorage.getItem('pessoas'));

        var posicao = JSON.parse(localStorage.getItem('posicoes'));
        document.getElementById("logado").innerText = "Usuário: " + pessoas[posicao].nome;
    }





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
        }
    }

    function cadastrar() {


        if (posicao > 4) {

            document.getElementById("formularioDados").style.display = "none";
            document.getElementById("resultado-derrota").style.display = "block";
            document.getElementById("resposta-correta").innerText = images[currentImageIndex].nome;
            document.getElementById("estado").value = "";

        } else {
            var estado = document.getElementById("estado").value;

            var cont = 0;
            var quantidade = 0;
            while (cont < posicao) {
                if (estado == palpites[cont]) {
                    quantidade = quantidade + 1
                }
                cont = cont + 1
            }


            if (quantidade == 0) {
                var tabelaDados = document.getElementById("tabelaDados");
                var linha = tabelaDados.insertRow(1)
                var coluna1 = linha.insertCell(0);
                var coluna2 = linha.insertCell(1);

                coluna1.innerText = estado;

                if (estado.toUpperCase() == images[currentImageIndex].nome.toUpperCase()) {
                    coluna2.innerText = "Acertou!";
                    document.getElementById("formularioDados").style.display = "none";
                    document.getElementById("tabelaDados").style.display = "none";
                    document.getElementById("resultado-vitoria").style.display = "block";
                    nextImage()

                } else {
                    coluna2.innerText = "Errado!";
                }

                palpites[posicao] = estado;



                posicao = posicao + 1;
                document.getElementById("estado").value = "";

            } else {
                alert("O estado já foi palpitado")
                document.getElementById("estado").value = "";
            }

            if (posicao > 4) {

                document.getElementById("formularioDados").style.display = "none";
                document.getElementById("resultado-derrota").style.display = "block";
                document.getElementById("resposta-correta").innerText = images[currentImageIndex].nome;
                document.getElementById("estado").value = "";

            }
        }

    }


    function apagarLinhas() {
        var tabelaDados = document.getElementById("tabelaDados");

        var linhas = tabelaDados.getElementsByTagName('tr');

        
        var quantidade = linhas.length;

        var numero = quantidade - 1;
        while (numero >= 1) {
            tabelaDados.deleteRow(numero);
            numero = numero - 1;
        }
    }

    function init() {
        shuffleArray(images);
        console.log(images);

        let currentImageIndex = 0;
        document.getElementById("titulo").innerText = "Estado: " + (currentImageIndex + 1) + "/26";

        mostrarUsuario();
        showImage();

    
    }

    // Chamada da função de inicialização
    init();

    document.getElementById("btnPalpitar").addEventListener("click", cadastrar);

})();