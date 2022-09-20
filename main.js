
//Configuracion inicial - INICIALIZAR VARIABLES
let players = 1;
let level = 'novato';
let numberOfPokemons = 6;
let gameBoard = document.querySelector('#gameBoard');
const pokes = [];
let pokemonIds = [];
let randomIds = [];


resizeBoard(level)

function createBoard(numberOfPokemons){
    // DEFINIR 6 NUMEROS ALEATORIOS
    for (let i = 1; i<= numberOfPokemons; i++){
        // Alamaceno los numeros aleatorios no repetidos como IDs de los pokemons
        pokemonIds = generateNonRepeatingNumber(numberOfPokemons)
    }
    console.log(pokemonIds)
    pokemonIds.forEach(pokemonId =>{
        fetchPokemon(pokemonId)
        async function fetchPokemon (id) { 
            try { 
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`); 
                const data = await res.json( ) 
                // LA LOGICA DEL JUEGO

                let pokemonImg = data.sprites.other['official-artwork'].front_default;
                let pokemonName = data.name;

                let actualPokemon = {
                    name: '',
                    img: '',
                }
                actualPokemon.name = pokemonName;
                actualPokemon.img = pokemonImg

                pokes.push(actualPokemon)

                // Generar cartas con nombres e imagenes de pokemones
                if(pokes.length === numberOfPokemons){
                    let pokesDobles = [...pokes, ...pokes]
                    pokesDobles = pokesDobles.sort(function (){ return Math.random() - 0.5})
                    pokesDobles.forEach(pokes =>{
                        gameBoard.innerHTML += `
                        <div class="card">
                            <div class="card__front">
                                <img class="card__front--img" src="${pokes.img}" alt="pokemon-img">
                                <p class="card__front--name">${pokes.name}</p>
                            </div>
                            <div class="card__back"></div>
                        </div>
                        `
                        let cardFront = document.querySelector('.card__front');
                        cardFront.style.transform = 'rotateY(180deg)';
                    });

                    //GIRAR CARTA
                    let cards = document.querySelectorAll('.card');
                    cards = [...cards]
                    cards.forEach(card => {
                        card.addEventListener('click', event=>{
                            if(event.target.className == 'card__back'){
                                let cardBack = event.target;
                                let cardFront = event.target.previousElementSibling;
                                cardBack.style.transform = 'rotateY(180deg)';
                                cardFront.style.transform = 'rotateY(0deg)';
                                setTimeout(()=>{
                                    cardBack.style.transform = 'rotateY(0deg)';
                                    cardFront.style.transform = 'rotateY(180deg)';
                                }, 500);
                            }
            
                            

                        });
                    });

                    
                }
                
            } 
            catch (error) { 
                console.log(error); 
            } 
        } 
    });
}
// Generar numeros aleatorios no repetidos con recursividad
function generateNonRepeatingNumber(){
    let randomId = getRandomInt(1, 10)
    if (randomIds.includes(randomId)){
        generateNonRepeatingNumber()
    }else{
        randomIds.push(randomId)
    }
    return randomIds;
}


function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}



//Mostrar el modal
let configBtn = document.getElementById('configBtn');
let configModal = document.querySelector('#dialog-rounded');

configBtn.addEventListener('click', ()=>{
    configModal.showModal();
});

//Recogiendo datos del formulario
let configForm = document.querySelector('#configForm');
let confirmBtn = document.querySelector('#confirmBtn');

confirmBtn.addEventListener('click', ()=>{
    let configData = new FormData(configForm);
    players = parseInt(configData.get('players'));
    level = configData.get('level');

    if(level === 'novato'){
        numberOfPokemons = 6;
    }else if(level === 'intermedio'){
        numberOfPokemons = 8;
    }else if(level === 'avanzado'){
        numberOfPokemons = 12;
    }

    resizeBoard(numberOfPokemons)
    createBoard(numberOfPokemons)
});

// Dibujar la matriz de cartas


console.log(gameBoard)
console.log(level)

// Cambiar el tamaño del board
function resizeBoard(numberOfPokemons){
    if(numberOfPokemons === 6){
        gameBoard.style.width = '500px'
        gameBoard.style.width = '420px'
    }else if(numberOfPokemons === 8){
        gameBoard.style.width = '500px'
        gameBoard.style.width = '540px'
    }else if(numberOfPokemons === 12){
        gameBoard.style.width = '750px'
        gameBoard.style.width = '580px'
    }
}



function drawCards(pokemons){
    for(i =1; i<=pokemons*2; i++){
        gameBoard.innerHTML += `
        <div class="card">
            <div class="card__front"></div>
            <div class="card__back"></div>
        </div>`
    }
}

// let usuario1 = {
//     name: 'Patricio',
//     edad: 48
// }

// class User {
//     constructor(name, edad){
//         this.name = name,
//         this.edad = edad
//     }
// }

// let usuario2 = new User('David', 38);
// console.log(usuario2)
