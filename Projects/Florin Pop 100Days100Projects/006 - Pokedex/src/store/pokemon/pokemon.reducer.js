import { POKEMON_TYPES } from './pokemon.types.js';

const POKEMON_INITIAL_STATE = {
  pokemons: [],
}

export function pokemonReducer(state = POKEMON_INITIAL_STATE, action = {}) {
  const { type, payload } = action;
  
  switch(type) {
    case POKEMON_TYPES.SET_POKEMONS:
      return {
        ...state,
        pokemons: payload,
      }
    default:
      return state;
  }
}