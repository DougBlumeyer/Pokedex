Pokedex.RootView.prototype.addPokemonToList = function (pokemon) {
  var $li = $("<li class='poke-list-item'><ul>");
  $li.find("ul").append($("<li>").text("Name: " + pokemon.get('name')));
  $li.find("ul").append($("<li>").text("Type: " + pokemon.get('poke_type')));
  $li.data("id", pokemon.id);
  this.$pokeList.append($li);
};

Pokedex.RootView.prototype.refreshPokemon = function (callback) {
  this.pokes.fetch({
    success: function(pokes) {
      pokes.each( function(pokemon) {
        Pokedex.rootView.addPokemonToList(pokemon);
      })
    }
  });
};
