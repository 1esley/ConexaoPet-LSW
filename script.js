//mock
const dadosIniciais = [
    {
        id: 1,
        nome: "Rex",
        especie: "Cachorro",
        porte: "Grande",
        idade: "Adulto",
        foto: "/images/Rex.png",
        descricao: "Brincalhão e dócil.",
        adotado: false
    },
    {
        id: 2,
        nome: "Mimi",
        especie: "Gato",
        porte: "Médio",
        idade: "Adulto",
        foto: "/images/Mimi.png",
        descricao: "Gosta de dormir no sol.",
        adotado: false
    },
    {
        id: 3,
        nome: "Bolinha",
        especie: "Cachorro",
        porte: "Pequeno",
        idade: "Idoso",
        foto: "/images/Bolinha.png",
        descricao: "Calmo, ideal para apartamento.",
        adotado: false
    },
    {
        id: 4,
        nome: "Pipoca",
        especie: "Roedores",
        porte: "Pequeno",
        idade: "Adulto",
        foto: "/images/Pipoca.png",
        descricao: "Hamster curioso e cheio de energia.",
        adotado: false
    },
    {
        id: 5,
        nome: "Minduim",
        especie: "Roedores",
        porte: "Pequeno",
        idade: "Filhote",
        foto: "/images/Minduim.png",
        descricao: "Filhote dócil que adora explorar.",
        adotado: false
    },
    {
        id: 6,
        nome: "Luna",
        especie: "Passaro",
        porte: "Pequeno",
        idade: "Adulto",
        foto: "/images/Luna.png",
        descricao: "Canário alegre que gosta de cantar pela manhã.",
        adotado: false
    },
    {
        id: 7,
        nome: "Nemo",
        especie: "Peixe",
        porte: "Pequeno",
        idade: "Adulto",
        foto: "/images/Nemo.png",
        descricao: "Peixinho tranquilo e fácil de cuidar.",
        adotado: false
    }
];


let pets = JSON.parse(localStorage.getItem("pets")) || dadosIniciais;

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

let adotados = JSON.parse(localStorage.getItem("adotados")) || [];

function salvarDados() { // só pra garantir que a gente possa atualizar sempre que quiser
    localStorage.setItem("pets", JSON.stringify(pets));

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    localStorage.setItem("adotados", JSON.stringify(adotados));
}

// deixa essa parte só pra ir setando os elementos

const petsGrid = document.getElementById("pets-grid");

const emptyState = document.getElementById("empty-state");

const sidebar = document.getElementById("sidebar-favs");

const sidebarOverlay = document.getElementById("sidebar-overlay");

const btnAbrirFavs = document.getElementById("btn-abrir-favs");

const btnFecharFavs = document.getElementById("btn-fechar-favs");

const favsList = document.getElementById("favs-list");

const favsEmpty = document.getElementById("favs-empty");

const badgeFavs = document.getElementById("badge-favs");

//seletores do modal cadastro
const modalOverlay = document.getElementById("modal-overlay");
const btnAbrirCadastro = document.getElementById("btn-abrir-cadastro");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const formPet = document.getElementById("form-pet");

//formulario
const inputNome = document.getElementById("nome");
const selectEspecie = document.getElementById("especie");
const selectPorte = document.getElementById("porte");
const selectIdade = document.getElementById("idade");
const inputFoto = document.getElementById("foto");
const textDescricao = document.getElementById("descricao");

//elementos estatistica
const divFeedback = document.getElementById("feedback");
const statTotal = document.getElementById("stat-total");
const statFavs = document.getElementById("stat-favs");
const statAdocoes = document.getElementById("stat-adocoes");

//seletores dos filtros
const filtroEspecie = document.getElementById("filtro-especie");
const filtroPorte = document.getElementById("filtro-porte");
const filtroIdade = document.getElementById("filtro-idade");
const btnLimpar = document.getElementById("btn-limpar");

// continua com as funções aq embaixo
// blz wesley :D

function abrirModal(){
    modalOverlay.hidden = false;
    inputNome.focus();
}

function fecharModal(){
    modalOverlay.hidden = true;
    formPet.reset();
    limparErrosValidacao();
}

function limparErrosValidacao(){
    const spansErro = document.querySelectorAll(".field__error");
    spansErro.forEach(span => span.textContent = "");
}

