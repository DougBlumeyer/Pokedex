Pokedex.Views = (Pokedex.Views || {});

Pokedex.Views.PokemonForm = Backbone.View.extend({
  events: {
    "submit form" : "savePokemon"
  },

  initialize: function (collection) {
    this.model = new Pokedex.Models.Pokemon();
    this.collection = collection;
  },

  render: function () {
    var content = JST['pokemonForm']({ pokemon: this.model });
    this.$el.append(content);
    //callback && callback();
  },

  savePokemon: function (event) {
    event.preventDefault();
    this.model.set($(event.currentTarget).serializeJSON()["pokemon"])
    this.model.save({}, { success: function () {
      this.collection.add(this.model);
      Backbone.history.navigate("pokemon/" + this.model.id, { trigger: true });
    }.bind(this)});
  }
});
