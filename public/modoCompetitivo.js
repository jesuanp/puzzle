const urlServer = "https://puzzle-jesuanp.herokuapp.com";
// const urlServer = "http://localhost:3001";

var socket = io.connect(urlServer, { forceNew: true });

let body = document.body;

let codigo = Math.ceil(Math.random() * (9999 - 1000) + 1000);
let sala = document.createElement('div');
sala.innerText = 'Sala: ' + codigo;
sala.id = 'codigo-sala';

socket.on('ganador', data => {

    let cuerpoVentana = document.createElement('div');
    cuerpoVentana.className = 'cuerpo-ventana';

    let span = document.createElement('span');
    
    if(data.socketId === socket.id){
        span.innerText = `Ganaste la partida con ${data.movimientos} movimientos`;
    }
    else {
        span.innerText = `${data.nombreGanador} ganó la partida con ${data.movimientos} movimientos`;
    }

    cuerpoVentana.append(span);
    cuerpoVentana.style.color = '#fff';
    
    let ventanaEmergente = document.createElement('div');
    ventanaEmergente.className = 'ventana-emergente';
    ventanaEmergente.append(cuerpoVentana)

    body.append(ventanaEmergente);

    let containerNav = document.getElementById('container-nav');
    containerNav.addEventListener('click', () => {
        ventanaEmergente.remove();
    });
});

socket.on('uniendo-jugador', data => {
    
    let span = document.createElement('span');

    let btnEmpezar = document.getElementById('btn-empezar');

    if(data.socketId === socket.id){
        var cancelar = true;
        span.innerText = 'Te uniste a la partida';
    }
    else {
        span.innerText = `${data.nombre} se unió`;

        if(btnEmpezar){

            btnEmpezar.disabled = false;
            btnEmpezar.style.cursor = 'pointer';
            btnEmpezar.style.backgroundColor = 'rgb(90, 62, 175)';
            btnEmpezar.className = 'btn';
        }
    }

    let btnExit = document.createElement('button');
    btnExit.innerText = 'Salir';
    btnExit.id = 'btnExit';

    btnExit.addEventListener('click', () => {

        fetch(`${urlServer}/hello?sala=${codigo}&nombre=${nombreUsuario}`, {
            method: 'POST',
        });

        socket.emit('salir-sala', {codigo, nombreUsuario});
        
        let ventanaEmergente = document.getElementsByClassName('ventana-emergente')[0];
        ventanaEmergente.remove();
    })

    let cuerpoVentana = document.getElementsByClassName('cuerpo-ventana')[0];
    cuerpoVentana.style.flexDirection = 'column';
    cuerpoVentana.style.color = '#fff';
    cuerpoVentana.style.height = '10rem'
    cuerpoVentana.style.justifyContent = 'flex-start'

    cancelar ? cuerpoVentana.append(span, btnExit) : cuerpoVentana.append(span)

})

socket.on('empezar', data => {

    let container = document.getElementById('container');
    if(!container){
        container = document.createElement('div');
        container.id = 'container';
    }

    container.innerHTML = '';
    
    body.append(container);
    
    if(data.reload.numCartas === 12 && screen.width > 700){
        container.style.gridTemplateColumns = 'repeat(6, 1fr)';
    }
    else{
        container.style.gridTemplateColumns = 'repeat(4, 1fr)';
    }
    
    
    ponerTablero();
    SeleccionarCartasRandom(data.reload.array, data.reload.numCartas);

    let load = document.getElementById('load');
    load.innerHTML = '';

    if(data.socketId === socket.id){

        let imgLoad = document.getElementById('load-sala');
        if(!imgLoad){

            // creando el load de la sala
            let imgLoad = document.createElement('img');
            imgLoad.src = './images/arrow-load.svg';
            imgLoad.classList = 'svg load';
            imgLoad.id = 'load-sala';
            imgLoad.style.transform = 'scale(2.5)';
    
            imgLoad.addEventListener('click', () => {

                fetch(`${urlServer}/empezar?sala=${codigo}`, {
                    method: 'POST',
                    body: JSON.stringify({reload, socketId: socket.id}),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });
            })
    
            load.append(imgLoad);
        }
    }
});

socket.on('salida-exitosa', data => {

    let cuerpoVentana = document.getElementsByClassName('cuerpo-ventana')[0];

    let span = document.createElement('span');
    span.innerText = `${data.nombre} salió de la sala`;

    cuerpoVentana.append(span);
})


const ponerTablero = () => {
    
    inicio.remove();
    body.append(sala);

    let cuerpoVentana = document.createElement('div');
    cuerpoVentana.className = 'cuerpo-ventana';
    
    let ventanaEmergente = document.getElementsByClassName('ventana-emergente');
    ventanaEmergente = ventanaEmergente[0];

    if(!ventanaEmergente){
        ventanaEmergente = document.createElement('div');
        ventanaEmergente.className = 'ventana-emergente';
    } 

    ventanaEmergente.innerHTML = '';

    let cont = 3;

    let segundos = document.createElement('div');
    segundos.id = 'segundos';
    segundos.innerText = cont;

    ventanaEmergente.append(segundos);

    body.append(ventanaEmergente);

    let cuentaRegresiva = setInterval(() => {
        
        if(cont === 1){
            clearInterval(cuentaRegresiva);
            ventanaEmergente.remove();
        }
        else {
            cont--;
            segundos.innerText = cont;
        }
    }, 1000)
}

