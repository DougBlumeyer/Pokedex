Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  var $div = $('<div class="detail" data-id="' + pokemon.id + '"><ul>');
  var $divUl = $div.find("ul");
  // _.each(pokemon.attributes, function (value, key) {
  //   var $li = $("<li>");
  //   $li.text(key + ": " + value);
  //   $div.find("ul").append($li);
  // });

  $divUl.append("<li><label>Name: </label><span id='name'>" + pokemon.get("name"));
  $divUl.append("<li><label>Attack: </label><span id='attack'>" + pokemon.get("attack"));
  $divUl.append("<li><label>Defense: </label><span id='defense'>" + pokemon.get("defense"));
  $divUl.append("<li><label>Type: </label><span id='poke_type'>" + pokemon.get("poke_type"));
  $divUl.append("<li><label>Moves: </label>" + pokemon.get("moves"));

  $divUl.on('click', 'span', this.editField.bind(this));

  $div.find("ul").append("<img src='" + pokemon.get("image_url") +"'>");

  var $toysUl = $("<ul class='toys-ul'>");
  $toysUl.on('click', '.toy-li', this.selectToyFromList.bind(this))

  var rV = this;
  pokemon.fetch({
    success: function(pokemon) {
      rV.renderToysList(pokemon.toys());
    }
  });

  $div.find("ul").append($toysUl);

  this.$pokeDetail.html($div);
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  var $currentTarget = $(event.currentTarget);
  var id = $currentTarget.data("id");
  var pokemon = this.pokes.get(id);
  this.renderPokemonDetail(pokemon);
};

Pokedex.RootView.prototype.editField = function (event) {
  var $currentTarget = $(event.currentTarget);
  var $inputTag =   $('<input id="' + $currentTarget.attr("id") + '" type="text" value="' + $currentTarget.text() + '">');

  $currentTarget.replaceWith($inputTag);
  $inputTag.on('focusout', this.finishedEditing.bind(this));
  $inputTag.on('keypress', function(event) {
    if (event.which === 13) {
      this.finishedEditing(event);
    }
  }.bind(this));
};

Pokedex.RootView.prototype.finishedEditing = function (event) {
  var $currentTarget = $(event.currentTarget);
  var value = $currentTarget.val();
  var $field = $("<span>");
  $field.text(value);
  $currentTarget.replaceWith($field);
  var curPokemonId = $('.detail').data("id");
  var poke = this.pokes.get(curPokemonId);
  var attrs = {}
  attrs[$currentTarget.attr("id")] = value
  //debugger
  poke.save(attrs);
};
