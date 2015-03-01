Pokedex.RootView.prototype.createPokemon = function (attrs, callback) {
  var pokemon = new Pokedex.Models.Pokemon(attrs);
  var rV = this;
  pokemon.save({}, {
    success: function (pokemon) {
      rV.pokes.add(pokemon);
      rV.addPokemonToList(pokemon);
      callback(pokemon);
    }
  });
};

Pokedex.RootView.prototype.submitPokemonForm = function (event) {
  event.preventDefault();
  var $currentTarget = $(event.currentTarget);
  var formData = $currentTarget.serializeJSON();
  this.createPokemon(formData['pokemon'], this.renderPokemonDetail.bind(this));
};
