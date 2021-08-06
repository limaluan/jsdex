const jsdex = {
  screenOn: false,
  pokemonId: 1,

  /*----- BUTTONS ------*/
  // The buttons property get the HTML elements for use on JS
  buttons: {
    powerButton: document.getElementById("power"),

    keyUp: document.getElementById("key-up"),
    keyDown: document.getElementById("key-down"),
  },

  // Toggle Power of screens of jsdex
  togglePower: function () {
    if (this.screenOn) {
      this.jsScreen.screenDex.style.transform = "scale(1,0)";
      this.jsScreen.screenDex.style.visibility = "hidden";

      this.subScreen.screenSub.style.visibility = "hidden";

      this.screenOn = false;
    } else {
      this.jsScreen.screenDex.style.transform = "scale(1,1)";
      this.jsScreen.screenDex.style.visibility = "initial";

      this.subScreen.screenSub.style.visibility = "initial";

      this.screenOn = true;
    }
  },

  // Change to the next Pokemon
  nextPokemon: function () {
    if (this.screenOn) {
      this.pokemonId++;
      this.pokemonIdLimiter();
      this.changePokemon(this.pokemonId);
    }
  },

  // Change to the previous Pokemon
  prevPokemon: function () {
    if (this.screenOn) {
      this.pokemonId--;
      this.pokemonIdLimiter();
      this.changePokemon(this.pokemonId);
    }
  },

  /*----- JSDEX SCREEN ------*/
  /*----- jsScreen property get the HTML elements to use on JS -------*/
  jsScreen: {
    screenDex: document.getElementById("jsdex-screen"),

    pokemonSprite: document.getElementById("pokemon-sprite"),
    pokemonName: document.getElementById("pokemon-name"),
    pokemonType: document.getElementById("pokemon-type"),
  },

  /*----- SUBSCREEN -------*/
  /* subScreen property get the HTML elements to use in JS */
  subScreen: {
    screenSub: document.getElementById("sub-screen"), // Refers to the mini screen in the jsdex interface
    subName: document.getElementsByClassName("sub-names"), // Refers to the names of pokemon on the subScreen

    // refreshSubNames method update the names that is showed on the subScreen
    refreshSubNames: function () {
      getPokemonSubNamesId(jsdex.pokemonId - 2, 0);
      getPokemonSubNamesId(jsdex.pokemonId - 1, 1);
      getPokemonSubNamesId(jsdex.pokemonId, 2);
      getPokemonSubNamesId(jsdex.pokemonId + 1, 3);
      getPokemonSubNamesId(jsdex.pokemonId + 2, 4);

      // getPokemonSubNamesId get the name and Id for use on refreshSubNames method above
      function getPokemonSubNamesId(id, index) {
        fetch("https://pokeapi.co/api/v2/pokemon/" + id)
          .then((resp) => resp.json())
          .then((pokemon) => {
            jsdex.subScreen.subName[index].innerHTML =
              pokemon.id + ": " + pokemon.name;
          })
          .catch(() => {
            jsdex.subScreen.subName[index].innerHTML = "-------------";
          });
      }
    },
  },

  /* Change the pokémon to be shown */
  changePokemon: function (id) {
    this.jsScreen.pokemonSprite.setAttribute(
      "src",
      "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
    );
    this.jsScreen.pokemonSprite.setAttribute("width", "96px");
    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
      .then((resp) => resp.json())
      .then((pokemonData) => {
        this.jsScreen.pokemonSprite.setAttribute(
          "src",
          pokemonData.sprites.front_default
        );
        this.jsScreen.pokemonName.innerHTML = "Name: " + pokemonData.name;
        this.jsScreen.pokemonType.innerHTML =
          "Type: " + pokemonData.types.map((type) => type.type.name);
        this.subScreen.refreshSubNames();
        console.log(pokemonData);
        console.log("https://pokeapi.co/api/v2/pokemon/");
      });
  },

  /* Limits Pokemon Id can enter */
  pokemonIdLimiter: function () {
    if (this.pokemonId < 1) {
      this.pokemonId = 1;
    } else if (this.pokemonId > 898) {
      this.pokemonId = 898;
    }
  },
};

/* Initial Config */
jsdex.changePokemon(jsdex.pokemonId);
