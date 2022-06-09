let container = document.getElementById('container');

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

    let indicesRecorridos = [];

    let max = arrayImages.length - 1;
    let min = 0;

    for(let i = 0; i < lengthArray; i++){

        let numberRandom = Math.ceil(Math.random() * (max - min) + min);

        let imageArray = arrayImages.splice(numberRandom, 1);
        image = imageArray[0];

        let divImage = document.createElement('div');
        let img = document.createElement('img')

        img.src = image;
        img.className += ' letter';
        img.id = image.slice(15, image.length-4);

        divImage.append(img);

        container.append(divImage);

        max--;

        console.log(numberRandom, arrayImages.length, image);
    }

}

selectRandom();
