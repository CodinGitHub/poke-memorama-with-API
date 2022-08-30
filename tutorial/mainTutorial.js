// Inicializar Variables
const TARJETAS_UNICAS = 10;
let game = document.querySelector('#game');

//Peticion de pokemones al API
for (let i=1; i<=TARJETAS_UNICAS; i++){
    let id = getRandomInt(1, 151); 
    searchPokemon(id)
}
function getRandomInt (min, max) { 
    return Math.floor(Math.random() * (max - min) + min); 
};
pokemonImg = [];
async function searchPokemon(i){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`); 
    const data = await res.json() 
    pokemonImg.push(data.sprites.other['official-artwork'].front_default )

    const cuadro = new Array(TARJETAS_UNICAS).fill('').map((data, index) => index);
    const cuadritos = desordenar([...cuadro, ...cuadro]);

    let html = cuadritos.map((imageId, index) => `
        <div id="tarjeta-${index}" class="tarjeta wrapper" data-tilt onclick="voltear('tarjeta-${index}', ${imageId})">
            <div class="flipper tarjeta-relleno">
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
    game.style.width = `${140 * Math.sqrt(TARJETAS_UNICAS*2)}px`
    game.style.height = `${120 * Math.sqrt(TARJETAS_UNICAS*2)}px`
}

let parSeleccionado = [];

function voltear(tarjetaId, imageId){
    const tarjetaSeleccionada = document.querySelector(`#${tarjetaId}`);
    if(tarjetaSeleccionada.classList.contains('voltear')){
        console.log('return')
        return;
    }

    tarjetaSeleccionada.classList.add('voltear');

    

    if(parSeleccionado.length === 0){
        parSeleccionado[0] = {imageId, tarjetaId};

    }else if(parSeleccionado.length === 1){
        parSeleccionado[1] = {imageId, tarjetaId};
        if(parSeleccionado[0].imageId == parSeleccionado[1].imageId){
            const tarjetaAnterior = document.querySelector(`#${parSeleccionado[0].tarjetaId}`);
        
            eliminarTarjeta(tarjetaSeleccionada, tarjetaAnterior)

            parSeleccionado = [];
        }

    }else if(parSeleccionado.length === 2){
        const tarjeta1 = document.querySelector(`#${parSeleccionado[0].tarjetaId}`);
        const tarjeta2 = document.querySelector(`#${parSeleccionado[1].tarjetaId}`);

        tarjeta1.classList.remove('voltear');
        tarjeta2.classList.remove('voltear');
        parSeleccionado = [];
        parSeleccionado[0] = {imageId, tarjetaId};
    }
    console.log(parSeleccionado)
}

function eliminarTarjeta(tarjetaSeleccionada, tarjetaAnterior){
    
    tarjetaSeleccionada.addEventListener('transitionend', ()=>{
        tarjetaSeleccionada.innerHTML = '';
        tarjetaAnterior.innerHTML = '';
        revisarSiUsuariotermino()
    });
}

function revisarSiUsuariotermino(){
    const tarjetas = document.getElementsByClassName('tarjeta-relleno');
    if(tarjetas.length == 0){
        alert('ganaste!')
    }
}

function desordenar(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


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