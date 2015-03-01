Pokedex.Router = Backbone.Router.extend({
  routes: {
    "" : "pokemonIndex",
    "pokemon/:id" : "pokemonDetail",
    "pokemon/:pokemonId/toys/:toyId" : "toyDetail"
  },

  pokemonDetail: function (id, callback) {
    if (this._pokemonIndex) {
      var pokemon = this._pokemonIndex.collection.get(id)
      this._pokemonDetail = new Pokedex.Views.PokemonDetail(pokemon);
      this._pokemonDetail.refreshPokemon({}, callback);
      $("#pokedex .pokemon-detail").html(this._pokemonDetail.$el);
    } else {
      this.pokemonIndex(this.pokemonDetail.bind(this, id, callback));
    }
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    this._pokemonIndex.refreshPokemon({}, callback);
    $("#pokedex .pokemon-list").html(this._pokemonIndex.$el);
    $("#pokedex .pokemon-detail").empty();
    this.pokemonForm();
  },

  toyDetail: function (pokemonId, toyId, callback) {
    if (this._pokemonDetail) {
      var toy = this._pokemonDetail.model.toys().get(toyId)
      this._toyDetail = new Pokedex.Views.ToyDetail(toy, this._pokemonIndex.collection) ////
      $("#pokedex .toy-detail").html(this._toyDetail.$el)
      this._toyDetail.render(callback); ///////
    } else {
      this.pokemonDetail(pokemonId, this.toyDetail.bind(this, pokemonId, toyId, callback));
    }
  },

  pokemonForm: function () {
    this._pokemonForm = new Pokedex.Views.PokemonForm(this._pokemonIndex.collection);
    $('#pokedex .pokemon-form').html(this._pokemonForm.$el);
    this._pokemonForm.render();
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
