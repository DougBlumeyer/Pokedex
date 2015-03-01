json.(pokemon, *Pokemon.column_names)
if display_toys
  json.toys(pokemon.toys) do |toy|
    json.partial! "toys/toy", toy: toy
  end
end