const crearVentanaEmergente = () => {

    let btnClouse = document.createElement('button');
    btnClouse.id = 'btn-clouse';
    btnClouse.innerText = 'X';

    let btnVentanaCrear = document.createElement('button');
    btnVentanaCrear.className = 'btn-ventana';
    btnVentanaCrear.innerText = 'Crear partida';
    
    let btnVentanaUnirse = document.createElement('button');
    btnVentanaUnirse.className = 'btn-ventana';
    btnVentanaUnirse.innerText = 'Unirse';
    
    let cuerpoVentana = document.createElement('div');
    cuerpoVentana.className = 'cuerpo-ventana';
    cuerpoVentana.append(btnVentanaCrear, btnVentanaUnirse, btnClouse);
    
    let ventanaEmergente = document.createElement('div');
    ventanaEmergente.className = 'ventana-emergente';
    ventanaEmergente.append(cuerpoVentana)

    btnClouse.addEventListener('click', () => {
        ventanaEmergente.remove();
    })
    
    body.append(ventanaEmergente);

    btnVentanaUnirse.addEventListener('click', () => {

        ponerCodigo();
    })
    
    btnVentanaCrear.addEventListener('click', () => {

        sala.innerText = 'Sala: ' + codigo;
    
        let btnNivelFacil = document.createElement('button')
        btnNivelFacil.className = 'btn';
        btnNivelFacil.innerText = 'Facíl';
    
        let btnNivelIntermedio = document.createElement('button')
        btnNivelIntermedio.className = 'btn';
        btnNivelIntermedio.innerText = 'Intermedio';
    
        let cuerpoVentana = document.getElementsByClassName('cuerpo-ventana');
        cuerpoVentana = cuerpoVentana[0];
    
        cuerpoVentana.innerText = '';
        cuerpoVentana.append(btnNivelFacil, btnNivelIntermedio, btnClouse);
    
        let btnEmpezar = document.createElement('button');
        btnEmpezar.id = 'btn-empezar';
        btnEmpezar.innerText = 'Empezar';
        btnEmpezar.disabled = true;
        btnEmpezar.style.cursor = 'default';
        btnEmpezar.style.backgroundColor = 'grey';

        let container = document.getElementById('container');
        if(!container){
            container = document.createElement('div');
            container.id = 'container';
        }

        codigo = Math.ceil(Math.random() * (9999 - 1000) + 1000);
        sala.innerText = 'Sala: ' + codigo;
        sala.id = 'codigo-sala';

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
                body.append(sala);
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
                body.append(sala);
            }, 100);
    
        });

        btnEmpezar.addEventListener('click', () => {

            fetch(`${urlServer}/empezar?sala=${codigo}`, {
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
    inputVentana.placeholder = 'Código de la sala...';
    inputVentana.type = 'text';
    inputVentana.autofocus = true;

    let btnEnviarVentana = document.createElement('button');
    btnEnviarVentana.className = 'btn-enviar-ventana';
    btnEnviarVentana.innerText = 'Enviar';

    let cuerpoVentana = document.getElementsByClassName('cuerpo-ventana');
    cuerpoVentana = cuerpoVentana[0];

    let btnClouse = document.getElementById('btn-clouse');

    cuerpoVentana.innerText = '';
    cuerpoVentana.append(inputVentana, btnEnviarVentana, btnClouse);

    btnEnviarVentana.addEventListener('click', () => {

        sala.innerText = 'Sala: ' + inputVentana.value;
        socket.emit('unir-sala', {id: socket.id, codigo: inputVentana.value});

        codigo = inputVentana.value;

        fetch(`${urlServer}/unir-sala?sala=${codigo}&nombre=${nombreUsuario}&socketId=${socket.id}`, {
            method: 'POST',
        });

        cuerpoVentana.style.color = '#fff';
        cuerpoVentana.innerText = 'Esperando al otro jugador...';

    });
}

function playerWin(sala, nombreUsuario, socketId, movimientos){

    if(modoDeJuego === 'Competitivo'){

        fetch(`${urlServer}/ganador?sala=${sala}&nombreGanador=${nombreUsuario}&socketId=${socketId}&movimientos=${movimientos}`, {
            method: 'POST',
        });
    }
    else {
        let cuerpoVentana = document.createElement('div');
        cuerpoVentana.className = 'cuerpo-ventana';

        let span = document.createElement('span');
        
        span.innerText = `Terminaste con ${movimientos} movimientos`;
        

        cuerpoVentana.append(span);
        cuerpoVentana.style.color = '#fff';
        
        let ventanaEmergente = document.createElement('div');
        ventanaEmergente.className = 'ventana-emergente';
        ventanaEmergente.append(cuerpoVentana)

        body.append(ventanaEmergente);

        let containerNav = document.getElementById('container-nav');
        containerNav.addEventListener('click', () => {
            ventanaEmergente.remove();
        });
    }

}

