// let btns = document.getElementsByClassName('btn');

// for(let i = 0; i < btns.length; i++){
    
//     let dificultad = btns[i].textContent;
    
//     btns[i].addEventListener('click', () => {
        
//         if(dificultad === 'Facíl'){

//             inicio.remove();

//             reload = {array: arrayImagesFacil, numCartas: 8};

//             container.style.gridTemplateColumns = 'repeat(4, 1fr)';

//             setTimeout(() => {
//                 body.append(container);
//                 SeleccionarCartasRandom(arrayImagesFacil, 8);
//             }, 100);
//         }
//         else if(dificultad === 'Intermedio') {

//             inicio.remove();

//             reload = {array: arrayImagesNormal, numCartas: 12};

//             if(screen.width > 700) container.style.gridTemplateColumns = 'repeat(6, 1fr)';
//             else container.style.gridTemplateColumns = 'repeat(4, 1fr)';

//             setTimeout(() => {
//                 body.append(container);
//                 SeleccionarCartasRandom(arrayImagesNormal, 12);
//             }, 100)
//         }
//         else if(dificultad === '1 vs 1') {

//             crearVentanaEmergente();

//             // setTimeout(() => {

//             //     alert('Modo de juego 1 vs 1 está en producción');
//             // }, 1000)
//         }

//     });
// }
