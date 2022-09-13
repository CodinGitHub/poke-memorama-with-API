
//Configuracion inicial
let players = 1;
let level = 'novato';


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
});

// Dibujar la matriz de cartas
let gameBoard5 = document.querySelector('#gameBoard');

// novato 6 pokemones
    //width: 500px;
    //height: 420px;
// intermedio 8 pokemones
    //width: 500px;
    //height: 540px;
// avanzado 12x12 pokemones
    //width: 750px;
    //height: 580px;

console.log(gameBoard5)
console.log(level)

if(level === 'novato'){
    for(i =1; i<=12*2; i++){
        gameBoard5.innerHTML += `
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