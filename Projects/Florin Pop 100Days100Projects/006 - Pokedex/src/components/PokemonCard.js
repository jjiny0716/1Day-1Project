import Component from '../core/Component.js';

import { COLORS } from '../constants/pokemon.constants.js';

export default class PokemonCard extends Component {
  template() {
    const { idStr, name, imageLink, type } = this.props;

    return `
    <div class="pokemon-image-wrapper">
      <img src="${imageLink}" alt="${name}" loading="lazy" />
    </div>
    <p class="pokemon-id">${idStr}</p>
    <h3 class="pokemon-name">${name}</h3>
    <p class="pokemon-type">Type: ${type}</p>
    `
  }

  afterMount() {
    const { type } = this.props;
    this.target.style = `background-color: ${COLORS[type]};`; 
  }

  afterUpdate() {
    const { type } = this.props;
    this.target.style = `background-color: ${COLORS[type]};`; 
  }
}