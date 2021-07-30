const jsdex = {
  screenOn: false,
  pokemonId: 1,

  /*----- BUTTONS AND BUTTONS METHODS */
  buttons: {
    powerButton: document.getElementById("power"),

    keyUp: document.getElementById("key-up"),
    keyDown: document.getElementById("key-down"),
  },

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

  nextPokemon: function () {
    if (this.screenOn) {
      this.pokemonId++;
      this.pokemonIdLimiter();
      this.changePokemon(this.pokemonId);
    }
  },

  prevPokemon: function () {
    if (this.screenOn) {
      this.pokemonId--;
      this.pokemonIdLimiter();
      this.changePokemon(this.pokemonId);
    }
  },

  /*----- JSDEX SCREEN METHODS */
  jsScreen: {
    screenDex: document.getElementById("jsdex-screen"),

    pokemonSprite: document.getElementById("pokemon-sprite"),
    pokemonName: document.getElementById("pokemon-name"),
    pokemonType: document.getElementById("pokemon-type"),
  },

  /*----- SUBSCREEN METHODS */
  subScreen: {
    screenSub: document.getElementById("sub-screen"),
    subName: document.getElementsByClassName("sub-names"),

    refreshSubNames: function () {
      setPokemonSubNamesId(jsdex.pokemonId - 2, 0);
      setPokemonSubNamesId(jsdex.pokemonId - 1, 1);
      setPokemonSubNamesId(jsdex.pokemonId, 2);
      setPokemonSubNamesId(jsdex.pokemonId + 1, 3);
      setPokemonSubNamesId(jsdex.pokemonId + 2, 4);

      function setPokemonSubNamesId(id, index) {
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
