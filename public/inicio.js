let nombreUsuario = `usuario ${Math.ceil(Math.random() * (9999 - 1000) + 1000)}`;
let modoDeJuego;

let loadSala = false;

// variable para hacer el reload
let reload = {array: null, numCartas: null};

let h1 = document.createElement('h1');
h1.innerText = 'Juego de memoria';

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

    let nameDiv = document.createElement('div');
    nameDiv.innerHTML = '';
    nameDiv.id = 'nameDiv';
    nameDiv.append(nombreSpan);

    let spanPreviewsName = document.createElement('span');
    spanPreviewsName.innerText = 'Usuario:'

    containerName.id = 'containerName';
    containerName.append(nameDiv)
    
    // Hago un metodo para que al darle click al nombre, se pueda cambiar
    nombreSpan.addEventListener('click', () => {

        let inputName = document.createElement('input');
        inputName.id = 'inputName'
        inputName.type = 'text';

        let btnName = document.createElement('button');
        btnName.className = 'btn-enviar-ventana';
        btnName.innerText = 'Aceptar';

        nameDiv.innerHTML = '';
        nameDiv.append(inputName, btnName);

        btnName.addEventListener('click', () => {
            nombreUsuario = inputName.value;
            nombreSpan.innerText = inputName.value;

            nameDiv.innerHTML = '';
            nameDiv.append(nombreSpan);
        })
    })
}
