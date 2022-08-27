let game = document.querySelector('#game');

const data = new Array(3).fill('').map((data, index)=>index);
console.log(data);
const dataDuplicada = [...data, ...data];
console.log(dataDuplicada)

const cuadritos = new Array(2*2).fill('casa');

console.log(cuadritos);

let html = cuadritos.map(cuadrito => `
    <div class="wrapper" data-tilt >
        <div class="flipper">
            <div class="frente"></div>
            <div class="atras"></div>
        </div>
    </div>
`).join('')

game.innerHTML = html;