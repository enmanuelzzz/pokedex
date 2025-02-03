// Obtener el ID del Pokémon desde la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pokemonId = urlParams.get("id");

// Verificar que el ID sea válido
if (pokemonId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((response) => response.json())
        .then((data) => mostrarDetallesPokemon(data))
        .catch((error) => console.error("Error al obtener el Pokémon:", error));
} else {
    console.error("No se encontró un ID válido en la URL.");
}

// Función para mostrar los detalles en la página
function mostrarDetallesPokemon(pokemon) {
    document.querySelector("#pokemon-nombre").textContent = pokemon.name;
    document.querySelector("#pokemon-id").textContent = `#${pokemon.id}`;
    document.querySelector("#pokemon-imagen").src = pokemon.sprites.other["official-artwork"].front_default;

    // Mostrar tipos
    const tiposContainer = document.querySelector("#pokemon-tipos");
    tiposContainer.innerHTML = "";
    pokemon.types.forEach(type => {
        const tipoElemento = document.createElement("p");
        tipoElemento.classList.add("tipo", type.type.name);
        tipoElemento.textContent = type.type.name;
        tiposContainer.appendChild(tipoElemento);
    });

    // Mostrar altura y peso
    document.querySelector("#pokemon-altura").textContent = pokemon.height / 10; // Convertir a metros
    document.querySelector("#pokemon-peso").textContent = pokemon.weight / 10; // Convertir a kg

    // Mostrar movimientos (máximo 5 para no sobrecargar la vista)
    const movimientosContainer = document.querySelector("#pokemon-movimientos");
    movimientosContainer.innerHTML = "";
    pokemon.moves.slice(0, 5).forEach(move => {
        const moveItem = document.createElement("li");
        moveItem.textContent = move.move.name;
        movimientosContainer.appendChild(moveItem);
    });
}
