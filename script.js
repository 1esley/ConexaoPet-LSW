// lista de mock data (talvez a gnt mude isso dps)
const dadosIniciais = [
    {
        id: 1,
        nome: "Rex",
        especie: "Cachorro",
        porte: "Grande",
        idade: "Adulto",
        foto: "/images/Rex.png", // isso é parte de um teste, ainda preciso saber como vai ser a inserção da foto
        descricao: "Brincalhão e dócil."
    },
    {
        id: 2,
        nome: "Mimi",
        especie: "Gato",
        porte: "Pequeno",
        idade: "Filhote",
        descricao: "Gosta de dormir no sol."
    },
    {
        id: 3,
        nome: "Bolinha",
        especie: "Cachorro",
        porte: "Pequeno",
        idade: "Idoso",
        descricao: "Calmo, ideal para apartamento."
    }
];


let pets = JSON.parse(localStorage.getItem("pets")) || dadosIniciais;

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function salvarDados() { // só pra garantir que a gente possa atualizar sempre que quiser
    localStorage.setItem("pets", JSON.stringify(pets));

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// aqui agora é CACETE, deixa essa parte só pra ir setando os elementos

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
const modalOverlay = document.getElementById("modalOverlay");
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
	`feedback feedback--show ${tipo === "erro" ? "feedback--erro" : "feedback--sucesso"}`;
	setTimeout(() => {
		divFeedback.textContent = "";
		divFeedback.className = "feedback";
	}, 3500)
}

function atualizarEstatisticas(){
	if (statTotal) statTotal.textContent = pets.length;
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
        id: Date.now(), // ID numerico
        nome,
        especie,
        porte,
        idade,
        foto: foto || "https://placehold.co/400x300?text=Sem+Foto+🐾",
        descricao
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
    // mensagem de add
}

function removerFavorito(id) {
    favoritos = favoritos.filter(item => item.id !== id);

    salvarDados();
    renderizarFavoritos();
    // mensagem de removido
}

window.addFavorito = addFavorito;
window.removerFavorito = removerFavorito;


// AREA DE EVENTOS (EM TESTE AINDA)

btnAbrirFavs.addEventListener("click", () => {
    sidebar.classList.add("open");
    sidebarOverlay.hidden = false;
});

btnFecharFavs.addEventListener("click", () => {
    sidebar.classList.remove("open");
    sidebarOverlay.hidden = true;
});

sidebarOverlay.addEventListener("click", () => { // esse aqui é pra fechar clicando fora da barra (no overlay)
    sidebar.classList.remove("open");
    sidebarOverlay.hidden = true;
});

btnAbrirCadastro.addEventListener("click", abrirModal);
btnFecharModal.addEventListener("click", fecharModal);

modalOverlay.addEventListener("click", (event) => {
	if(event.target === modalOverlay){
		fecharModal();
	}
})

formPet.addEventListener("submit", executarCadastro);


// final de tudo tem que ficar renderizando

renderizarFavoritos();
atualizarEstatisticas();

function renderizarPets(){
	console.log("isto eh somente um place holder para nao quebrar")
}
