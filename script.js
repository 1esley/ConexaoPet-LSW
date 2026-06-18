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