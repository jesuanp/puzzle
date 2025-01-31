const seleccionarDificultad = () => {

    let btns = document.getElementsByClassName('btn');

    
    for(let i = 0; i < btns.length; i++){
        
        let dificultad = btns[i].textContent;
        
        btns[i].addEventListener('click', () => {

            let container = document.getElementById('container');
            if(!container){
                container = document.createElement('div');
                container.id = 'container';
            }
            
            if(dificultad === 'Facíl'){

                modoDeJuego = 'falcil';

                inicio.remove();

                reload = {array: arrayImagesFacil, numCartas: 8};

                setTimeout(() => {
                    body.append(container);
                    SeleccionarCartasRandom(arrayImagesFacil, 8);
                }, 100);
            }
            else if(dificultad === 'Intermedio') {

                modoDeJuego = 'intermedio';

                inicio.remove();

                reload = {array: arrayImagesNormal, numCartas: 12};

                // if(screen.width > 700) container.style.gridTemplateColumns = 'repeat(6, 1fr)';
                // else container.style.gridTemplateColumns = 'repeat(4, 1fr)';

                setTimeout(() => {
                    body.append(container);
                    SeleccionarCartasRandom(arrayImagesNormal, 12);
                }, 100)
            }
            else if(dificultad === 'Competitivo') {

                modoDeJuego = 'Competitivo';

                crearVentanaEmergente();
            }
        });
    }
}
