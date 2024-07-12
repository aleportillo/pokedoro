const getPokemon = () => {
    const numberPokemon = Math.floor(Math.random() * 100)+1;
    return fetch(`https://pokeapi.co/api/v2/pokemon/${numberPokemon}`)
      .then(response => response.json())
      .then(json => _parseData(json))
}


const _parseData = (data) => {
    console.log(data);

    // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/8.gif
    
    return {
        background : data.sprites.other.dream_world.front_default,
        number: `${data.id}`.padStart(5, '0'),
        type: data.types[0].type,
        name: data.species.name,
        gif: data.sprites.versions['generation-v']['black-white']['animated'].front_default || data.sprites.other.showdown.front_default
    }   
}