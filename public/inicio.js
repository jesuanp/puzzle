let nombreUsuario = localStorage.getItem('userName');
if(!nombreUsuario){

    nombreUsuario = `usuario${Math.ceil(Math.random() * (9999 - 1000) + 1000)}`;
}

let modoDeJuego;

let loadSala = false;

// variable para hacer el reload
let reload = {array: null, numCartas: null};

let h1 = document.createElement('h1');
h1.innerText = 'Juego de memoria';
h1.style.textAlign = 'center'

let h2 = document.createElement('h2');
h2.innerText = 'Dificultad';

let btnNivelFacil = document.createElement('button');
btnNivelFacil.className = 'btn';
btnNivelFacil.id = 'nivel-facil';
btnNivelFacil.innerText = 'Facíl';

let btnNivelIntermedio = document.createElement('button');
btnNivelIntermedio.className = 'btn';
btnNivelIntermedio.id = 'nivel-intermedio';
btnNivelIntermedio.innerText = 'Intermedio';

let btnCompetitivo = document.createElement('button');
btnCompetitivo.className = 'btn';
btnCompetitivo.id = 'competitivo';
btnCompetitivo.innerText = 'Competitivo';

let divBotones = document.createElement('div');
divBotones.className = 'buttons';
divBotones.append(btnNivelFacil, btnNivelIntermedio, btnCompetitivo);

let divInicio = document.getElementById('inicio');

let btnForm = document.getElementById('btn-form');
let inputNombre = document.getElementById('input-nombre');

btnForm.addEventListener('click', () => {
        
        let nombreSpan = document.createElement('span');
        let containerName = document.createElement('div');
        createContainerName(nombreSpan, containerName);

        divInicio.innerHTML = '';
    
        divInicio.style.height = '18rem';
        divInicio.style.padding = '2rem';
        
        divInicio.className = 'inicio';
        divInicio.id = 'inicio';
        divInicio.append(h1, h2, divBotones, containerName);

        seleccionarDificultad();
});

// Creo el container donde va en nombre
const createContainerName = (nombreSpan, containerName) => {

    nombreSpan.innerText = nombreUsuario;
    nombreSpan.id = 'nombre';

    let editProfile = document.createElement('div');
    editProfile.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>'
    editProfile.style.paddingTop = '0.3rem';
    editProfile.style.cursor = 'pointer';
    
    let nameDiv = document.createElement('div');
    nameDiv.innerHTML = '';
    nameDiv.id = 'nameDiv';
    nameDiv.append(nombreSpan, editProfile);

    let spanPreviewsName = document.createElement('span');
    spanPreviewsName.innerText = 'Usuario:'

    containerName.id = 'containerName';
    containerName.append(nameDiv)
    
    // Hago un metodo para que al darle click al nombre, se pueda cambiar
    let inputName = document.createElement('input');
    inputName.id = 'inputName';
    inputName.type = 'text';
    inputName.autofocus = true;

    editProfile.addEventListener('click', () => {
        createInputName(inputName, nombreSpan, editProfile)
    })
    nombreSpan.addEventListener('click', () => {
        createInputName(inputName, nombreSpan, editProfile)
    })
}

const createInputName = (inputName, nombreSpan, editProfile) => {

    let btnName = document.createElement('button');
    btnName.className = 'btn-enviar-ventana';
    btnName.innerText = 'Aceptar';

    nameDiv.innerHTML = '';
    nameDiv.append(inputName, btnName);

    btnName.addEventListener('click', () => {

        if(inputName.value.trim() === ''){
            alert('Escribe tu nombre');
            return;
        }

        nombreUsuario = inputName.value;
        nombreSpan.innerText = inputName.value;

        localStorage.setItem('userName', nombreUsuario);

        nameDiv.innerHTML = '';
        nameDiv.append(nombreSpan, editProfile);
    })
}
