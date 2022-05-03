import { POKEMON_TYPES } from "./pokemon.types.js";

import { createAction } from "../../core/utils/createAction.js";

export function addPokemon(pokemons, pokemonToAdd) {
  return createAction(POKEMON_TYPES.SET_POKEMONS, addPokemonHelper(pokemons, pokemonToAdd));
}

function addPokemonHelper(pokemons, pokemonToAdd) {
  const newPokemons = [...pokemons, pokemonToAdd].sort((a, b) => a.id - b.id);
  return newPokemons;
}