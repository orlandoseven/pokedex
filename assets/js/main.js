

const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const modal =document.getElementById('pokemon-modal')

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
        
            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
             </div>
        </li>
        `;
}

function cardModal(pokemon) {
  const modal = document.getElementById("pokemon-modal")
  const cardName = document.getElementById("pokemon-name");
  const cardPhoto = document.getElementById("pokemon-image");
  const cardType = document.getElementById("pokemon-type");
  const cardWeight = document.getElementById("pokemon-weight");
  const cardHeight = document.getElementById("pokemon-height");

  cardName.textContent = pokemon.name;
  cardPhoto.src = pokemon.photo;
  cardType.textContent = `Tipo: ${pokemon.type}`;
  cardWeight.textContent = `Peso: ${pokemon.weight /10} kg`;
  cardHeight.textContent = `Altura: ${pokemon.height /10} m`;

//  modal.classList.add('.show');
}
//mmodal
const switchModal = () => {
  const modal = document.querySelector(".modal");
  const actualStyle = modal.style.display;
  if (actualStyle == "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
};
pokemonList.addEventListener("click", switchModal);
window.onclick = function (event) {
  const modal = document.querySelector(".modal");
  if (event.target == modal) {
    switchModal();
  }
};

// document.querySelector(".close-button").addEventListener("click",() =>{
//   modal.classList.remove('.show');
// });

function addPokemonClickEvent(){
    const pokemonElement = pokemonList.querySelectorAll('li.pokemon');

    pokemonElement.forEach((element) => {
        element.addEventListener("click",()=>{
            const pokemonId = element.getAttribute('data-id');

            pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}` })
            .then((pokemonDetail) =>{
                cardModal(pokemonDetail)
            })
          
        })
    })
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
    addPokemonClickEvent()
  });
}
loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdNextPage = offset + limit;

  if (qtdNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});



