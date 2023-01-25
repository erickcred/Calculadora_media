const form = document.getElementById("form-atividade");
const mensagem = document.getElementById("nome-mensagem");
let nomeAtividade = document.getElementById("nome-atividade");
let notaAtividade = document.getElementById("nota");
let medias = new Array;

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (atividadeJaExiste(nomeAtividade.value)) { return }

    criaLinha();
    calculaMedia();
    form.reset();
});

function criaLinha() {
    let tbody = document.querySelector("table tbody");
    let tr = document.createElement("tr");
    let tdNome = document.createElement("td");
    let tdNota = document.createElement("td");
    let tdEmoji = document.createElement("td");
    let imgEmoji = document.createElement("img");
    
    tdNome.textContent = nomeAtividade.value;
    tdNota.textContent = notaAtividade.value;
    tdEmoji.appendChild(imgEmoji);

    apresentaEmoji(parseInt(notaAtividade.value), imgEmoji);

    medias.push(notaAtividade.value);

    tr.appendChild(tdNome);
    tr.appendChild(tdNota);
    tr.appendChild(tdEmoji);
    tbody.appendChild(tr);
}

function calculaMedia() {
    let resultado = 0;
    for (let media of medias) {
        resultado += parseFloat(media);
    }
    resultado = resultado / medias.length;

    apresentaMedia(resultado);
    aprovado(resultado);
}

function apresentaEmoji(nota, imagem) {
    imagem.src = nota >= 7 ? "./assets/image/aprovado.png" : "./assets/image/reprovado.png";
    imagem.alt = nota >= 7 ? "Emoji festejando" : "Emoji triste";
}

function aprovado(media) {
    let tdAprovado = document.getElementById("resultado-valor");

    tdAprovado.innerHTML = media >= 7 ? "Aprovado" : "Reprovado";
    tdAprovado.classList.add(media >= 7 ? "aprovado" : "reprovado");
    tdAprovado.classList.remove(media >= 7 ? "reprovado" : "aprovado");
}

function apresentaMedia(media) {
    document.querySelectorAll("tfoot tr td")[1].textContent = media.toFixed(2);
}


function atividadeJaExiste(nome) {
    let nomes = document.querySelectorAll("tbody tr td");

    for (let item of nomes) {
        if (nome === item.textContent) {
            mensagem.style ="display: block";
            nomeAtividade.classList.add("input-error");
            mostraMensagem("Essa atividade já esta cadastrada!");
            return true;
        } else {
            mensagem.style ="display: none";
            return false;
        }
    }
}
nomeAtividade.addEventListener("click", () => {
    nomeAtividade.classList.remove("input-error");
    mensagem.style ="display: none";
});

function mostraMensagem(texto) {
    mensagem.textContent = texto;
}