const pokemonCardContainer = document.querySelector(".pokemon-card-container");
const pokemonNumber = 150;
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

async function fetchPokemonData(id) {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((data) => data.json());
}

async function makePokemonCard(pokemon) {
  const idStr = "#" + pokemon.id.toString().padStart(3, "0");
  const name = pokemon.name;
  const types = [pokemon.types[0].type.name, pokemon.types[1] && pokemon.types[1].type.name];
  const type = types[1] ? (types[0] === "normal" ? types[1] : types[0]) : types[0];
  const imageLink = pokemon.sprites.other["official-artwork"]["front_default"];

  const card = document.createElement("div");
  card.className = "pokemon-card";
  card.style.backgroundColor = colors[type];
  card.innerHTML = `
    <div class="pokemon-image-wrapper">
    <img src="${imageLink}" alt="${name}" />
    </div>
    <p class="pokemon-id">${idStr}</p>
    <h3 class="pokemon-name">${name}</h3>
    <p class="pokemon-type">Type: ${type}</p>
  `;
  return card;
}

async function addCardToContainer(card) {
  const idx = findInsertIndex(getCardId(card));

  if (pokemonCardContainer.childNodes === undefined || idx === pokemonCardContainer.childNodes.length) {
    pokemonCardContainer.appendChild(card);
  } 
  else {
    // console.log(`different timing! id: ${idx}`);
    pokemonCardContainer.insertBefore(card, pokemonCardContainer.childNodes[idx]);
  }
}

function getCardId(card) {
  return Number(card.querySelector(".pokemon-id").textContent.slice(1, 4));
}

function findInsertIndex(id) {
  let left = 0;
  let right = pokemonCardContainer.childNodes.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (getCardId(pokemonCardContainer.childNodes[mid]) < id) left = mid + 1;
    else if (getCardId(pokemonCardContainer.childNodes[mid]) > id) right = mid - 1;
  }

  return left;
}

for (let id = 1; id <= pokemonNumber; id++) {
  fetchPokemonData(id).then(makePokemonCard).then(addCardToContainer);
}
