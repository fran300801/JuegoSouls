const NJUEGOS = 5;
const NBOSSESPJUEGO = 3;
const VIDAS = 3;

const btnConfigJuego = () => {
    const btnJuego = document.querySelector('#genera_juego')
    const divJuego = document.querySelector('#contenedor_juego')

    btnJuego.addEventListener('click', () => {
        juegoSeleccionado = getJuego();
        
}