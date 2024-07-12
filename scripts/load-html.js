let globalPokemon = {
    color: '',
    number: 0,
    gif: ''
}

async function getPokemonData() {
    const pokemon = await getPokemon();
    console.log(pokemon);
    globalPokemon.color = `var(--${pokemon.type.name})`;
    globalPokemon.number = Number(pokemon.number);
    globalPokemon.gif = pokemon.gif;
    setHtmlData(pokemon);
}

getPokemonData();

const loadColor = () => {
    const color = globalPokemon.color;
    document.querySelector('body').style.backgroundColor = color;    
    document.querySelector('.pokemon__pomodoro-time--overlay').style.color = color;    
    document.querySelector('.pokemon__data-id').style.color = color;
    document.querySelector('.pokemon__data-name').style.color = color;
}

const setHtmlData = (pokemon) => {
    loadColor();
    document.querySelector('#pokemon-gif').src = pokemon.gif;
    document.querySelector('.pokemon__data-id').innerHTML = `#${pokemon.number}`;
    document.querySelector('.pokemon__data-name').innerHTML =  pokemon.name.toUpperCase();
}