function mostrarFeedback(mensagem, tipo = "sucesso"){
    divFeedback.textContent = mensagem;
    divFeedback.className = 
    `feedback feedback--show ${tipo === "erro" ? "feedback--error" : "feedback--success"}`;
    setTimeout(() => {
        divFeedback.textContent = "";
        divFeedback.className = "feedback";
    }, 3500)
}

function atualizarEstatisticas(){
    if (statTotal) statTotal.textContent = pets.filter(pet => !pet.adotado).length;
    if (statFavs) statFavs.textContent = favoritos.length;
    if (badgeFavs) badgeFavs.textContent = favoritos.length;
}

function executarCadastro(event) {
    event.preventDefault();
    limparErrosValidacao();

    const nome = inputNome.value.trim();
    const especie = selectEspecie.value;
    const porte = selectPorte.value;
    const idade = selectIdade.value;
    const foto = inputFoto.value.trim();
    const descricao = textDescricao.value.trim();
    const adotado = false;

    let formularioValido = true;

    if (!nome) {
        document.getElementById("erro-nome").textContent = "O nome é obrigatório.";
        formularioValido = false;
    }
    if (!especie) {
        document.getElementById("erro-especie").textContent = "Selecione a espécie.";
        formularioValido = false;
    }
    if (!porte) {
        document.getElementById("erro-porte").textContent = "Selecione o porte.";
        formularioValido = false;
    }
    if (!idade) {
        document.getElementById("erro-idade").textContent = "Selecione a idade.";
        formularioValido = false;
    }
    if (!descricao) {
        document.getElementById("erro-descricao").textContent = "A descrição é obrigatória.";
        formularioValido = false;
    }

    if (!formularioValido) {
        mostrarFeedback("Por favor, preencha todos os campos obrigatórios.", "erro");
        return;
    }

    const novoPet = {
        id: Date.now(),
        nome,
        especie,
        porte,
        idade,
        foto: foto || "https://placehold.co/400x300?text=Sem+Foto+🐾",
        descricao,
        adotado
    };

    pets.push(novoPet);
    salvarDados();

    fecharModal();
    atualizarEstatisticas();
    renderizarPets();

    mostrarFeedback(`O pet ${nome} foi cadastrado com sucesso!`);
}


function renderizarFavoritos() {

    favsList.innerHTML = "";
    if (favoritos.length === 0) {
        favsEmpty.style.display = "block";
        return;
    }

    favsEmpty.style.display = "none";

    favoritos.forEach(pet => {

        const item = document.createElement("li");

        item.innerHTML = `
            <strong>${pet.nome}</strong><br>
            ${pet.especie} • ${pet.idade}
            <br><br>
            <button class="btn btn--ghost" onclick="removerFavorito(${pet.id})">Remover</button>
            <button class="btn btn--adopt" onclick="adotar(${pet.id})">Adote ❤️‍🩹</button>
        `;

        favsList.appendChild(item);
    });

}

function addFavorito(id) {

    const pet = pets.find(item => item.id === id);

    if (!pet) return;

    const jaTem = favoritos.some(item => item.id === id);

    if (jaTem) return;

    favoritos.push(pet);
    salvarDados();

    renderizarFavoritos();
    atualizarEstatisticas();
    mostrarFeedback(`${pet.nome} foi adicionado aos favoritos!`);
    // mensagem de add
}

function removerFavorito(id) {
    const pet = favoritos.find(item => item.id === id);
    favoritos = favoritos.filter(item => item.id !== id);

    salvarDados();
    renderizarFavoritos();
    atualizarEstatisticas();
    if (pet) mostrarFeedback(`${pet.nome} foi removido dos favoritos.`, "erro");
    // mensagem de removido
}

function adotar(id) {
    const pet = favoritos.find(item => item.id === id);

    pet.adotado = true;

    favoritos = favoritos.filter(item => item.id !== id);
    adotados.push(pet);

    if (statAdocoes) statAdocoes.textContent = adotados.length;

    salvarDados();
    renderizarFavoritos();
    atualizarEstatisticas();
    if (pet) mostrarFeedback(`${pet.nome} foi adotado! 😍.`);
}

