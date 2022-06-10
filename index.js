let container = document.getElementById('container');
let images = document.getElementsByClassName('images');
let letter = document.getElementsByClassName('letter');

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
    img.className += nameImage + ' images ' + id;
    img.alt = nameImage;

    divImage.className = 'letter';
    divImage.append(imgInterrogacion);
    divImage.append(img);

    container.append(divImage);

    max--;
}


let cartasVolteadas = [];

for(let i = 0; i < images.length; i++){
    
    images[i].addEventListener('click', () => {

        if(cartasVolteadas.length < 2){

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
                        
                        cartasVolteadas[0].cartaUno.style.animationName = '';
                        cartasVolteadas[0].cartaDos.style.animationName = '';
                        
                        cartasVolteadas[1].cartaUno.style.animationName = '';
                        cartasVolteadas[1].cartaDos.style.animationName = '';
                        
                        cartasVolteadas = [];
                    }, 1000);
                }
                else {
                    cartasVolteadas = [];
                }

            }
        }
        else {
            return null;
        }
        
    })

}



