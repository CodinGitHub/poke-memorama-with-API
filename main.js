
//Configuracion inicial - INICIALIZAR VARIABLES
let players = 1;
let level = 'Novato';
let numberOfPokemons = 6;
let gameBoard = document.querySelector('#gameBoard');
let headerLevel = document.querySelector('.header__level');
let scorePlayer1Element = document.querySelectorAll('.is-success')[0];
let scorePlayer2Element = document.querySelectorAll('.is-success')[1];
let pokes = [];
let pokemonIds = [];
let randomIds = [];
let scorePlayer1 = 0;
let scorePlayer2 = 0;

let firstCard;
let secondCard;
let firstParent;
let secondParent;

let firstId;
let secondId;


createBoard(numberOfPokemons);
resizeBoard(level);

function createBoard(numberOfPokemons){
    // DEFINIR 6 NUMEROS ALEATORIOS
    randomIds = [];
    pokes = [];
    for (let i = 1; i<= numberOfPokemons; i++){
        // Alamaceno los numeros aleatorios no repetidos como IDs de los pokemons
        pokemonIds = generateNonRepeatingNumber()
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
                // console.log(pokes)
                // Generar cartas con nombres e imagenes de pokemones
                if(pokes.length === numberOfPokemons){
                    let pokesDobles = [...pokes, ...pokes]
                    pokesDobles = pokesDobles.sort(function (){ return Math.random() - 0.5})
                    gameBoard.innerHTML = '';
                    pokesDobles.forEach((pokes, index) =>{
                        gameBoard.innerHTML += `
                        <div class="card" id="${index}" >
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
                    
                    
                    cards = [...cards];
                    let clicks = 0
                    cards.forEach(card => {
                        card.addEventListener('click', event=>{
                            clicks++;
        
                            if (clicks === 1){
                             
                                firstParent = event.target.parentElement;
                                firstCard = event.target.previousElementSibling.childNodes[3].innerText;
                                firstId = event.target.parentElement.id;
                              
                            }else if(clicks === 2){
                                secondId = event.target.parentElement.id;
                                if(firstId != secondId){
                                    secondParent = event.target.parentElement;
                                    secondCard = event.target.previousElementSibling.childNodes[3].innerText;
                                    
                                    removePairs();
                                    console.log(scorePlayer1);
                                    console.log(numberOfPokemons);

                                    if(scorePlayer1 == numberOfPokemons){
                                        drawResult();
                                    }
                                }
                                clicks = 0;
                            }

                            
                            // Lo que se muestra al jugador
                            if(event.target.className === 'card__back'){
                                let cardBack = event.target;
                                let cardFront = event.target.previousElementSibling;
                                cardBack.style.transform = 'rotateY(180deg)';
                                cardFront.style.transform = 'rotateY(360deg)';
                                setTimeout(()=>{
                                    
                                    cardBack.style.transform = 'rotateY(0deg)';
                                    cardFront.style.transform = 'rotateY(180deg)';
                                }, 1000);
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
    let randomId = getRandomInt(1, 151)
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

// Novato 30seg
// Inter 48seg
// Avan 59seg

confirmBtn.addEventListener('click', ()=>{
    scorePlayer1 = 0;
    let configData = new FormData(configForm);
    players = parseInt(configData.get('players'));
    level = configData.get('level');
    changeDisplayLevel(level);
    if(level === 'Novato'){
        numberOfPokemons = 6;
    }else if(level === 'Intermedio'){
        numberOfPokemons = 8;
    }else if(level === 'Avanzado'){
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
        gameBoard.style.height = '420px'
    }else if(numberOfPokemons === 8){
        gameBoard.style.width = '500px'
        gameBoard.style.height = '540px'
    }else if(numberOfPokemons === 12){
        gameBoard.style.width = '750px'
        gameBoard.style.height = '580px'
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

function drawResult(){
    gameBoard.innerHTML= `
    <section class="btn-container">
        <h2>Felicidades!</h2>
        <button class="btn-start nes-btn is-warning">Start Game</button>
    </section>`
}

function changeDisplayLevel(level){
    headerLevel.innerText = `Nivel: ${level}`
}

function removePairs(){
    if(firstCard === secondCard){
        scorePlayer1++;
        scorePlayer1Element.innerText = scorePlayer1; 
        firstParent.style.visibility = 'hidden';
        secondParent.style.visibility = 'hidden';
    }else{
        // console.log('NO es igual');
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
