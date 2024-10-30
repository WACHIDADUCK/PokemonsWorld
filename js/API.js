let listadoGeneracion;
let listadoPokemon = [];

async function consultaPokeGeneracion() {
    return fetch("https://pokeapi.co/api/v2/generation/1/")
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

window.addEventListener('load', async () => {
    const arrayGeneracion = await consultaPokeGeneracion();
    listadoGeneracion = arrayGeneracion;

    const arrayPokemon = await rellenarListado();
    listadoPokemon = arrayPokemon.sort((a, b) => a.id - b.id);

    console.log(listadoPokemon);

    console.log(listadoGeneracion.pokemon_species);

    rellenarPokedex();
});

function rellenarPokedex() {
    listadoPokemon.forEach(pokemon => {
        let fila = document.createElement('tr');
        let nombre = document.createElement('td');
        let imagen = document.createElement('td');

        nombre.textContent = pokemon.name;
        imagen.innerHTML = `<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">`;

        fila.appendChild(nombre);
        fila.appendChild(imagen);
        document.querySelector('#pokedex table>tbody').appendChild(fila);
    });
}

async function rellenarListado() {
    return await Promise.all(listadoGeneracion.pokemon_species.map(pokemon => consultarEspecies(pokemon.name)));
}

