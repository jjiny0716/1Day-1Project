import Component from './core/Component.js';
import PokemonCards from './components/PokemonCards.js';

import { pokemonClient } from './client/pokemonClient.js';

import { store } from './store/store.js';
import { addPokemon } from './store/pokemon/pokemon.action.js';

import { POKEMON_NUMBER } from './constants/pokemon.constants.js';

export default class App extends Component {
  template() {
    return `
    <h1 class="title">PokeDex</h1>
    <div class="pokemon-card-container" data-component="PokemonCards"></div>
    `
  }

  generateChildComponent(target, name) {
    switch(name) {
      case "PokemonCards": 
        return new PokemonCards(target);
    }
  }

  afterMount() {
    for (let i = 1 ; i <= POKEMON_NUMBER ; i++) {
      this.addPokemonToStore(i);
    }
  }

  async addPokemonToStore(id) {
    const pokemon = await pokemonClient.fetchPokemonData(id);
    const { pokemons } = store.getState().pokemon;

    store.dispatch(addPokemon(pokemons, pokemon));
  }
}