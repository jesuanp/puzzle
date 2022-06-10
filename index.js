let container = document.getElementById('container');
let images = document.getElementsByClassName('images');

const selectRandom = () => {
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

        imgInterrogacion.className = 'images interrogacion ' + id;
        imgInterrogacion.src = './images/interrogacion.gif';
        imgInterrogacion.alt = 'signo de interrogación';

        img.src = image;
        img.className += 'images ' + id;
        img.alt = nameImage;

        divImage.className = 'letter';
        divImage.append(imgInterrogacion);
        divImage.append(img);

        container.append(divImage);

        max--;
    }

}

selectRandom();

for(let i = 0; i < images.length; i++){
    
    images[i].addEventListener('click', () => {
        images[i].style.animationName = 'rotacion';
        images[i+1].style.animationName = 'rotacionReversa';
        console.log(images[i+1], images[i])
    })

}

