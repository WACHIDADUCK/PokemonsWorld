let listadoGeneracion;
let listadoPokemon = [];

async function consultaPokeGeneracion(generacion) {
    return fetch(`https://pokeapi.co/api/v2/generation/${generacion}/`)
        .then(function (resultadoEnBruto) {
            return resultadoEnBruto.json();
        })
        .then(function (resultadoJSON) {
            return resultadoJSON;
        })
        .catch(function (error) {
            console.log('Error promesa: ${error}');
        });
}

async function consultarEspecies(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(function (resultadoEnBruto) {
            return resultadoEnBruto.json();
        })
        .then(function (resultadoJSON) {
            return resultadoJSON;
        })
        .catch(function (error) {
            console.log(`Error promesa: ${error}`);
        });
}

window.addEventListener('load', () => {
    obtenerDatosGeneracion(1, "gen1");
    obtenerDatosGeneracion(2, "gen2");
});

async function obtenerDatosGeneracion(generacion, tabla) {
    const arrayGeneracion = await consultaPokeGeneracion(generacion);
    listadoGeneracion = arrayGeneracion;

    const arrayPokemon = await rellenarListado();
    listadoPokemon = arrayPokemon.sort((a, b) => a.id - b.id);

    console.log(listadoPokemon);
    console.log(listadoGeneracion.pokemon_species);
    rellenarPokedex(tabla);
}

function rellenarPokedex(tabla) {
    listadoPokemon.forEach(pokemon => {
        let fila = document.createElement('tr');
        let nombre = document.createElement('td');
        let imagen = document.createElement('td');

        nombre.textContent = pokemon.name;
        imagen.innerHTML = `<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">`;

        fila.appendChild(nombre);
        fila.appendChild(imagen);
        document.querySelector(`#pokedex table#${tabla}>tbody`).appendChild(fila);
    });
}

async function rellenarListado() {
    return await Promise.all(listadoGeneracion.pokemon_species.map(pokemon => consultarEspecies(pokemon.name)));
}