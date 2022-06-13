var socket = io.connect("https://puzzle-jesuanp.herokuapp.com/", { forceNew: true });

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

    fetch('https://puzzle-jesuanp.vercel.app/ganador?sala=' + sala, {
        method: 'post',
    });
}

