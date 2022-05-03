class PokemonClient {
  async fetchPokemonData(id) {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((data) => data.json());
  }
}

export const pokemonClient = new PokemonClient();