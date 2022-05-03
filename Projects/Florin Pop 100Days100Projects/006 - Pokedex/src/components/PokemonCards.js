import Component from '../core/Component.js';
import PokemonCard from './PokemonCard.js';

import { store } from '../store/store.js';

export default class PokemonCards extends Component {
  template() {
    const { pokemons } = store.getState().pokemon;
    
    return `
    ${pokemons.map((_, i) => `<div class="pokemon-card" data-component="PokemonCard" data-key="${i}"></div>`).join('')}
    `
  }

  generateChildComponent(target, name, key) {
    switch(name) {
      case "PokemonCard":
        return new PokemonCard(target, () => {
          const { pokemons } = store.getState().pokemon;
          const pokemon = pokemons[key];
          const types = [pokemon.types[0].type.name, pokemon.types[1] && pokemon.types[1].type.name]
          return {
            idStr: "#" + pokemon.id.toString().padStart(3, "0"),
            name: pokemon.name,
            type: types[1] ? (types[0] === "normal" ? types[1] : types[0]) : types[0],
            imageLink: pokemon.sprites.other["official-artwork"]["front_default"],
          }
        })
    }
  }

  afterMount() {

  }
}