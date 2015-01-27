Pokedex.RootView.prototype.reassignToy = function(event, toy) {
  var oldPokemonId = toy.get("pokemon_id");
  var oldPokemon = this.pokes.get(oldPokemonId);
  var rV = this;
  oldPokemon.fetch({success: function(pokemon){
    pokemon.toys().remove(toy);
    $(".toy-detail").empty();
    rV.renderToysList(pokemon.toys());
    }
  });

  var newPokemonId = $(event.currentTarget).val()
  toy.set("pokemon_id", newPokemonId);

  var newPokemon = this.pokes.get(newPokemonId);
  newPokemon.fetch({success: function(pokemon){
    pokemon.toys().add(toy);
    }
  });

  toy.save();
}

Pokedex.RootView.prototype.renderToysList = function (toys) {
  var rV = this;
  $(".toys-ul").empty(); // or this.$pokeDetail.find(".toys")
  toys.each(function(toy){
    rV.addToyToList(toy);
  });
};
