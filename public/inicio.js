let nombreUsuario;
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
btnCompetitivo.innerText = '1 vs 1';

let divBotones = document.createElement('div');
divBotones.className = 'buttons';
divBotones.append(btnNivelFacil, btnNivelIntermedio, btnCompetitivo);

let divInicio = document.getElementById('inicio');

let btnForm = document.getElementById('btn-form');
let inputNombre = document.getElementById('input-nombre');

btnForm.addEventListener('click', () => {

    if(inputNombre.value.trim() !== ''){

        nombreUsuario = inputNombre.value.trim();

        divInicio.innerHTML = '';
    
        divInicio.style.height = '18rem';
        divInicio.style.padding = '2rem';
        
        divInicio.className = 'inicio';
        divInicio.id = 'inicio';
        divInicio.append(h1, h2, divBotones);

        seleccionarDificultad();
    }
    else {
        alert('Tienes que escribir tu nombre')
    }

    
})
