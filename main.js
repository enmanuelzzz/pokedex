// Referencias a elementos del DOM
const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const cargarMas = document.createElement("button");
cargarMas.textContent = "Cargar más";
cargarMas.classList.add("btn-header");
document.querySelector("main").appendChild(cargarMas);

// Variables de control
let offset = 0;
const limit = 20;
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Función para cargar Pokémon
function cargarPokemon(offset, limit) {
    for (let i = offset + 1; i <= offset + limit; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => mostrarPokemon(data))
            .catch(error => console.error("Error al cargar Pokémon:", error));
    }
}

// Mostrar Pokémon en la lista
function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`).join('');

    let pokeId = poke.id.toString().padStart(3, '0');

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;

    // Agregar evento para redirigir a detalles.html
    div.addEventListener("click", () => {
        window.location.href = `detalles.html?id=${poke.id}`;
    });

    listaPokemon.append(div);
}

// Evento para cargar más Pokémon
cargarMas.addEventListener("click", () => {
    offset += limit;
    cargarPokemon(offset, limit);
});

// Filtrar Pokémon por tipo
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            });
    }
}));

// Cargar los primeros 20 Pokémon al inicio
cargarPokemon(offset, limit);