window.addFavorito = addFavorito;
window.removerFavorito = removerFavorito;


// AREA DE EVENTOS (a maioria vai ser botao)

btnLimpar.addEventListener("click", () => {
    filtroEspecie.value = "";
    filtroPorte.value = "";
    filtroIdade.value = "";

    renderizarPets();
});

btnAbrirFavs.addEventListener("click", () => {
    sidebar.classList.add("open");
    sidebarOverlay.hidden = false;
});

btnFecharFavs.addEventListener("click", () => {
    sidebar.classList.remove("open");
    sidebarOverlay.hidden = true;
    window.location.reload();
});

sidebarOverlay.addEventListener("click", () => { // esse aqui é pra fechar clicando fora da barra (no overlay)
    sidebar.classList.remove("open");
    sidebarOverlay.hidden = true;
    window.location.reload();
});

btnAbrirCadastro.addEventListener("click", abrirModal);
btnFecharModal.addEventListener("click", fecharModal);

modalOverlay.addEventListener("click", (event) => {
    if(event.target === modalOverlay){
        fecharModal();
    }
})

formPet.addEventListener("submit", executarCadastro);

//Fechar modal ou sidebar com Esc
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        //modal aberto, fecha
        if (modalOverlay && !modalOverlay.hidden) {
            fecharModal();
        }
        //sidebar aberta, fecha
        if (sidebar && sidebar.classList.contains("open")) {
            sidebar.classList.remove("open");
            if (sidebarOverlay) sidebarOverlay.hidden = true;
        }
    }
});


// EVENTOS DE FILTRAGEM

if (filtroEspecie) filtroEspecie.addEventListener("change", renderizarPets);
if (filtroPorte) filtroPorte.addEventListener("change", renderizarPets);
if (filtroIdade) filtroIdade.addEventListener("change", renderizarPets);


function renderizarPets() {
    if (!petsGrid) return;

    petsGrid.innerHTML = "";

    const especieSelecionada = filtroEspecie ? filtroEspecie.value : "";
    const porteSelecionado = filtroPorte ? filtroPorte.value : "";
    const idadeSelecionada = filtroIdade ? filtroIdade.value : "";

    const petsFiltrados = pets
    .filter(pet => !pet.adotado)
    .filter(pet => !especieSelecionada || pet.especie === especieSelecionada)
    .filter(pet => !porteSelecionado || pet.porte === porteSelecionado)
    .filter(pet => !idadeSelecionada || pet.idade === idadeSelecionada);

    if (petsFiltrados.length === 0) {
        emptyState.hidden = false;
        return;
    }

    emptyState.hidden = true;

    petsFiltrados.forEach(pet => {
        
        const ehFavorito = favoritos.some(fav => fav.id === pet.id);

        const card = document.createElement("div");
        card.className = `pet-card ${ehFavorito ? 'pet-card__success' : ''}`;

        card.innerHTML = `
            <div class="pet-card__image-container">
                <img src="${pet.foto}" alt="Foto de ${pet.nome}" class="pet-card__img" />
            </div>
            <div class="pet-card__content">
                <h3 class="pet-card__name">${pet.nome}</h3>
                <div class="pet-card__tags">
                    <span class="tag">${pet.especie}</span>
                    <span class="tag">${pet.porte}</span>
                    <span class="tag">${pet.idade}</span>
                </div>
                <p class="pet-card__description">${pet.descricao}</p>
                
                <button class="btn ${ehFavorito ? 'btn--success' : 'btn--primary'} btn-fav-action" data-id="${pet.id}">
                    ${ehFavorito ? "Interessado" : "Tenho interesse"}
                </button>
            </div>
        `;

        const btnFav = card.querySelector(".btn-fav-action");
        
        btnFav.addEventListener("click", () => alternarFavoritoCard(pet.id));
        
        petsGrid.appendChild(card);
    });
}

function alternarFavoritoCard(id){
    const jaEhFavorito = favoritos.some(fav => fav.id === id);

    if(jaEhFavorito){
        removerFavorito(id);
    }else{
        addFavorito(id);
    }
    renderizarPets();
}


// final de tudo tem que ficar renderizando - INICIALIZAÇÃO DO APP

renderizarFavoritos();
renderizarPets();
atualizarEstatisticas();