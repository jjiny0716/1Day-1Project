import { combineReducers } from "../core/combineReducers.js";
import { pokemonReducer } from "./pokemon/pokemon.reducer.js";

export const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});
