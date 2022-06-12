const socket = io("http://puzzle-jesuanp.vercel.app/");

let body = document.body;

socket.on('ganador', data => { 
    
    let ventanaEmergente = document.createElement('div');
    ventanaEmergente.className = 'ventana-emergente';

    let cuerpoVentana = document.createElement('div');
    cuerpoVentana.className = 'cuerpo-ventana';

    cuerpoVentana.innerText = 'Ya hay un ganador';
    cuerpoVentana.style.color = '#fff';

    ventanaEmergente.append(cuerpoVentana)

    body.append(ventanaEmergente);
});

socket.on('empezar', data => {

    console.log('empezar');

    if(data.socketId !== socket.id){
        console.log('generar cartas');
                
        if(data.reload.numCartas === 8){
            container.style.gridTemplateColumns = 'repeat(4, 1fr)';
        }
        if(data.reload.numCartas === 12){
            container.style.gridTemplateColumns = 'repeat(6, 1fr)';
        }

        SeleccionarCartasRandom(data.reload.array, data.reload.numCartas);
    }
    ponerTablero();

});


let codigo = Math.ceil(Math.random() * (9999 - 1000) + 1000);
let sala = document.createElement('div');
sala.innerText = 'Sala: ' + codigo;
sala.id = 'codigo-sala';

const ponerTablero = () => {
    
    inicio.remove();
    body.append(container);
    body.append(sala);

    let cuerpoVentana = document.getElementsByClassName('cuerpo-ventana');
    cuerpoVentana[0].innerHTML = '';
    
    let ventanaEmergente = document.getElementsByClassName('ventana-emergente');
    ventanaEmergente[0].innerHTML = '';

    let segundos = document.createElement('div');
    segundos.id = 'segundos';

    ventanaEmergente[0].append(segundos);

    let cont = 3;

    segundos.innerText = cont;

    let cuentaRegresiva = setInterval(() => {
        if(cont === 1){
            clearInterval(cuentaRegresiva);
            ventanaEmergente[0].remove();
        }
        else {
            cont--;
            segundos.innerText = cont;
        }
    }, 1000)
}

