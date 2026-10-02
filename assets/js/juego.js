const NJUEGOS = 5;
const NBOSSESPJUEGO = 3;
const VIDAS = 3;

const btnConfigJuego = () => {
    const btnJuego = document.querySelector('#genera_juego')
    const divJuego = document.querySelector('#contenedor_juego')

    btnJuego.addEventListener('click', () => {
        juegoSeleccionado = getJuego(juegosDeck);

        let oldJuego = document.querySelector("#juego-caratula img")
        if(oldJuego != null)
            divJuego.removeChild(oldJuego)
        
        const bossesDiv = document.querySelector('#boss')
        while(bossesDiv.firstChild) {
            bossesDiv.removeChild(bossesDiv.firstChild)
        }

        bossesDeck = getBossesDeck();

        const imgJuego = document.createElement('img');
        imgJuego.src = `assets/juegos/${juegoSeleccionado}.webp`
        imgJuego.classList.add('boss')
        divJuego.append(imgJuego)
    })
}