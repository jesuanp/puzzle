let body = document.body;
let btns = document.getElementsByClassName('btn');

for(let i = 0; i < btns.length; i++){
    
    let dificultad = btns[i].textContent;
    
    btns[i].addEventListener('click', () => {
        
        inicio.remove();
        
        if(dificultad === 'Facíl'){

            reload = arrayImagesFacil;

            container.style.gridTemplateColumns = 'repeat(4, 1fr)';

            setTimeout(() => {
                body.append(container);
                SeleccionarCartasRandom(arrayImagesFacil, 8);
            }, 100);
        }
        else if(dificultad === 'Normal') {

            reload = arrayImagesNormal;

            if(screen.width > 700){

                container.style.gridTemplateColumns = 'repeat(6, 1fr)';
            }


            setTimeout(() => {
                body.append(container);
                SeleccionarCartasRandom(arrayImagesNormal, 12);
            }, 100)
        }
        else if(dificultad === 'Difícil') {

            reload = arrayImagesNormal;

            if(screen.width > 700){

                container.style.gridTemplateColumns = 'repeat(6, 1fr)';
            }
            
            setTimeout(() => {
                body.append(container);
                SeleccionarCartasRandom(arrayImagesNormal, 12);
            }, 100)
        }

    });
}
