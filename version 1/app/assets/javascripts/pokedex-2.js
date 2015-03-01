Pokedex.RootView.prototype.addToyToList = function (toy) {
  var $toyLi = $("<li class='toy-li'>")
  $toyLi.data("toy-id", toy.id);
  $toyLi.data("pokemon-id", toy.get("pokemon_id"));

  $toyLi.text("Name: " + toy.get("name"));
  $('.toys-ul').append($toyLi);
};

Pokedex.RootView.prototype.renderToyDetail = function (toy) {
  var $toyDiv = $("<div class='toy-detail'><ul>");

  _.each(toy.attributes, function (value, key) {
    var $li = $("<li>");
    $li.text(key + ": " + value);
    $toyDiv.find("ul").append($li);
  });

  $toyDiv.append('<img src="' + toy.get("image_url") + '">')

  var $ownerSelect = $('<select>')
  this.pokes.each(function(pokemon) {
    if (pokemon.id === toy.get("pokemon_id")) {
      var defSelPoke = "selected"
    } else {
      var defSelPoke = ""
    }
    $ownerSelect.append('<option ' + defSelPoke + ' value="' + pokemon.id + '">' + pokemon.get("name"));

  });

  $ownerSelect.on('change', function(event) {
    this.reassignToy(event, toy);
  }.bind(this));

  $toyDiv.append($ownerSelect)

  this.$toyDetail.html($toyDiv);
};

Pokedex.RootView.prototype.selectToyFromList = function (event) {
  $currentTarget = $(event.currentTarget);
  var toy_id = $currentTarget.data("toy-id");
  var pokemon_id = $currentTarget.data("pokemon-id");
  var pokemon = new Pokedex.Models.Pokemon({id: pokemon_id});
  var rV = this;
  pokemon.fetch({
    success: function(pokemon) {
      var toy = pokemon.toys().get(toy_id);
      rV.renderToyDetail(toy);
    }
  });
};
