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


// continua com as funções aq embaixo

    // ainda vou renderizar os cards aqui, mas é mais chatinho e não consigo fazer agora

function renderizarFavoritos() {

    favsList.innerHTML = "";
    if (favoritos.lenght === 0) {
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




// final de tudo tem que ficar renderizando


renderizarFavoritos();