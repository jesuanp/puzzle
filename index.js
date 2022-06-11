let images = document.getElementsByClassName('images');
let letter = document.getElementsByClassName('letter');
let body = document.body;
let inicio = document.getElementById('inicio');


// creo el div en donde van las cartas
let container = document.createElement('div');
container.id = 'container';

// creo el boton para volver al menu
let imgBack = document.createElement('img');
imgBack.src = './images/house.svg';
imgBack.classList = 'svg';
imgBack.style.transform = 'scale(2.5)'

let back = document.createElement('div');
back.className = 'back-load';
back.append(imgBack);

// creo el boton para comenzar el juego desde cero
let imgLoad = document.createElement('img');
imgLoad.src = './images/arrow-load.svg';
imgLoad.classList = 'svg load';
imgLoad.style.transform = 'scale(2.5)'

let load = document.createElement('div');
load.className = 'back-load';
load.append(imgLoad);

// creo el contener de los botones de back y load
let containerBtn = document.createElement('div');
containerBtn.className = 'containerBtn';
containerBtn.append(back)
containerBtn.append(load)



// vvv logica de las cartas vvv 

const SeleccionarCartasRandom = () => {

    container.append(containerBtn);

    let arrayImages = [
        './images/image-css.png',
        './images/image-css.png',
        './images/image-html.png',
        './images/image-html.png',
        './images/image-javascript.png',
        './images/image-javascript.png',
        './images/image-postgresql.png',
        './images/image-postgresql.png',
        './images/image-react.png',
        './images/image-react.png',
        './images/image-redux.jpg',
        './images/image-redux.jpg',
        './images/image-angular.png',
        './images/image-angular.png',
        './images/image-mongodb.png',
        './images/image-mongodb.png',
    ];
    
    let lengthArray = arrayImages.length;
    
    let max = arrayImages.length - 1;
    let min = 0;
    
    for(let i = 0; i < lengthArray; i++){
    
        let id = i+1;
    
        let numberRandom = Math.ceil(Math.random() * (max - min) + min);
    
        let imageArray = arrayImages.splice(numberRandom, 1);
        image = imageArray[0];
    
        let divImage = document.createElement('div');
        let img = document.createElement('img');
        let imgInterrogacion = document.createElement('img');
    
        let nameImage = image.slice(15, image.length-4);
    
        imgInterrogacion.className = nameImage + ' images interrogacion ' + id;
        imgInterrogacion.src = './images/interrogacion.gif';
        imgInterrogacion.alt = 'signo de interrogación';
    
        img.src = image;
        img.className += nameImage + ' images ' + id + ' cartatrasera';
        img.alt = nameImage;
    
        divImage.className = 'letter';
        divImage.append(imgInterrogacion);
        divImage.append(img);
    
        container.append(divImage);
    
        max--;
    }
    
    
    let cartasVolteadas = [];
    
    let movimientos = 0;
    
    let cartasEncontradas = 0;
    
    for(let i = 0; i < images.length; i++){
    
        images[i].addEventListener('click', () => {
    
            if(cartasVolteadas.length < 2){
    
                movimientos++;
    
                if(images[i].className.split(' ')[2] === 'interrogacion'){
    
                    images[i].style.animationName = 'rotacion';
                    images[i+1].style.animationName = 'rotacionReversa';
                    cartasVolteadas.push({cartaUno: images[i], cartaDos: images[i+1]});
                }
    
                if(cartasVolteadas.length === 2){
    
                    let claseCartaUno = cartasVolteadas[0].cartaDos.className.split(' ')[0];
                    let claseCartaDos = cartasVolteadas[1].cartaDos.className.split(' ')[0];
    
                    if(claseCartaUno !== claseCartaDos){
    
                        setTimeout(() => {
    
                            cartasVolteadas[0].cartaUno.style.animationName = 'rotacionReversa';
                            cartasVolteadas[0].cartaDos.style.animationName = 'rotacion';
    
                            cartasVolteadas[1].cartaUno.style.animationName = 'rotacionReversa';
                            cartasVolteadas[1].cartaDos.style.animationName = 'rotacion';
    
                            cartasVolteadas = [];
                        }, 1000);
                    }
                    else {
    
                        cartasEncontradas++;
    
                        cartasVolteadas = [];
                    }
                }
            }
            else {
                return null;
            }
    
            if(cartasEncontradas === 8){
                setTimeout(() => {
    
                    alert('Ganaste con ' + movimientos + ' movimientos');
                }, 1100);
            }
        })
    }
}

// AAA logica de las cartas AAA
// |||                      |||

let btns = document.getElementsByClassName('btn');

for(let i = 0; i < btns.length; i++){

    btns[i].addEventListener('click', () => {
        inicio.remove()

        setTimeout(() => {
            body.append(container);
            SeleccionarCartasRandom();
        }, 100)
    });
}

imgBack.addEventListener('click', () => {

    container.innerText = '';
    container.remove();

    body.append(inicio);
});

imgLoad.addEventListener('click', () => {

    container.innerText = '';

    SeleccionarCartasRandom();
});
