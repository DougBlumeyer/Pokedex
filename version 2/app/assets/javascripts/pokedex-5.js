Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li": "selectPokemonFromList"
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();
  },

  addPokemonToList: function (pokemon) {
    var content = JST['pokemonListItem']({pokemon: pokemon});
    this.$el.append(content);
  },

  refreshPokemon: function (options, callback) {
    var pI = this;
    this.collection.fetch({
      success: function () {
        pI.render();
        callback && callback();
      }
    });
  },

  render: function () {
    this.$el.empty();
    this.collection.each(function(pokemon) {
      this.addPokemonToList(pokemon);
    }.bind(this));
  },

  selectPokemonFromList: function (event) {
    var pokeId = $(event.currentTarget).data("id");
    $('.toy-detail').empty();
    Backbone.history.navigate("pokemon/" + pokeId, { trigger: true });
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    "click li.toy-list-item" : "selectToyFromList",
    "dblclick div.detail" : "beginEditing",
    "submit form" : "endEditing",
    "click button" : "deletePokemon"
  },

  initialize: function (model) {
    this.model = model;
    this.open = false;
  },

  refreshPokemon: function (options, callback) {
    var pD = this;
    this.model.fetch({
      success: function () {
        pD.render();
        callback && callback();
      }
    });
  },

  render: function () {
    if (this.open) {
      var content = JST['pokemonDetailEdit']({pokemon: this.model})
    } else {
      var content = JST['pokemonDetail']({pokemon: this.model});
    }
    this.$el.html(content)

    this.model.toys().each(function(toy) {
      this.$el.append(JST['toyListItem']({toy: toy}));
    }.bind(this));
  },

  selectToyFromList: function (event) {
    var toyId = $(event.currentTarget).data("id");
    var pokeId = $(event.currentTarget).data("pokemon-id"); //haha, this is just the model
    Backbone.history.navigate(
      "pokemon/" + pokeId + "/toys/" + toyId,
      { trigger: true }
    );
  },

  beginEditing: function (event) {
    this.open = true;
    this.render();
  },

  endEditing: function (event) {
    event.preventDefault();
    this.open = false;
    this.model.set($(event.currentTarget).serializeJSON()["pokemon"])
    this.model.save({}, { success: function() {
      this.render();
    }.bind(this)});
  },

  deletePokemon: function (event) {
    event.preventDefault();
    var proceed = confirm("Are you sure you want to delete " + this.model.get("name") + "?");
    if (proceed) {
      this.model.destroy();
      //this.render();
      Backbone.history.navigate("", { trigger: true });
    }
  }

});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  events: {
    "change select" : "reassignToy"
  },

  initialize: function (model, collection) {
    this.model = model;
    this.collection = collection;
  },

  render: function (callback) {
    var content = JST['toyDetail']({toy: this.model, pokes: this.collection});
    this.$el.html(content);
    callback && callback();
  },

  reassignToy: function (event) {
    var $currentTarget = $(event.currentTarget);

    var oldPoke = this.collection.get($currentTarget.data("pokemon-id"));
    //var toy = pokemon.toys().get($currentTarget.data("toy-id"));
    this.model.set("pokemon_id", $currentTarget.val());
    this.model.save({}, {
      success: (function () {
        oldPoke.toys().remove(this.model);
        this.render();
        Backbone.history.navigate("pokemon/" + oldPoke.id, { trigger: true });
      }).bind(this)
    });
  }
});
