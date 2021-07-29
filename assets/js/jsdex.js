let pokemonSprite = document.getElementById("pokemon-sprite");
let pokeName = document.getElementById("pokemon-name");
let type = document.getElementById("pokemon-type");

let jsScreen = document.getElementById("jsdex-screen");

/* Initial config */
var pokemonId = 1;
var screenActivated = false;
changePokemon(1);

const pokemonIdLimit = () => {
  if (pokemonId < 1) {
    pokemonId = 1;
  } else if (pokemonId > 898) {
    pokemonId = 898;
  }
};

/* JSdex commands */
function togglePower() {
  if (screenActivated) {
    jsScreen.style.transform = "scale(1,0)";
    jsScreen.style.visibility = "hidden";
    screenActivated = false;
  } else {
    jsScreen.style.transform = "scale(1,1)";
    jsScreen.style.visibility = "initial";
    screenActivated = true;
  }
}

function changePokemon(id) {
  pokemonSprite.setAttribute("src","https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif");
  pokemonSprite.setAttribute("width", "96px");
  fetch("https://pokeapi.co/api/v2/pokemon/" + id)
    .then((resp) => resp.json())
    .then((pokemon) => {
      pokemonSprite.setAttribute("src", pokemon.sprites.front_default);
      pokeName.innerHTML = "Name: " + pokemon.name;
      type.innerHTML = "Type: " + pokemon.types.map((type) => type.type.name);
      console.log(pokemon);
    });
}

/* Arrows Buttons Commands */
function nextPokemon() {
  if (screenActivated === true) {
    pokemonId++;
    pokemonIdLimit();
    changePokemon(pokemonId);
  }
}

function prevPokemon() {
  if (screenActivated === true) {
    pokemonId--;
    pokemonIdLimit();
    changePokemon(pokemonId);
  }
}