const crearVentanaEmergente = () => {

    let btnVentanaCrear = document.createElement('button');
    btnVentanaCrear.className = 'btn-ventana';
    btnVentanaCrear.innerText = 'Crear partida';
    
    let btnVentanaUnirse = document.createElement('button');
    btnVentanaUnirse.className = 'btn-ventana';
    btnVentanaUnirse.innerText = 'Unirse';
    
    let cuerpoVentana = document.createElement('div');
    cuerpoVentana.className = 'cuerpo-ventana';
    cuerpoVentana.append(btnVentanaCrear, btnVentanaUnirse);
    
    let ventanaEmergente = document.createElement('div');
    ventanaEmergente.className = 'ventana-emergente';
    ventanaEmergente.append(cuerpoVentana)
    
    body.append(ventanaEmergente);

    btnVentanaUnirse.addEventListener('click', () => {

        ponerCodigo();
    })
    
    btnVentanaCrear.addEventListener('click', () => {
    
        let btnNivelFacil = document.createElement('button')
        btnNivelFacil.className = 'btn';
        btnNivelFacil.innerText = 'Facíl';
    
        let btnNivelIntermedio = document.createElement('button')
        btnNivelIntermedio.className = 'btn';
        btnNivelIntermedio.innerText = 'Intermedio';
    
        let cuerpoVentana = document.getElementsByClassName('cuerpo-ventana');
        cuerpoVentana = cuerpoVentana[0];
    
        cuerpoVentana.innerText = '';
        cuerpoVentana.append(btnNivelFacil, btnNivelIntermedio);
    
        let btnEmpezar = document.createElement('button');
        btnEmpezar.className = 'btn';
        btnEmpezar.innerText = 'Empezar';

        btnNivelFacil.addEventListener('click', () => {

            reload = {array: arrayImagesFacil, numCartas: 8};

            inicio.remove();
            ventanaEmergente.innerText = '';
            cuerpoVentana.innerText = '';
            cuerpoVentana.append(btnEmpezar);
            ventanaEmergente.append(cuerpoVentana);
    
            container.style.gridTemplateColumns = 'repeat(4, 1fr)';

            socket.emit('unir-sala', {id: socket.id, codigo});
    
            setTimeout(() => {
                body.append(container);
                body.append(sala);
                SeleccionarCartasRandom(arrayImagesFacil, 8);
            }, 100);
    
        });
    
        btnNivelIntermedio.addEventListener('click', () => {

            reload = {array: arrayImagesNormal, numCartas: 12};
    
            inicio.remove();
            ventanaEmergente.innerText = '';
            cuerpoVentana.innerText = '';
            cuerpoVentana.append(btnEmpezar);
            ventanaEmergente.append(cuerpoVentana);
    
    
            if(screen.width > 700) container.style.gridTemplateColumns = 'repeat(6, 1fr)';
            else container.style.gridTemplateColumns = 'repeat(4, 1fr)';
    
            socket.emit('unir-sala', {id: socket.id, codigo});

            setTimeout(() => {
                body.append(container);
                body.append(sala);
                SeleccionarCartasRandom(arrayImagesNormal, 12);
            }, 100);
    
        });

        btnEmpezar.addEventListener('click', () => {

            fetch('https://puzzle-jesuanp.vercel.app/empezar?sala=' + codigo, {
                method: 'POST',
                body: JSON.stringify({reload, socketId: socket.id}),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
        });
    });
}

const ponerCodigo = () => {

    let inputVentana = document.createElement('input');
    inputVentana.className = 'input-ventana';
    inputVentana.placeholder = 'Escribe el código aquí...';
    inputVentana.type = 'text';

    let btnEnviarVentana = document.createElement('button');
    btnEnviarVentana.className = 'btn-enviar-ventana';
    btnEnviarVentana.innerText = 'Enviar';

    let cuerpoVentana = document.getElementsByClassName('cuerpo-ventana');
    cuerpoVentana = cuerpoVentana[0];

    cuerpoVentana.innerText = '';
    cuerpoVentana.append(inputVentana, btnEnviarVentana);

    btnEnviarVentana.addEventListener('click', () => {

        sala.innerText = 'Sala: ' + inputVentana.value;
        socket.emit('unir-sala', {id: socket.id, codigo: inputVentana.value});

        cuerpoVentana.innerText = 'Esperando al otro jugador...';
        cuerpoVentana.style.color = '#fff'

    });
}

function playerWin(sala){

    fetch('http://puzzle-jesuanp.vercel.app/ganador?sala=' + sala, {
        method: 'post',
    });
}


// ---------------------------------------------------------------------

let images = document.getElementsByClassName('images');
let letter = document.getElementsByClassName('letter');
let inicio = document.getElementById('inicio');

// creo el div en donde van las cartas
let container = document.createElement('div');
container.id = 'container';

// creo el boton para volver al menu
let imgBack = document.createElement('img');
imgBack.src = './images/house.svg';
imgBack.classList = 'svg';
imgBack.style.transform = 'scale(2.5)';

let back = document.createElement('div');
back.className = 'back-load';
back.append(imgBack);

// creo el boton para comenzar el juego desde cero
let imgLoad = document.createElement('img');
imgLoad.src = './images/arrow-load.svg';
imgLoad.classList = 'svg load';
imgLoad.style.transform = 'scale(2.5)';

let load = document.createElement('div');
load.className = 'back-load';
load.append(imgLoad);

// creo el contener de los botones de back y load
let containerBtn = document.createElement('div');
containerBtn.className = 'containerBtn';
containerBtn.append(back);
containerBtn.append(load);

imgBack.addEventListener('click', () => {

    let sala = document.getElementById('codigo-sala');
    sala && sala.remove();

    container.innerText = '';
    container.remove();

    body.append(inicio);

    socket.emit('salir-sala', {codigo});
});

// variable para hacer el reload
let reload = {array: null, numCartas: null};

imgLoad.addEventListener('click', () => {

    container.innerText = '';

    SeleccionarCartasRandom(reload.array, reload.numCartas);
});

let arrayImagesFacil = ['./images/image-css.png', './images/image-css.png', './images/image-html.png', './images/image-html.png', './images/image-javascript.png', './images/image-javascript.png', './images/image-postgresql.png', './images/image-postgresql.png', './images/image-react.png', './images/image-react.png', './images/image-redux.jpg', './images/image-redux.jpg', './images/image-angular.png', './images/image-angular.png', './images/image-mongodb.png', './images/image-mongodb.png',];
let arrayImagesNormal = ['./images/image-css.png', './images/image-css.png', './images/image-html.png', './images/image-html.png', './images/image-javascript.png', './images/image-javascript.png', './images/image-postgresql.png', './images/image-postgresql.png', './images/image-react.png', './images/image-react.png', './images/image-redux.jpg', './images/image-redux.jpg', './images/image-angular.png', './images/image-angular.png', './images/image-mongodb.png', './images/image-mongodb.png', './images/image-java.jpg', './images/image-java.jpg', './images/image-php.png', './images/image-php.png', './images/image-python.png', './images/image-python.png', './images/image-visualStudioCode.png', './images/image-visualStudioCode.png',];

const SeleccionarCartasRandom = (array, numCartas) => {

    let arrayImages = [...array];

    container.append(containerBtn);
    
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
    };
    
    
    let cartasVolteadas = [];
    
    let movimientos = 0;
    
    let cartasEncontradas = 0;
    
    for(let i = 0; i < images.length; i++){
    
        images[i].addEventListener('click', () => {
    
            if(cartasVolteadas.length < 2){

                // playerWin(codigo);

                movimientos++;
    
                if(images[i].className.split(' ')[2] === 'interrogacion'){
    
                    images[i].style.animationName = 'rotacion';
                    images[i+1].style.animationName = 'rotacionReversa';
                    cartasVolteadas.push({cartaUno: images[i], cartaDos: images[i+1]});
                };
    
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
                    };
                };
            }
            else {
                return null;
            };
    
            if(cartasEncontradas === numCartas){
                
                setTimeout(() => {

                    playerWin(codigo);
                    
                    alert('Ganaste con ' + movimientos + ' movimientos');
                }, 1000);
            };
        });
    };
}

// ---------------------------------------------------------------------------

let btns = document.getElementsByClassName('btn');

for(let i = 0; i < btns.length; i++){
    
    let dificultad = btns[i].textContent;
    
    btns[i].addEventListener('click', () => {
        
        if(dificultad === 'Facíl'){

            inicio.remove();

            reload = {array: arrayImagesFacil, numCartas: 8};

            container.style.gridTemplateColumns = 'repeat(4, 1fr)';

            setTimeout(() => {
                body.append(container);
                SeleccionarCartasRandom(arrayImagesFacil, 8);
            }, 100);
        }
        else if(dificultad === 'Intermedio') {

            inicio.remove();

            reload = {array: arrayImagesNormal, numCartas: 12};

            if(screen.width > 700) container.style.gridTemplateColumns = 'repeat(6, 1fr)';
            else container.style.gridTemplateColumns = 'repeat(4, 1fr)';

            setTimeout(() => {
                body.append(container);
                SeleccionarCartasRandom(arrayImagesNormal, 12);
            }, 100)
        }
        else if(dificultad === '1 vs 1') {

            crearVentanaEmergente();

            // setTimeout(() => {

            //     alert('Modo de juego 1 vs 1 está en producción');
            // }, 1000)
        }

    });
}


