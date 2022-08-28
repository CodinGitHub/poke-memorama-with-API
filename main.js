// let pokes = [];

const getRandomInt = (min, max) => { 
    return Math.floor(Math.random() * (max - min) + min); 
}; 

// async function fetchPokemon(id) { 
//     try { 
//         id = getRandomInt(1, 151); 
//         const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`); 
//         const data = await res.json() 
//         return data.sprites.front_default 
//     } 
//     catch (error) { 
//         console.log(error); 
//     } 
// } 
// function Pokemons(numeroveces) { 
//     for (let i = 1; i <= numeroveces; i++) { 
//         pokes.push(fetchPokemon((i))) 
//         fetchPokemon(i); 
//     } 
//     const pokesDobles = [...pokes, ...pokes] 
//     console.log(pokesDobles) 
// } 

// Pokemons(12);

pokemonImg = []
let id;

for (let i=1; i<=3; i++){
    id = getRandomInt(1, 151); 
    searchPokemon(id)
}

async function searchPokemon(i){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`); 
    const data = await res.json() 
    pokemonImg.push(data.sprites.other['official-artwork'].front_default )

    let game = document.querySelector('#game');

    const cuadro = new Array(3).fill('').map((data, index) => index);
    const cuadritos = [...cuadro, ...cuadro];
    // console.log(cuadritos)
    

    // console.log(pokemonImg)

    let html = cuadritos.map((imageId, index) => `
        <div id="tarjeta-${index}" class="wrapper" data-tilt onclick="voltear('tarjeta-${index}', ${imageId})">
            <div class="flipper">
                <div class="frente"></div>
                <div class="atras">
                    <div class="back-circle">
                        <img class="icon" src='${pokemonImg[imageId]}'>
                    </div>
                </div>
            </div>
        </div>
    `
    ).join('')

    game.innerHTML = html;
}

let parSeleccionado = [];

function voltear(tarjteaId, imageId){
    const tarjeta = document.querySelector(`#${tarjteaId}`);
    tarjeta.classList.add('voltear');

    

    if(parSeleccionado.length == 0){
        parSeleccionado[0] = {imageId, tarjteaId};
    }else if(parSeleccionado.length == 1){
        parSeleccionado[1] = {imageId, tarjteaId};
    }else if(parSeleccionado.length == 2){
        parSeleccionado = [];
    }
    console.log(parSeleccionado)
}



