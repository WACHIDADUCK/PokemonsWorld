let listadoPokemon;

async function consultaPokeApi() {
    return fetch("https://pokeapi.co/api/v2/generation/4/")
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

window.addEventListener('load', async () => {
    const arrayPokemon = await consultaPokeApi();
    listadoPokemon = arrayPokemon;

    console.log(listadoPokemon.pokemon_species[0].url);

    rellenarPokedex();
});

async function rellenarPokedex() {
    let fotos = await rellenarImagen();
    console.log(fotos);

    listadoPokemon.pokemon_species.forEach(pokemon => {
        let fila = document.createElement('tr');
        let nombre = document.createElement('td');
        let imagen = document.createElement('td');

        nombre.textContent = pokemon.name;
        imagen.textContent = pokemon.url;

        fila.appendChild(nombre);
        fila.appendChild(imagen);
        document.querySelector('#pokedex table>tbody').appendChild(fila);
    });
}

async function rellenarImagen() {
    return await listadoPokemon.pokemon_species.map(pokemon => consultarImagen(pokemon.name));
}

async function consultarImagen(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon-form/${name}/`)
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