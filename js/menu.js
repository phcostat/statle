function mostrarUsuario() {
    var pessoas = JSON.parse(localStorage.getItem('pessoas'));
    
    var posicao = JSON.parse(localStorage.getItem('posicoes'));
    document.getElementById("logado").innerText = "Olá, " + pessoas[posicao].nome;
    document.getElementById("nav-logado").innerText = "Olá, " + pessoas[posicao].nome;
}